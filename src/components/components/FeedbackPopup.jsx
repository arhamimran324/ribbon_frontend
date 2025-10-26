// components/FeedbackPopup.jsx
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/components/ui/dialog";
import { Button } from "@/components/components/shared/button";
import { Input } from "@/components/components/ui/input";
import { Label } from "@/components/components/ui/label";
import { Textarea } from "@/components/components/ui/textarea";
import { submitFeedback } from "@/api/service/app";
import { toast } from "sonner";

const FeedbackPopup = ({ open, onOpenChange, orderId, products }) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentProduct = products[currentProductIndex];

  const handleRatingChange = (productId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: rating,
    }));
  };

  const handleCommentChange = (productId, comment) => {
    setComments((prev) => ({
      ...prev,
      [productId]: comment,
    }));
  };

  const handleSubmitFeedback = async () => {
    if (!ratings[currentProduct.id]) {
      toast.error("Please select a rating before continuing");
      return;
    }

    setLoading(true);
    try {
      await submitFeedback({
        productId: currentProduct.id,
        orderId: orderId,
        rating: ratings[currentProduct.id],
        comment: comments[currentProduct.id] || "",
      });

      // Move to next product or finish
      if (currentProductIndex < products.length - 1) {
        setCurrentProductIndex((prev) => prev + 1);
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    if (currentProductIndex < products.length - 1) {
      setCurrentProductIndex((prev) => prev + 1);
    } else {
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setCurrentProductIndex(0);
    setRatings({});
    setComments({});
    setSubmitted(false);
    onOpenChange(false);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="w-[400px] max-md:w-[350px] text-center">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center justify-center">
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
              <p className="text-lg font-semibold text-green-600">Thank You!</p>
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-gray-600 mb-2">
              Your feedback has been submitted successfully.
            </p>
            <p className="text-sm text-gray-500">
              Thank you for helping us improve our products and services.
            </p>
          </div>

          <Button variant="primary" className="w-full" onClick={handleClose}>
            Continue Shopping
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
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
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold">Rate Product</p>
            <p className="text-sm text-gray-500 font-normal mt-1">
              Product {currentProductIndex + 1} of {products.length}
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <img
              src={currentProduct.image || "/placeholder-product.jpg"}
              alt={currentProduct.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {currentProduct.name}
              </h3>
              <p className="text-sm text-gray-600">
                Quantity: {currentProduct.quantity}
              </p>
            </div>
          </div>

          {/* Rating Section */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              How would you rate this product? *
            </Label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`w-12 h-12 rounded-full text-2xl transition-all ${
                    ratings[currentProduct.id] >= star
                      ? "bg-yellow-100 text-yellow-500"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  }`}
                  onClick={() => handleRatingChange(currentProduct.id, star)}
                >
                  ★
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* Comment Section */}
          <div>
            <Label
              htmlFor={`comment-${currentProduct.id}`}
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Share your experience (optional)
            </Label>
            <Textarea
              id={`comment-${currentProduct.id}`}
              placeholder="What did you like about this product? Any suggestions for improvement?"
              value={comments[currentProduct.id] || ""}
              onChange={(e) =>
                handleCommentChange(currentProduct.id, e.target.value)
              }
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleSkip}
              disabled={loading}
            >
              {currentProductIndex < products.length - 1 ? "Skip" : "Skip All"}
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleSubmitFeedback}
              style={{
                background: (!ratings[currentProduct.id] || loading) && "#ccc",
              }}
            >
              {loading
                ? "Submitting..."
                : currentProductIndex < products.length - 1
                ? "Next Product"
                : "Submit All"}
            </Button>
          </div>

          {/* Progress */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentProductIndex + 1) / products.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackPopup;
