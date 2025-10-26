"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { TypeAnimation } from "react-type-animation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/components/ui/dropdown-menu";
import { countries } from "@/data";
import HeaderBg from "./HeaderBg";
import { usePathname } from "next/navigation";

// import { DropdownMenu } from "@/components/components/ui/dropdown-menu";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [selectedCountry, setSelectedCountry] = useState("United States");

  const selectedCountryData = countries.find(
    (country) => country.name === selectedCountry
  );
  const pathname = usePathname();

  const renderHeaderBg = () => {
    if (pathname === "/") {
      return <HeaderBg image="/assets/images/headerImg.png" />;
    }
    if (pathname === "/shop") {
      return (
        <HeaderBg
          image="/assets/images/wellnessBg.png"
          title="Wellness"
          text="Our luxury gift boxes, thoughtfully curated to promote relaxation, health, and mindfulness. Explore wellness boxes for birthdays, pampering, or stress relief."
        />
      );
    }
    return null; // For all other paths
  };

  return (
    <>
      <div className="bg-[#292424] text-[12px] text-white flex justify-between items-center h-12 max-md:h-20 pt-4 pb-4 px-20 max-md:justify-center max-md:pl-2 max-md:pr-2">
        <div className="flex gap-2 max-md:hidden ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            className="mt-0.5"
          >
            <path
              fill="currentColor"
              d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"
            />
          </svg>
          +1 2345 56768
        </div>
        <div className="flex items-center justify-between max-md:flex-col max-md:items-center max-md:text-center max-md:text-[12px]">
          <p>FREE U.K. DELIVERY ON ORDERS OVER £25 WITH CODE: FREESHIP</p>

          <div className="h-5 border-l border-gray-400 mx-3 max-md:hidden"></div>
          <p className="text-[#D5A581]">Shop Now</p>
        </div>
        {/* hover:bg-white hover:text-black hover:px-1 hover:rounded-2xl transition-all duration-100 */}
        <div className="flex gap-1 max-md:hidden">
          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="group flex gap-2 items-center cursor-pointer 
                       hover:bg-[#F5F3EB] hover:text-black px-2 py-1 rounded-full 
                       focus:outline-none focus:ring-0 transition-all duration-100"
              >
                {selectedLanguage}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="fill-white group-hover:fill-black"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.43 8.512a.75.75 0 0 1 1.058-.081L12 14.012l6.512-5.581a.75.75 0 0 1 .976 1.138l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.057"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black">
              <DropdownMenuLabel>Languages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["EN", "FR", "DE"].map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  className="cursor-pointer"
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Country Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="group w-40 flex gap-2 items-center cursor-pointer whitespace-nowrap 
                       hover:bg-[#F5F3EB] hover:text-black px-2 py-1 rounded-full 
                       focus:outline-none focus:ring-0 transition-all duration-100"
              >
                {selectedCountryData && (
                  <span className="text-xl">{selectedCountryData.flag}</span>
                )}
                {selectedCountry}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="fill-white group-hover:fill-black"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.43 8.512a.75.75 0 0 1 1.058-.081L12 14.012l6.512-5.581a.75.75 0 0 1 .976 1.138l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.057"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black">
              <DropdownMenuLabel>Countries</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {countries.map((country, index) => (
                <DropdownMenuItem
                  key={index}
                  className="cursor-pointer"
                  onClick={() => setSelectedCountry(country.name)}
                >
                  <span>{country.flag}</span>
                  <p>{country.name}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="bg-[#F5F3EB] h-12 flex justify-center items-center">
        ★★★★★ OVER 32,000 5 STAR REVIEWS
      </div>

      <Navbar />

      {renderHeaderBg()}
    </>
  );
};

export default Header;
