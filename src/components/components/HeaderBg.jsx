"use client";
import { Button } from "@/components/components/shared/button";
import "../../app/globals.css";
import { TypeAnimation } from "react-type-animation";
import { useRouter } from "next/navigation";

const HeaderBg = ({ image, title, text }) => {
  const router = useRouter();
  return (
    <div
      className="relative z-10 bg-cover bg-no-repeat bg-center h-[80vh] w-full flex flex-col gap-[30px] justify-center items-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay */}
      {title && (
        // <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0 max-md:hidden" />
        <div className="absolute bottom-0 left-0 w-full h-[550px] max-md:h-[500px] bg-gradient-to-t from-black/50 to-transparent z-[1] pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-[20px]">
        {title ? (
          <h1
            style={{ fontFamily: "Jedira-Regular, sans-serif" }}
            className="text-[60px] text-white font-[400] max-md:text-[30px]"
          >
            {title}
          </h1>
        ) : (
          <TypeAnimation
            sequence={[
              "Thoughtful Gifting\nMade Easy.",
              1000,
              "Thoughtful Gifting\nMade Simple.",
              1000,
              "Thoughtful Gifting\nMade Seamless.",
              1000,
              "Thoughtful Gifting\nMade Effortless.",
              1000,
            ]}
            style={{ fontFamily: "Jedira-Regular, sans-serif" }}
            className="text-6xl text-white leading-[80px] max-md:leading-[70px] text-center font-medium whitespace-pre-line max-md:font-normal capitalize"
            repeat={Infinity}
          />
        )}

        {text ? (
          <div className="flex justify-center items-center">
            <p className="text-white w-[480px] text-center max-md:w-auto leading-relaxed mx-6">
              {text}
            </p>
          </div>
        ) : (
          <div className="flex gap-8 max-md:flex-col max-md:gap-4">
            {/* <button className="bg-white rounded-[8px] p-4 font-medium cursor-pointer hover:scale-105 hover:bg-black hover:text-white transition-all duration-200">
              Explore other collections
            </button>
            <button className="border-2 border-white text-white rounded-[8px] p-4 font-medium cursor-pointer hover:scale-105 transition-all duration-200 hover:bg-black hover:border-black/30 hover:text-white">
              Ready to ship gift box
            </button> */}
            <button
              onClick={() => router.push("/shop")}
              className="bg-white rounded-[8px] p-4 font-medium cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gradient-to-r hover:from-black hover:via-[#1a1a1a] hover:to-[#333333] hover:text-white"
            >
              Explore other collections
            </button>

            <button
              onClick={() => router.push("/buildBox")}
              className="border-2 border-white text-white rounded-[8px] p-4 font-medium cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gradient-to-r hover:from-black hover:via-[#1a1a1a] hover:to-[#333333] hover:border-black/10 "
            >
              Ready to ship gift box
            </button>
            {/* <button className="bg-white rounded-[8px] p-4 font-medium cursor-pointer transition-all duration-300 hover:text-white hover:scale-105  ">
              Explore other collections
            </button>

            <button className="border-2 border-white text-white rounded-[8px] p-4 font-medium cursor-pointer transition-all duration-300 hover:scale-105 hover:text-white animated-button ">
              Ready to ship gift box
            </button> */}

            {/* <Button variant="primary" className="hover:scale-105">Explore other collections</Button>
            <Button>Ready to ship gift box</Button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderBg;
