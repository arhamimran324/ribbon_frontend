"use client";
import React from "react";
import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { getFAQs } from "@/api/service/app";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleIndex = (id) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  };

  // Fetch FAQs on component mount
  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFAQs();

      // Filter only active FAQs and transform data
      const activeFAQs = data
        .filter((faq) => faq.isActive)
        .map((faq) => ({
          _id: faq._id,
          question: faq.title,
          answer: faq.description,
          isActive: faq.isActive,
        }));

      setFaqs(activeFAQs);
    } catch (err) {
      console.error("Error fetching FAQs:", err);
      setError("Failed to load FAQs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="mt-10 w-full max-w-3xl mx-auto divide-y divide-gray-200">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="py-4">
          <div className="flex justify-between items-center w-full">
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="h-5 w-5 bg-gray-300 rounded animate-pulse ml-4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error State Component
  const ErrorState = () => (
    <div className="mt-10 w-full max-w-3xl mx-auto text-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchFAQs}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  // Empty State Component
  const EmptyState = () => (
    <div className="mt-10 w-full max-w-3xl mx-auto text-center">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
        <p className="text-gray-600 text-lg">
          No FAQs available at the moment.
        </p>
        <p className="text-gray-500 mt-2">
          Check back later for frequently asked questions.
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f9f9f9] px-40 py-24 max-md:px-4 max-md:py-12 max-md:pb-40">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[44px] text-center text-black font-normal max-md:text-[28px]"
      >
        Have a question?
      </h1>
      <p className="text-center text-[18px] text-[#4E525F] mt-6">
        Well you've come to the right place! 
        <br />
        Here at Ribbon and Bow we are committed to ensure your special gift
        arrives in <br /> great condition.
      </p>

      {/* Loading State */}
      {loading && <SkeletonLoader />}

      {/* Error State */}
      {error && !loading && <ErrorState />}

      {/* Empty State */}
      {!loading && !error && faqs.length === 0 && <EmptyState />}

      {/* FAQ Content */}
      {!loading && !error && faqs.length > 0 && (
        <div className="mt-10 w-full max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq) => (
            <div key={faq._id} className="py-4">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleIndex(faq._id)}
              >
                <h3 className="text-xl font-medium text-black cursor-pointer pr-4">
                  {faq.question}
                </h3>
                {openIndex === faq._id ? (
                  <X className="cursor-pointer w-5 h-5 flex-shrink-0" />
                ) : (
                  <Plus className="cursor-pointer w-5 h-5 flex-shrink-0" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === faq._id ? "max-h-40 mt-2" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 text-sm mr-10 max-md:mr-5">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQs;
