"use client";
import { forgotPassword, loginUser, verifyOTP } from "@/api/service/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { toast } from "sonner";

const VerifyOTP = () => {
  const [formData, setFormData] = useState({
    otp: "",
  });
  const [errors, setErrors] = useState({
    otp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const userEmail = useAppSelector((store) => store.auth.forgetPasswordEmail);
  const validateForm = () => {
    const newErrors = {
      otp: "",
    };

    if (!formData.otp) {
      newErrors.otp = "OTP is required";
    }

    setErrors(newErrors);
    return !newErrors.otp;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      const res = await verifyOTP({ ...formData, email: userEmail });
      toast.success("Email verified successfully!");
      console.log({ res });
      router.push(`/reset-password?token=${res.resetToken}`);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-primary-gradient bg-[length:200%_200%] animate-gradientMove font-inter flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-[#D5A581] p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2 font-jedira">
            Verify OTP
          </h1>
          <p className="text-gray-100 font-inter">
            Enter the OTP Sent to the email you had entered on previous step.
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <OTPInput
              value={formData.otp}
              onChange={(val) => setFormData({ otp: val })}
              numInputs={6}
              renderSeparator={<span style={{ margin: "0 4px" }}></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "100%",
                    minWidth: "35px",
                    height: "50px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    outline: "none",
                    fontSize: "18px",
                    textAlign: "center",
                    color: "#333",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                  }}
                  className="otpInput"
                />
              )}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#D5A581] text-white py-3 px-4 rounded-lg font-semibold focus:ring-2 focus:ring-[#D5A581] focus:ring-offset-2 transition-all duration-200 font-inter ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#cd966c] hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying Email...
                </div>
              ) : (
                "Verify Email"
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center font-inter">
            <p className="text-sm text-text_gray">
              Back to&nbsp;
              <Link
                href="/forgot-password"
                className="font-medium text-[#D5A581] hover:text-[#cd966c] transition-colors duration-200"
              >
                Forgot Password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOTP;
