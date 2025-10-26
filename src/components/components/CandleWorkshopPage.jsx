"use client";
import React from "react";
import { candleMaking } from "@/data";
import PaginatedCandleMaking from "./paginatedCandleMaking/PaginatedCandleMaking";
import CustomForm from "./CustomForm";

const CandleWorkshopPage = () => {
  return (
    <div className="py-10 px-18 max-md:px-4">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[56px] text-center text-black font-normal max-md:text-[28px]"
      >
        Candle & Perfume making {"  "}
        <span style={{ fontFamily: "Jedira-Italic, sans-serif" }}>
          workshops
        </span>
      </h1>
      <p className="text-[#4E525F] text-[14px] text-center mt-2 ">
        Indulge in our luxury soy candle or perfume-making workshops; perfect
        for self-care,
        <br /> gifting, or gathering with loved ones. We also offer private
        experiences in your space; get
        <br /> in touch or book your session online today.
      </p>
      <PaginatedCandleMaking candleMaking={candleMaking} />
      <CustomForm title="jsjjjs" />
    </div>
  );
};

export default CandleWorkshopPage;
