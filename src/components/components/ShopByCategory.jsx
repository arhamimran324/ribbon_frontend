"use client";
import React, { useEffect, useState } from "react";
import { shopByCategory } from "@/data";
import useIsMobile from "../../hooks/useIsMobile.js";

const ShopByCategory = () => {
  const isMobile = useIsMobile();

  return (
    <div className="pl-20 pr-20 h-full max-md:px-8 max-md:h-auto">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[32px] text-black font-normal max-md:text-[20px] mb-6 mt-8"
      >
        Shop By Category
      </h1>
      <div className="mt-8 mb-8 flex flex-wrap justify-between space-y-8 max-md:space-y-0 max-md:flex-wrap max-md:justify-center max-md:items-center max-md:gap-8">
        {shopByCategory.map((item, index) => (
          <div
            key={index}
            className="relative w-[24.5%] max-md:w-[40%] max-sm:w-[100%]"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-[97%] h-[500px] max-md:h-80 max-md:w-[98%]"
            />

            {/* <div className="absolute bottom-0 w-full bg-gradient-to-t from-white via-[#f5f5f5] to-transparent backdrop-blur-sm p-3">
              <p className="text-lg font-semibold text-black">{item.title}</p>
            </div> */}
            <div
              className={`absolute ${
                index === 3 && !isMobile ? "bottom-8" : "bottom-0"
              } w-full bg-gradient-to-t from-white via-[#f5f5f5] to-transparent backdrop-blur-[1px] p-3`}
            >
              <p
                style={{ fontFamily: "Jedira-Regular, sans-serif" }}
                className="text-lg font-medium text-black"
              >
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
