// components/CheckoutPIForm.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPaymentInfo,
  setPaymentMethod,
  setCouponCode,
  setDiscount,
  setOrderSummary,
  calculateTotals,
  resetCheckout,
} from "@/redux/slices/checkout-slice";
import { Input } from "@/components/components/ui/input";
import { Label } from "@/components/components/ui/label";
import { useCart } from "react-use-cart";
import { Button } from "@/components/components/shared/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/components/ui/dialog";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createOrder, confirmPayment } from "@/api/service/app";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import FeedbackPopup from "./FeedbackPopup";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Success Dialog Component
const SuccessDialog = ({ open, onOpenChange, orderId, onGiveFeedback }) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(
    (store) => store.auth?.isAuthenticated
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] max-md:w-[350px] text-center">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center">
            {/* Animated Green Check */}
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-10 h-10 text-white animate-checkmark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-green-600">
              Payment Successful!
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-600 mb-2">Thank you for your order!</p>
          <p className="text-sm text-gray-500">
            Order ID: <span className="font-mono">{orderId}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            A confirmation email has been sent to your email address.
          </p>
        </div>
        <div className="space-y-2">
          {isAuthenticated && (
            <Button
              variant="primary"
              className="w-full"
              onClick={onGiveFeedback}
            >
              Rate Product
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              router.push("/shop");
              onOpenChange(false);
            }}
          >
            Continue Shopping
          </Button>
        </div>
        <style jsx>{`
          @keyframes checkmark {
            0% {
              stroke-dashoffset: 100;
              opacity: 0;
            }
            100% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }
          .animate-checkmark {
            animation: checkmark 0.6s ease-in-out forwards;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

// Stripe Payment Form Component
const StripePaymentForm = ({
  setOpen,
  finalTotal,
  shippingAddress,
  items,
  onPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState("");
  const dispatch = useDispatch();
  const { paymentInfo, productCustomization, orderSummary } = useSelector(
    (state) => state.checkout
  );
  const user = useSelector((store) => store.auth?.user?.user?.id);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe hasn't loaded yet");
      alert("Payment system is still loading. Please try again.");
      return;
    }

    // Validate cardholder name
    if (!paymentInfo.cardholderName?.trim()) {
      alert("Please enter cardholder name");
      return;
    }

    // Get card element and validate
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      alert(
        "Card details are not properly loaded. Please refresh and try again."
      );
      return;
    }

    if (cardError) {
      alert(`Please fix card errors: ${cardError}`);
      return;
    }

    setLoading(true);

    try {
      // Create order with all data from Redux
      const orderData = {
        items: items.map((item) => ({
          product: item.id,
          productName: item.title || item.productName,
          price: item.price,
          quantity: item.quantity || 1,
          customization: item.customization || productCustomization,
        })),
        shippingAddress: shippingAddress,
        paymentMethod: "card",
        shippingMethod: "standard",
        subtotal: orderSummary.subtotal,
        tax: orderSummary.tax,
        discount: orderSummary.discount,
        shippingFee: orderSummary.shippingFee,
        total: orderSummary.total,
        userId: user,
      };

      const orderResponse = await createOrder(orderData);
      console.log("Order response:", orderResponse);

      if (!orderResponse.success) {
        throw new Error(
          orderResponse.data?.message || "Failed to create order"
        );
      }

      const { clientSecret, order } = orderResponse;

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: paymentInfo.cardholderName.trim(),
              email: shippingAddress?.email,
              address: {
                line1: shippingAddress?.street,
                city: shippingAddress?.city,
                state: shippingAddress?.state,
                postal_code: shippingAddress?.zipCode,
                country: shippingAddress?.country,
              },
            },
          },
        }
      );

      if (error) {
        console.error("Stripe confirmation error:", error);
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        // Confirm payment on backend
        await confirmPayment({
          paymentIntentId: paymentIntent.id,
          orderId: order._id,
        });

        onPaymentSuccess(order._id);
        setOpen({ type: "success", orderId: order._id });
      } else {
        throw new Error(`Payment status: ${paymentIntent.status}`);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(`Payment failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <p className="text-center mb-4">
          Please confirm your payment details below
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold mb-2">Order Summary</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>£{orderSummary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>£{orderSummary.tax.toFixed(2)}</span>
            </div>
            {orderSummary.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-£{orderSummary.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>£{orderSummary.shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-1 font-semibold">
              <span>Total:</span>
              <span>£{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold mb-2">Payment Method</h4>
          <p className="text-sm">Credit/Debit Card ending in ••••</p>
          <p className="text-xs text-gray-500 mt-1">
            Cardholder: {paymentInfo.cardholderName}
          </p>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full h-[56px]"
        disabled={!stripe || loading}
        style={{ background: (!stripe || loading) && "#ccc" }}
      >
        {loading
          ? "Processing Payment..."
          : `Confirm Payment of £${finalTotal.toFixed(2)}`}
      </Button>
    </form>
  );
};

// Payment Dialog Component
const PaymentDialog = ({
  open,
  setOpen,
  finalTotal,
  shippingAddress,
  items,
  onPaymentSuccess,
}) => {
  const { paymentInfo } = useSelector((state) => state.checkout);
  const [stripeReady, setStripeReady] = useState(false);

  useEffect(() => {
    // Check if Stripe is ready when dialog opens
    if (open) {
      const checkStripe = async () => {
        try {
          const stripe = await stripePromise;
          setStripeReady(!!stripe);
        } catch (error) {
          console.error("Failed to load Stripe:", error);
          setStripeReady(false);
        }
      };
      checkStripe();
    }
  }, [open]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="w-[500px] max-md:w-[380px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold">Confirm Payment</p>
          </DialogTitle>
        </DialogHeader>

        {stripeReady ? (
          <StripePaymentForm
            setOpen={setOpen}
            finalTotal={finalTotal}
            shippingAddress={shippingAddress}
            items={items}
            onPaymentSuccess={onPaymentSuccess}
          />
        ) : (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading secure payment system...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Card Information Section Component
const CardInformationSection = () => {
  const dispatch = useDispatch();
  const { paymentInfo } = useSelector((state) => state.checkout);

  // Handle cardholder name change
  const handleCardholderNameChange = (name) => {
    dispatch(setPaymentInfo({ cardholderName: name }));
  };

  return (
    <div>
      <h2 className="text-[#101928] font-semibold">Enter Card Information</h2>

      <div className="mt-4">
        <Label
          htmlFor="cardholderName"
          className="mb-2 text-[14px] font-medium text-[#344054]"
        >
          Cardholder Name *
        </Label>
        <Input
          id="cardholderName"
          className="h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] bg-white"
          placeholder="Enter full name as shown on card"
          value={paymentInfo.cardholderName || ""}
          onChange={(e) => handleCardholderNameChange(e.target.value)}
          required
        />
      </div>

      {/* Stripe CardElement - Handles ALL card details */}
      <div className="mt-4">
        <Label className="mb-2 text-[14px] font-medium text-[#344054]">
          Card Details *
        </Label>
        <div className="p-3 border border-[#D0D5DD] rounded-md bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                  fontFamily:
                    '"Inter", "Helvetica Neue", Helvetica, sans-serif',
                },
                invalid: {
                  color: "#e53e3e",
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Enter your card number, expiry date, and CVV securely
        </p>
      </div>
    </div>
  );
};

// Main CheckoutPIForm Component with Redux
const CheckoutPIFormContent = () => {
  const { cartTotal, items } = useCart();
  const dispatch = useAppDispatch();
  const { paymentInfo, orderSummary, deliveryInfo } = useAppSelector(
    (state) => state.checkout
  );
  const shippingAddress = deliveryInfo?.address;
  const { emptyCart } = useCart();
  const [dialogOpen, setDialogOpen] = useState({
    type: null, // 'payment' or 'success'
    orderId: null,
  });
  const [completedOrder, setCompletedOrder] = useState(null);
  const router = useRouter();
  const finalTotal = orderSummary.total;
  const isAuthenticated = useAppSelector(
    (store) => store.auth?.isAuthenticated
  );

  // Set payment method to card by default
  useEffect(() => {
    if (!paymentInfo.paymentMethod) {
      dispatch(setPaymentMethod("card"));
    }
  }, [paymentInfo.paymentMethod]);

  // Initialize order summary when component mounts
  useEffect(() => {
    if (cartTotal > 0 && orderSummary.subtotal === 0) {
      const tax = 0;
      const total = cartTotal + tax;

      dispatch(
        setOrderSummary({
          subtotal: cartTotal,
          tax: tax,
          shippingFee: 0,
          discount: 0,
          total: total,
        })
      );
    }
  }, [cartTotal, orderSummary.subtotal]);

  // Recalculate totals when cart changes
  useEffect(() => {
    if (cartTotal > 0) {
      dispatch(calculateTotals());
    }
  }, [cartTotal]);

  const handlePaymentSuccess = (orderId) => {
    // Store the completed order data for feedback
    setCompletedOrder({
      orderId: orderId,
      products: items.map((item) => ({
        id: item.id,
        name: item.title || item.productName,
        image: item.image,
        quantity: item.quantity || 1,
      })),
    });

    // Clear cart and show success dialog
    emptyCart();
    dispatch(resetCheckout());
    setDialogOpen({ type: "success", orderId: orderId });
  };

  const handleGiveFeedback = () => {
    setDialogOpen({ type: "feedback", orderId: completedOrder.orderId });
  };

  const handleFeedbackComplete = () => {
    setDialogOpen({ type: null });
    setCompletedOrder(null);
    router.push("/shop");
  };

  const isPaymentReady =
    shippingAddress && paymentInfo.cardholderName?.trim() && items.length > 0;

  return (
    <>
      {/* Payment Confirmation Dialog */}
      <PaymentDialog
        open={dialogOpen.type === "payment"}
        setOpen={(open) =>
          setDialogOpen(
            open ? { type: "success", orderId: open.orderId } : { type: null }
          )
        }
        finalTotal={finalTotal}
        shippingAddress={shippingAddress}
        items={items}
        onPaymentSuccess={handlePaymentSuccess} // Add this prop
      />

      {/* Success Dialog */}
      <SuccessDialog
        open={dialogOpen.type === "success"}
        onOpenChange={(open) =>
          setDialogOpen(
            open
              ? { type: "success", orderId: dialogOpen.orderId }
              : { type: null }
          )
        }
        orderId={dialogOpen.orderId}
        onGiveFeedback={handleGiveFeedback}
      />

      {completedOrder && isAuthenticated && (
        <FeedbackPopup
          open={dialogOpen.type === "feedback"}
          onOpenChange={handleFeedbackComplete}
          orderId={completedOrder.orderId}
          products={completedOrder.products}
        />
      )}

      <div>
        <h1 className="font-semibold text-2xl mb-6">Payment Information</h1>
        <div>
          <h2 className="text-[#101928] font-semibold">Payment Method</h2>
          <div className="mt-3 p-4 border border-[#D0D5DD] rounded-lg bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              </div>
              <span className="font-medium">Credit/Debit Card</span>
              <div className="flex space-x-2 ml-auto">
                <div className="w-8 h-5 bg-blue-50 rounded flex items-center justify-center text-xs font-bold text-blue-700 border">
                  VISA
                </div>
                <div className="w-8 h-5 bg-yellow-50 rounded flex items-center justify-center text-xs font-bold text-yellow-700 border">
                  MC
                </div>
                <div className="w-8 h-5 bg-green-50 rounded flex items-center justify-center text-xs font-bold text-green-700 border">
                  AMEX
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2 ml-9">
              Secure payment processed by Stripe
            </p>
          </div>
        </div>

        {/* Card Information Section */}
        <hr className="border-[2px] border-t border-[#F0F2F5] w-[100%] max-md:w-[98%] max-md:m-auto my-5 max-md:my-5" />
        <CardInformationSection />

        {/* Order Summary */}
        <hr className="border-[2px] border-t border-[#F0F2F5] w-[100%] max-md:w-[98%] max-md:m-auto my-5 max-md:my-5" />

        <div className="space-y-2">
          <p className="text-[14px] font-normal text-[#475367] flex justify-between">
            Subtotal <span>£{orderSummary.subtotal.toFixed(2)}</span>
          </p>
          <p className="text-[14px] font-normal text-[#475367] flex justify-between">
            Tax(0%) <span>£{orderSummary.tax.toFixed(2)}</span>
          </p>
          {orderSummary.discount > 0 && (
            <p className="text-[14px] font-normal text-[#475367] flex justify-between text-green-600">
              Discount <span>-£{orderSummary.discount.toFixed(2)}</span>
            </p>
          )}
          <p className="text-[14px] font-normal text-[#475367] flex justify-between">
            Shipping <span>£{orderSummary.shippingFee.toFixed(2)}</span>
          </p>
        </div>

        <hr className="border-[2px] border-t border-[#F0F2F5] w-[100%] max-md:w-[98%] max-md:m-auto my-5 max-md:my-5" />

        <p className="text-[14px] font-normal text-[#475367] flex justify-between font-semibold text-lg">
          Total <span>£{orderSummary.total.toFixed(2)}</span>
        </p>

        <Button
          variant="primary"
          className="w-[26vw] max-md:w-[84vw] mt-5 px-6 py-6 rounded-full"
          onClick={() => setDialogOpen({ type: "payment" })}
          disabled={!isPaymentReady}
          style={{ background: !isPaymentReady && "#ccc" }}
        >
          Pay £{orderSummary.total.toFixed(2)}
        </Button>

        {!isPaymentReady && (
          <div className="mt-2 space-y-1">
            {!shippingAddress && (
              <p className="text-red-500 text-sm">
                • Please complete delivery information first
              </p>
            )}
            {!paymentInfo.cardholderName?.trim() && (
              <p className="text-red-500 text-sm">
                • Please enter cardholder name
              </p>
            )}
            {items.length === 0 && (
              <p className="text-red-500 text-sm">• Your cart is empty</p>
            )}
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2">
            <svg
              className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-xs text-blue-700">
              Your payment information is encrypted and secure. We never store
              your card details.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// Main Export - Wrap with Elements provider
const CheckoutPIForm = ({ shippingAddress }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPIFormContent shippingAddress={shippingAddress} />
    </Elements>
  );
};

export default CheckoutPIForm;
