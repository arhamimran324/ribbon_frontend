"use client";
import { Button } from "@/components/components/shared/button";
import { useRouter } from "next/navigation";
import React from "react";

const CustomCorporate = () => {
  const router = useRouter();
  return (
    <div className="flex h-[450px] max-md:flex-col-reverse max-md:h-auto">
      <div className="w-1/2 max-md:w-full bg-[#F5F3EB] flex flex-col justify-center px-20 max-md:px-6 max-md:py-10">
        <h1
          style={{ fontFamily: "Jedira-Regular, sans-serif" }}
          className="font-normal text-4xl max-md:text-2xl"
        >
          Custom Corporate Gifting
        </h1>
        <p className="text-[#101928] font-light my-6 gap-1">
          Elevate client and team gifts with our bespoke corporate gifting
          service. We handle everything- from curation to delivery straight to
          each recipient- saving you time while making a lasting impression.
        </p>
        {/* <button className="bg-black text-white w-[167px] h-[56px] text-center rounded-[8px] cursor-pointer whitespace-nowrap hover:scale-105 transition-all duration-200 ">
          Get started today
        </button> */}
        <Button
          variant="primary"
          className="flex items-center justify-center w-[200px] h-[56px] gap-2 whitespace-nowrap"
          onClick={() => router.push("/corporategift")}
        >
          Get started today
        </Button>
      </div>
      <img
        className="w-1/2 max-md:w-full max-md:h-[350px] "
        src="/assets/images/customcorp.png"
        alt="candle_mak"
      />
    </div>
  );
};

export default CustomCorporate;
