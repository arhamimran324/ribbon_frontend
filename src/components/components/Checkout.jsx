"use client";
import React, { useState } from "react";
import { myBasket } from "@/data";
import CheckoutDIForm from "./CheckoutDIForm";

import { Button } from "@/components/components/ui/button";
import { Input } from "@/components/components/ui/input";
import CheckoutPIForm from "./CheckoutPIForm";
import { useCart } from "react-use-cart";
import useIsMobile from "../../hooks/useIsMobile";

const Checkout = () => {
  const { totalItems, items } = useCart();
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && (
        <div className="text-[14px] px-20 py-10 text-[#D5A581] font-medium ">
          Home / Basket / <span className="text-[#667185]  ">Checkout</span>
        </div>
      )}
      <div className="flex max-md:flex-col max-md:gap-6 justify-between px-20 pb-10 max-md:px-4 max-md:py-1">
        <div className="basis-[63%] flex flex-col gap-6 ">
          <div className="border-[1px] border-[#E4E7EC] rounded-[10px] p-8 max-md:p-4 ">
            <div className="flex gap-2 items-center">
              <h1 className="font-semibold text-2xl ">Order Summary</h1>
              <button className="bg-[#D5A581] w-6 h-6 rounded-full text-white ">
                {totalItems}
              </button>
            </div>
            <div className="flex flex-col mt-10 mb-7 ">
              {items.map((item, index, arr) => (
                <React.Fragment key={index}>
                  <div className="flex justify-between max-md:gap-3 ">
                    <img
                      className="h-[140px] w-32 max-md:h-28 max-md:w-32 basis-[25%] rounded-[10px]"
                      src={item.image}
                      alt={item.title}
                    />
                    <div className="py-2 basis-[70%]">
                      <div className="flex justify-between my-3 max-md:my-1">
                        <p className="font-semibold text-[20px] max-md:text-[14px] max-md:whitespace-nowrap text-[#101928]">
                          {item.title}
                        </p>
                        <p className="flex items-baseline font-semibold text-[20px] text-black">
                          <span className="text-sm max-md:text-[12px] mr-0.5">
                            £
                          </span>
                          <span className="text-lg max-md:text-[14px]">
                            {item.price}
                          </span>
                          <span className="text-sm max-md:text-[12px] ml-0.5">
                            .00
                          </span>
                        </p>
                      </div>
                      <div className="text-[#475367] max-md:text-[14px]">
                        <p>
                          Discount:{" "}
                          <span className="font-semibold ">
                            {item.discount}%
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Add horizontal line if not the last item */}
                  {index !== arr.length - 1 && (
                    <hr className="border-[2px] border-t border-[#F0F2F5] w-[100%] max-md:w-[98%] max-md:m-auto my-5 max-md:my-5" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="border-[1px] border-[#E4E7EC] p-8 max-md:p-4 rounded-[10px] ">
            <h1 className="font-semibold text-2xl mb-6 ">
              Delivery Information
            </h1>
            <CheckoutDIForm />
          </div>
        </div>
        <div className="basis-[35%] border-[1px] border-[#E4E7EC] rounded-[10px] p-8 max-md:p-4 ">
          <CheckoutPIForm />
        </div>
      </div>
    </>
  );
};

export default Checkout;
