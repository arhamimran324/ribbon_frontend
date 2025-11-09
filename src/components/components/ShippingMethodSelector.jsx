"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setShippingMethod,
  setDiscount,
  setCouponCode,
} from "@/redux/slices/checkout-slice";
import { useCart } from "react-use-cart";

const ShippingMethodSelector = () => {
  const dispatch = useAppDispatch();
  const { deliveryInfo, orderSummary } = useAppSelector(
    (state) => state.checkout
  );
  const { cartTotal } = useCart();

  const shippingOptions = [
    {
      id: "evri",
      name: "Evri",
      description: "5-7 working days",
      cost: 3.2,
      deliveryTime: "5-7 working days",
    },
    {
      id: "royal-mail",
      name: "Royal Mail",
      description: "3-5 working days",
      cost: 3.99,
      deliveryTime: "3-5 working days",
    },
    {
      id: "dhl",
      name: "DHL",
      description: "2-3 working days",
      cost: 7.0,
      deliveryTime: "2-3 working days",
    },
    {
      id: "royal-mail-express",
      name: "Royal Mail Express",
      description: "Next working day",
      cost: 12.0,
      deliveryTime: "Next working day (orders before 1pm Mon-Fri)",
    },
  ];

  const handleShippingSelect = (option) => {
    dispatch(
      setShippingMethod({
        method: option.name,
        cost: option.cost,
      })
    );
  };

  const handleFreeShipping = () => {
    if (cartTotal >= 25) {
      dispatch(
        setShippingMethod({
          method: "FREE Shipping",
          cost: 0,
        })
      );
      dispatch(setCouponCode("FREESHIP"));
      dispatch(setDiscount(orderSummary.shippingFee)); // Apply discount equal to shipping cost
    }
  };

  // Check if free shipping is eligible
  const isFreeShippingEligible = cartTotal >= 25;

  return (
    <div className="mt-6">
      <h2 className="text-[#101928] font-semibold mb-4">Shipping Method</h2>

      {/* Free Shipping Banner */}
      {isFreeShippingEligible && (
        <div
          className="mb-4 p-4 border-2 border-green-500 rounded-lg bg-green-50 cursor-pointer hover:bg-green-100 transition-colors"
          onClick={handleFreeShipping}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  deliveryInfo.shippingMethod === "FREE Shipping"
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300"
                } flex items-center justify-center`}
              >
                {deliveryInfo.shippingMethod === "FREE Shipping" && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <div>
                <p className="font-semibold text-green-700">FREE UK Delivery</p>
                <p className="text-sm text-green-600">On orders over £25</p>
                <p className="text-xs text-green-500 mt-1">
                  Use code: FREESHIP
                </p>
              </div>
            </div>
            <span className="font-bold text-green-700">£0.00</span>
          </div>
        </div>
      )}

      {/* Paid Shipping Options */}
      <div className="space-y-3">
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors ${
              deliveryInfo.shippingMethod === option.name
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => handleShippingSelect(option)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    deliveryInfo.shippingMethod === option.name
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                >
                  {deliveryInfo.shippingMethod === option.name && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{option.name}</p>
                  <p className="text-sm text-gray-600">{option.description}</p>
                  {option.deliveryTime && (
                    <p className="text-xs text-gray-500 mt-1">
                      {option.deliveryTime}
                    </p>
                  )}
                </div>
              </div>
              <span className="font-semibold">£{option.cost.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Free Shipping Notice */}
      {!isFreeShippingEligible && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            Add{" "}
            <span className="font-semibold">
              £{(25 - cartTotal).toFixed(2)}
            </span>{" "}
            more to qualify for FREE shipping!
          </p>
        </div>
      )}
    </div>
  );
};

export default ShippingMethodSelector;
