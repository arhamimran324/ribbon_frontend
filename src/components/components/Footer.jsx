"use client";
import { Button } from "@/components/components/shared/button";
import useIsMobile from "../../hooks/useIsMobile";
import React, { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isMobile = useIsMobile();
  return (
    <div className="h-auto px-26 flex flex-col justify-center gap-3 bg-[#F5F3EB] py-14 max-md:px-4">
      <div className="flex gap-24 max-[1050px]:flex-wrap max-lg:gap-14 max-md:flex-col max-md:gap-14">
        <div className="flex flex-col gap-10 max-md:bg-[#FDFDFC] max-md:rounded-[40px] max-md:h-[325px] max-md:justify-center max-md:items-center max-md:px-3 max-md:py-6 ">
          <h1
            style={{ fontFamily: "Jedira-Regular, sans-serif" }}
            className={` ${isMobile ? "text-2xl" : "text-4xl"} font-[500]`}
          >
            GET <span className="text-[#D0B38B] ">20%</span> OFF when <br /> you
            subscribe
          </h1>
          <div className="flex gap-2">
            <input
              placeholder="Email address"
              className="bg-white rounded-[6px] h-14 w-[50%] p-[16px] border-[1px] border-[#D0D5DD] max-md:px-[10px] max-md:w-[150px] focus:outline-none focus:ring-0 "
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              onClick={() => {
                if (!email) {
                  toast.error("Please enter your email!");
                } else if (!emailRegex.test(email)) {
                  toast.error("Please enter a valid email address!");
                  setEmail("");
                } else {
                  toast.success(
                    "You are successfully subscribed to our newsletter!"
                  );
                  setEmail("");
                }
              }}
              // className="bg-black text-white py-4 px-6 rounded-[8px] cursor-pointer hover:bg-gradient-to-r hover:from-black hover:via-[#1a1a1a] hover:to-[#333333] hover:animate-gradient-x hover:scale-105 transition-all duration-200"
              className="h-14 max-md:text-[16px] max-md:font-medium max-md:p-3 "
            >
              Subscribe
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-black/60">Company</p>
          <div className="flex flex-col gap-4">
            <a
              className="font-medium hover:text-[#D5A581] transition-all duration-300 "
              href="/about"
            >
              About
            </a>
            <a
              className="font-medium hover:text-[#D5A581] transition-all duration-300"
              href=""
            >
              Security
            </a>
            <a
              className="font-medium hover:text-[#D5A581] transition-all duration-300"
              href="/blogs"
            >
              Blog
            </a>
            <a
              className="font-medium hover:text-[#D5A581] transition-all duration-300"
              href=""
            >
              Partnerships
            </a>
            <a
              className="font-medium hover:text-[#D5A581] transition-all duration-300"
              href=""
            >
              Community
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-black/60">Useful links</p>
          <div className="flex flex-col gap-4">
            <a
              className="font-medium hover:text-[#D5A581] transition-all duration-300"
              href="/faqs"
            >
              FAQ
            </a>
            <a
              className="font-medium hover:text-[#D5A581] transition-all duration-300"
              href="/delivery&returns"
            >
              Delivery & Returns
            </a>
            <a
              className="font-medium hover:text-[#D5A581] transition-all duration-300"
              href=""
            >
              Privary Policy
            </a>
            <a
              className="font-medium hover:text-[#D5A581] transition-all duration-300"
              href=""
            >
              Terms & Conditions
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-black/60">Social</p>
          <div className="flex flex-col gap-4">
            <a
              className="font-medium hover:text-[#D5A581] transition-all duration-300"
              href=""
            >
              Instagram
            </a>
            <a
              className="font-medium hover:text-[#D5A581] transition-all duration-300"
              href=""
            >
              Tiktok
            </a>
            <a
              className="font-medium hover:text-[#D5A581] transition-all duration-300"
              href=""
            >
              Facebook
            </a>
            <a
              className="font-medium hover:text-[#D5A581] transition-all duration-300"
              href=""
            >
              Pintrest
            </a>
          </div>
        </div>
      </div>
      <hr className="border-t border-black w-[84vw] m-auto my-6" />

      <div className="flex justify-between max-md:flex-col max-md:justify-start max-md:items-start max-md:gap-5">
        <div className="flex gap-4">
          <a className="font-medium" href="">
            Terms of Service
          </a>
          <a className="font-medium" href="">
            Privacy Policy
          </a>
        </div>
        <p className="max-md:text-left">
          {" "}
          {/* Add margin top here for spacing */}
          Copyright ©2025 Ribbon and Bow Store
        </p>
      </div>
    </div>
  );
};

export default Footer;
