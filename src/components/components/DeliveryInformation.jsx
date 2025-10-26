"use client";
import React from "react";
import DeliveryInformationForm from "./DeliveryInformationForm";
import useIsMobile from "../../hooks/useIsMobile";
import { useRouter } from "next/navigation";

const DeliveryInformation = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  return (
    <>
      {!isMobile && (
        <div className="text-[14px] px-20 py-10 text-[#D5A581] font-medium ">
          Home / Basket / <span className="text-[#667185]  ">Checkout</span>
        </div>
      )}
      <div className="px-20 pb-10 w-[66.5vw] max-md:w-[98vw] max-md:px-4 max-md:py-1">
        <div className="border-[1px] border-[#E4E7EC] p-8 max-md:p-4 rounded-[10px] ">
          <h1 className="font-semibold text-2xl mb-6">Delivery Information</h1>
          <DeliveryInformationForm />
        </div>
        <div className="flex gap-8 mt-6 max-md:flex-col max-md:gap-4">
          <button
            onClick={() => router.push("/buildBox")}
            className="bg-white border-[1px] border-[#000000] rounded-[8px] p-4 font-medium cursor-pointer hover:scale-105 transition-all duration-200"
          >
            Ready to ship gift box
          </button>
          <button
            onClick={() => router.push("/shop")}
            className="border-2 border-black bg-black text-white rounded-[8px] p-4 font-medium cursor-pointer hover:scale-105 transition-all duration-200"
          >
            Explore other collections
          </button>
        </div>
      </div>
    </>
  );
};

export default DeliveryInformation;
