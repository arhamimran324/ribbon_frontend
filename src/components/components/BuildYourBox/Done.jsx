"use client";
import { Button } from "@/components/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Done = ({ back }) => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mt-7 mb-20 bg-[#fdfdfc] max-md:mx-6 max-md:mt-3 ">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[44px] text-center text-black font-normal max-md:text-[28px]"
      >
        Done, Thank you!
      </h1>
      <p className="text-[#4E525F] text-[14px] text-center mt-2 ">
        Your box has been added to cart.
      </p>
      <div className="pt-30">
        <Button
          onClick={back}
          className="bg-white cursor-pointer w-[100%] h-[55px] text-black border-[1px] border-black p-4 hover:bg-gradient-to-r hover:from-black hover:via-[#1a1a1a] hover:to-[#333333] hover:animate-gradient-x hover:text-white "
        >
          Build another box
        </Button>
      </div>
    </div>
  );
};

export default Done;
