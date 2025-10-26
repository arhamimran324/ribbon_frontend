"use client";
import React from "react";
import useIsMobile from "../../hooks/useIsMobile.js";
import { useRouter } from "next/navigation";

const images = [
  {
    img: "/assets/svgs/shopByService/shopByService1.svg",
    title: "Candle Making",
    link: "/candlemaking",
  },
  {
    img: "/assets/svgs/shopByService/shopByService2.svg",
    title: "Perfume Making",
    link: "/candlemaking",
  },
  {
    img: "/assets/svgs/shopByService/shopByService3.svg",
    title: "The Fragrance Bar",
    link: "/fragrancebar",
  },
];

const ShopByService = () => {
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <div className="pl-20 pr-20 pt-3 h-full max-md:px-8 max-md:h-auto bg-[#F5F3EB] ">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[32px] text-black font-normal max-md:text-[20px] mb-6 mt-8"
      >
        Shop By Category
      </h1>
      <div className="mt-8 mb-8 flex flex-wrap justify-between space-y-8 max-md:space-y-0 max-md:flex-wrap max-md:justify-center max-md:items-center max-md:gap-8">
        {images.map((item, index) => (
          <div
            key={index}
            className="relative w-[32.5%] max-md:w-[40%] max-sm:w-[100%] cursor-pointer"
            onClick={() => router.push(item.link)}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-[100%] h-[500px] max-md:h-80 max-md:w-[100%]"
            />

            {/* <div className="absolute bottom-0 w-full bg-gradient-to-t from-white via-[#f5f5f5] to-transparent backdrop-blur-sm p-3">
                <p className="text-lg font-semibold text-black">{item.title}</p>
              </div> */}
            <div
              //   className={`absolute ${
              //     index === 3 && !isMobile ? "bottom-8" : "bottom-0"
              //   } w-full bg-gradient-to-t from-white via-[#f5f5f5] to-transparent backdrop-blur-[1px] p-3`}
              className={`absolute ${
                index == 0 || index == 1 ? "bottom-0" : "bottom-8"
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

export default ShopByService;
