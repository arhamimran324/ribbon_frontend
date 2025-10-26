// components/GratefulWork.jsx

"use client";
import React from "react";
import { gratefulWork } from "@/data";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dynamically import react-slick
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

const GratefulWork = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 1800,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="py-17 px-8">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="font-normal text-4xl text-center max-md:text-2xl mb-12"
      >
        Grateful to have worked with
      </h1>
      <Slider {...settings}>
        {gratefulWork.map((item, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              className="w-[150px] h-[60px] object-contain"
              src={item.image}
              alt={`Logo ${index}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GratefulWork;
