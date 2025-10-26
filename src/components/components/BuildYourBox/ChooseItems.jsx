"use client";
// import { Button } from "@/components/components/ui/button";
import { bestSellers, itemsLeftImages } from "@/data";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/components/ui/label";
import SelectBox from "@/components/components/ui/SelectBox";
import PaginatedBestSellers from "../paginatedBestSellers/PaginatedBestSellers";
import { Button } from "@/components/components/shared/button";

const ChooseItems = ({ next }) => {
  const [boxSize, setBoxSize] = useState("Regular");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mt-10 mb-20 bg-[#fdfdfc] max-md:mx-6 ">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[44px] text-center text-black font-normal max-md:text-[28px]"
      >
        Choose your items
      </h1>
      <p className="text-[#4E525F] text-[14px] text-center mt-2 ">
        We’ve hand-selected the best products in one place. Select from the
        items below and fill up your box! <br /> Pick your products first and
        our program will automatically select the box size!
      </p>
      {/* <div className="my-16 w-[86vw] max-md:w-[100vw]  "> */}
      <div className="py-10 px-20 max-md:px-10 ">
        <div className="border-[1px] h-[50px] border-black/30 flex">
          <button
            className={`cursor-pointer text-center basis-[50%] ${
              boxSize === "Regular" ? "bg-[#F5F3EB]" : "bg-white"
            }`}
            onClick={() => setBoxSize("Regular")}
          >
            Regular
          </button>
          <button
            className={`cursor-pointer text-center basis-[50%] ${
              boxSize === "Big" ? "bg-[#F5F3EB]" : "bg-white"
            }`}
            onClick={() => setBoxSize("Big")}
          >
            Big
          </button>
        </div>

        <div className="my-8 flex justify-between max-md:flex-col max-md:justify-center max-md:items-center max-md:gap-5 ">
          <div className="grid grid-cols-3 gap-x-6 gap-y-4">
            {itemsLeftImages.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  className="w-[100px] h-[88px]"
                  src={item.image}
                  alt={item.title}
                />
                <p className="text-[12px] font-medium text-[#101928]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <div className="basis-[40%] max-md:basis-[50%] border-[1px] border-[#E4E7EC] rounded-2xl p-4">
            <div>
              <h1 className="text-[#101928] font-bold ">Order summary</h1>
              <hr className="border-[2px] border-t border-[#F0F2F5] w-[100%] max-md:w-[98%] max-md:m-auto my-5 max-md:my-5" />

              <p className="mb-3 text-[14px] font-normal text-[#475367] flex justify-between ">
                The pamper hamper <span>$30.00</span>{" "}
              </p>
              <p className="mb-3 text-[14px] font-normal text-[#475367] flex justify-between ">
                Welcome Baby(10%) <span>$200.00</span>{" "}
              </p>
              <p className="text-[14px] font-normal text-[#475367] flex justify-between ">
                Getting married <span>$10.50</span>{" "}
              </p>
            </div>
            <hr className="border-[2px] border-t border-[#F0F2F5] w-[100%] max-md:w-[98%] max-md:m-auto my-5 max-md:my-5" />
            <p className="text-[14px] font-semibold flex justify-between ">
              Total <span>$70.32</span>{" "}
            </p>
            <div className="flex justify-end">
              {/* <Button
                onClick={next}
                className="w-[20vw] cursor-pointer max-md:w-[75vw] mt-5 px-6 py-6 font-bold hover:bg-gradient-to-r hover:from-black hover:via-[#1a1a1a] hover:to-[#333333] hover:animate-gradient-x "
              >
                Complete box
              </Button> */}
              <Button
                variant="primary"
                className="w-[20vw] cursor-pointer max-md:w-[75vw] mt-5 px-6"
                onClick={next}
              >
                Complete box
              </Button>
            </div>
          </div>
        </div>
        {/* Reason */}
        <div className="flex justify-between gap-5 max-md:gap-0 max-md:flex-col">
          <div>
            <Label className="mt-4 mb-2 text-[14px] font-medium text-[#344054] ">
              Reason or Season
            </Label>
            <SelectBox
              width="26vw"
              mobWid="90vw"
              placeholder="Reason"
              firstValue="Spring"
              secondValue="Summer"
              thirdValue="Winter"
            />
          </div>
          <div>
            <Label className="mt-4 max-md:mt-0 mb-2 text-[14px] font-medium text-[#344054] ">
              Color
            </Label>
            <SelectBox
              width="26vw"
              mobWid="90vw"
              placeholder="Color"
              firstValue="Red"
              secondValue="Blue"
              thirdValue="Green"
            />
          </div>
          <div>
            <Label className="mt-4 max-md:mt-0 mb-2 text-[14px] font-medium text-[#344054] ">
              Sort
            </Label>
            <SelectBox
              width="26vw"
              mobWid="90vw"
              placeholder="Sort"
              firstValue="Date"
              secondValue="Time"
              thirdValue="Price"
            />
          </div>
        </div>
        {/* Search */}
        <div>
          <Label className="mb-2 text-[14px] font-medium text-[#344054] ">
            Search
          </Label>
          <div className="relative w-[26vw] max-md:w-[90vw] ">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Search icon */}
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 17a6 6 0 100-12 6 6 0 000 12z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              name="search"
              className="block w-full h-[50px] pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-sm placeholder-gray-400"
              placeholder="Search Item"
            />
          </div>
        </div>
        <div>
          <PaginatedBestSellers bestSellers={bestSellers} />
        </div>
      </div>
    </div>
  );
};

export default ChooseItems;
