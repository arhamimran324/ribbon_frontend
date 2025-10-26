import React from "react";
import { whyChoose } from "@/data";

const WhyChoose = () => {
  return (
    <div className="px-20 py-10 h-auto max-md:px-8 max-md:h-auto max-md:py-4 max-md:pb-10">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[32px] text-black font-normal mt-[-28px] max-md:mt-6 max-md:text-[20px] mb-6 max-md:text-center"
      >
        Why choose Ribbon & Bow for <br /> your gifting?
      </h1>
      <div className="mt-8 mb-8 grid grid-cols-2 md:grid-cols-2 justify-between max-[1300px]:flex-wrap max-[1300px]:space-y-6 max-md:flex-wrap max-md:justify-center  max-md:gap-8 max-md:items-center">
        {whyChoose.map((item, index) => (
          <div
            key={index}
            className="p-3 cursor-pointer hover:shadow-2xl hover:rounded-2xl transition-all duration-300 max-md:flex max-md:flex-col max-md:justify-center max-md:items-center "
          >
            <img
              className="h-24 max-sm:h-12"
              src={item.image}
              alt={item.title}
            />
            <h3 className="text-2xl font-semibold mb-2 mt-4 max-md:text-center">
              {item.title}
            </h3>
            <p className="text-[#475367] max-md:text-center text-align:justify">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
