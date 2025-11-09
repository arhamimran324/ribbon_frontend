"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/components/ui/card";
import { Input } from "@/components/components/ui/input";
import { Textarea } from "@/components/components/ui/textarea";
import { Checkbox } from "@/components/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/components/ui/select";
import { Label } from "@/components/components/ui/label";
import { Button } from "@/components/components/shared/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSelectedCard,
  setCardMessage,
  setCardTo,
  setCardFrom,
  setLeaveBlank,
  setNoNote,
  resetCardDetails,
  setShippingAddress,
} from "@/redux/slices/built-box-slice";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { confirmPayment, createBuiltBoxOrder } from "@/api/service/app";
import { toast } from "sonner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const cardOptions = [
  {
    id: "thank-you",
    label: "Thank You",
    img: "/assets/images/chooseCard/thankyou.png",
  },
  {
    id: "celebrate",
    label: "Celebrate",
    img: "/assets/images/chooseCard/celebrate.png",
  },
  {
    id: "cant-say",
    label: "I can't say 'I do' without you",
    img: "/assets/images/chooseCard/without.jpg",
  },
  {
    id: "thinking-of-you",
    label: "Thinking of you",
    img: "/assets/images/chooseCard/thinking.png",
  },
  { id: "xoxo", label: "XOXO", img: "/assets/images/chooseCard/xoxo.png" },
];

// Stripe Payment Component
const StripePaymentForm = ({ onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState("");
  const dispatch = useAppDispatch();

  const {
    selectedCard,
    cardMessage,
    cardTo,
    cardFrom,
    leaveBlank,
    noNote,
    boxSize,
    selectedItems,
    orderSummary,
    selectedBoxData,
    personalizationOption,
    personalizationMessage,
    shippingAddress,
  } = useAppSelector((state) => state.buildBox);

  const handleCardChange = (event) => {
    setCardError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Payment system is still loading. Please try again.");
      return;
    }

    if (cardError) {
      toast.error(`Please fix card errors: ${cardError}`);
      return;
    }

    setLoading(true);

    try {
      // Create built box order
      const orderData = {
        type: "built-box",
        boxType: selectedBoxData?.type || "custom",
        boxSize: boxSize,
        boxLimit: selectedBoxData?.limit || 0,
        selectedItems: selectedItems.map((item) => ({
          id: item.id,
          quantity: 1,
          customization: {},
        })),
        shippingAddress: shippingAddress,
        paymentMethod: "card",
        cardDetails: {
          cardId: selectedCard?.id,
          cardName: selectedCard?.label,
          to: cardTo,
          from: cardFrom,
          message: cardMessage,
          leaveBlank: leaveBlank,
          noNote: noNote,
        },
        personalization: {
          option: personalizationOption,
          message: personalizationMessage,
        },
        subtotal: orderSummary.total,
        tax: 0, // Calculate based on your requirements
        shippingFee: 0, // Calculate based on your requirements
        total: orderSummary.total,
        status: "pending",
      };

      // Create order and get client secret
      const orderResponse = await createBuiltBoxOrder(orderData);

      if (!orderResponse.success) {
        throw new Error(
          orderResponse.data?.message || "Failed to create order"
        );
      }

      const { clientSecret, order } = orderResponse;

      // Get card element
      const cardElement = elements.getElement(CardElement);

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: cardFrom || "Customer",
              email: "", // You might want to collect email separately
            },
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        await confirmPayment({
          paymentIntentId: paymentIntent.id,
          orderId: order._id,
        });
        onPaymentSuccess(order._id);
      } else {
        throw new Error(`Payment status: ${paymentIntent.status}`);
      }
    } catch (error) {
      console.error("Payment error:", error);
      onPaymentError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="mb-2 text-[14px] font-medium text-[#344054]">
          Cardholder Name *
        </Label>
        <Input
          className="h-[50px] border-[1px] border-[#D0D5DD]"
          placeholder="Enter full name as shown on card"
          required
        />
      </div>

      <div>
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
            onChange={handleCardChange}
          />
        </div>
        {cardError && <p className="text-red-500 text-sm mt-1">{cardError}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full cursor-pointer mt-2 h-[55px]"
        disabled={!stripe || loading}
        style={{ background: !stripe || (loading && "#ccc") }}
      >
        {loading
          ? "Processing Payment..."
          : `Pay £${orderSummary.total?.toFixed(2) || "0.00"}`}
      </Button>
    </form>
  );
};

// Main ChooseCard Component
const ChooseCard = ({ next }) => {
  const dispatch = useAppDispatch();
  const {
    selectedCard: reduxSelectedCard,
    cardMessage,
    cardTo,
    cardFrom,
    leaveBlank,
    noNote,
    selectedItems,
    orderSummary,
    boxSize,
    selectedBoxData,
    shippingAddress,
  } = useAppSelector((state) => state.buildBox);

  const [selectedCard, setSelectedCard] = useState(
    reduxSelectedCard || cardOptions[0]
  );
  const [showStripe, setShowStripe] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Sync local state with Redux
  useEffect(() => {
    if (reduxSelectedCard) {
      setSelectedCard(reduxSelectedCard);
    }
  }, [reduxSelectedCard]);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    dispatch(setSelectedCard(card));
  };

  const handleMessageChange = (message) => {
    dispatch(setCardMessage(message));
  };

  const handleToChange = (to) => {
    dispatch(setCardTo(to));
  };

  const handleFromChange = (from) => {
    dispatch(setCardFrom(from));
  };

  const handleLeaveBlankChange = (checked) => {
    dispatch(setLeaveBlank(checked));
    if (checked) {
      dispatch(setNoNote(false));
    }
  };

  const handleNoNoteChange = (checked) => {
    dispatch(setNoNote(checked));
    if (checked) {
      dispatch(setLeaveBlank(false));
    }
  };

  const handlePaymentSuccess = (orderId) => {
    setPaymentSuccess(true);
    toast.success("Payment successful! Your built box order has been placed.");
    // You can navigate to success page or show success message
    setTimeout(() => {
      next(); // Or navigate to success page
    }, 2000);
  };

  const handlePaymentError = (errorMessage) => {
    toast.error(`Payment failed: ${errorMessage}`);
  };

  const handleAddToCart = () => {
    // Validate required fields
    if (!cardTo.trim() && !leaveBlank && !noNote) {
      toast.error("Please enter recipient name or select card options");
      return;
    }

    if (!cardFrom.trim() && !leaveBlank && !noNote) {
      toast.error("Please enter your name or select card options");
      return;
    }

    setShowStripe(true);
  };

  return (
    <div className="mt-10 px-32 mb-20 bg-[#fdfdfc] max-md:mx-6 ">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[44px] text-center text-black font-normal max-md:text-[28px]"
      >
        Choose your card
      </h1>
      <p className="text-[#4E525F] text-[14px] text-center mt-2 ">
        Choose the perfect card for the occasion from our selection of exclusive
        designs. Our team handwrites each and <br /> every note to keep your
        gifts personal. (Plus, we have great handwriting.)
      </p>

      <div className="flex justify-between max-md:flex-col max-md:px-0 max-md:justify-center max-md:items-center max-md:gap-8 mt-16">
        {/* Card Selector */}
        <div className="basis-[30%] max-md:basis-[90%] space-y-5 ">
          <img
            src={selectedCard.img}
            alt={selectedCard.label}
            className="w-[90%] max-md:w-[100%] h-[60%] max-md:h-[40%] object-cover"
          />

          <Select
            onValueChange={(value) =>
              handleCardSelect(cardOptions.find((card) => card.id === value))
            }
            className="cursor-pointer"
            value={selectedCard.id}
          >
            <SelectTrigger className="w-[90%] max-md:w-[100%] h-[55px] ">
              <SelectValue className="text-black " placeholder="Change card" />
            </SelectTrigger>
            <SelectContent>
              {cardOptions.map((card) => (
                <SelectItem key={card.id} value={card.id}>
                  {card.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-5 flex-wrap">
            {cardOptions.map((card) => (
              <img
                key={card.id}
                src={card.img}
                alt={card.label}
                className={`w-14 h-14 cursor-pointer border ${
                  card.id === selectedCard.id ? "ring-2 ring-black" : ""
                }`}
                onClick={() => handleCardSelect(card)}
              />
            ))}
          </div>
        </div>

        {/* Message Form or Stripe Payment */}
        <Card className="basis-[60%] max-md:basis-[90%] max-md:rounded-none max-md:mt-6 h-[50%] py-0 bg-[#f9f9f9] border-none ">
          <CardContent className="p-4 space-y-4">
            {!showStripe ? (
              <>
                <div className="flex max-md:flex-col gap-4">
                  <div>
                    <Label className="mb-2">To *</Label>
                    <Input
                      className="h-[55px] w-[24.2vw] max-md:w-[80vw] border-[1px] border-[#D0D5DD] "
                      placeholder="To"
                      value={cardTo}
                      onChange={(e) => handleToChange(e.target.value)}
                      disabled={leaveBlank || noNote}
                    />
                  </div>
                  <div>
                    <Label className="mb-2">From *</Label>
                    <Input
                      className="h-[55px] w-[24.2vw] max-md:w-[80vw] border-[1px] border-[#D0D5DD] "
                      placeholder="From"
                      value={cardFrom}
                      onChange={(e) => handleFromChange(e.target.value)}
                      disabled={leaveBlank || noNote}
                    />
                  </div>
                </div>
                <div>
                  <Label className="mb-2">Shipping Address *</Label>
                  <Input
                    className="h-[55px] border-[1px] border-[#D0D5DD] "
                    placeholder="Shipping Address"
                    value={shippingAddress}
                    onChange={(e) =>
                      dispatch(setShippingAddress(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Enter your message
                  </label>
                  <Textarea
                    className="h-36 resize-none border-[1px] border-[#D0D5DD] "
                    placeholder="Enter your card message here"
                    rows={5}
                    value={cardMessage}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    disabled={leaveBlank || noNote}
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="blank"
                    checked={leaveBlank}
                    onCheckedChange={handleLeaveBlankChange}
                  />
                  <label htmlFor="blank" className="text-[16px] ">
                    Leave the card blank to fill in yourself.
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="no-note"
                    checked={noNote}
                    onCheckedChange={handleNoNoteChange}
                  />
                  <label htmlFor="no-note" className="text-[16px] ">
                    No note or card needed.
                  </label>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  className="w-full cursor-pointer mt-2 h-[55px]"
                >
                  Proceed to Payment
                </Button>
              </>
            ) : (
              <Elements stripe={stripePromise}>
                <StripePaymentForm
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                />
              </Elements>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChooseCard;
