"use client";
import { Button } from "@/components/components/shared/button";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const CandleMaking = () => {
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <div className="flex h-[450px] max-md:flex-col max-md:h-auto">
      {/* Video Section with Poster and Play/Pause on Hover */}
      <div
        className="w-1/2 relative bg-[#F5F3EB] max-md:w-full max-md:h-[350px] group overflow-hidden"
        onMouseLeave={() => {
          setPlaying(false);
        }}
      >
        {/* ReactPlayer - YouTube */}
        <ReactPlayer
          url="/assets/videos/Candlevideo.mp4"
          playing={playing}
          muted
          controls={false}
          width="100%"
          height="100%"
          className="react-player-wrapper"
        />

        {/* Poster overlay when not playing */}
        {!playing && (
          <img
            src="/assets/images/candleMaking.png"
            alt="candle_mak"
            className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
          />
        )}

        <button
          onClick={handlePlayPause}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full w-12 h-12 flex items-center justify-center z-20"
        >
          {!playing ? (
            <img className="h-7 w-7" src="/assets/svgs/play.svg" alt="play" />
          ) : (
            <img className="h-7 w-7" src="/assets/svgs/pause.svg" alt="pause" />
          )}
        </button>
      </div>

      {/* Text Section */}
      <div className="w-1/2 max-md:w-full bg-[#F5F3EB] flex flex-col justify-center px-20 max-md:px-6 max-md:py-10">
        <h1
          style={{ fontFamily: "Jedira-Regular, sans-serif" }}
          className="font-normal text-4xl max-md:text-2xl"
        >
          Candle making workshop
        </h1>
        <p className="text-[#101928] font-light my-6 gap-1">
          Indulge in our luxury soy candle and perfume-making workshops; perfect
          for self-care, gifting, or gathering with loved ones. We also offer
          private experiences in your space; get in touch or book your session
          online today.
        </p>
        {/* <button className="bg-black text-white py-4 px-6 rounded-[8px] cursor-pointer w-[30%] flex items-center justify-between gap-2 whitespace-nowrap max-md:w-[50%]"> */}
        {/* <button className="bg-black text-white w-[167px] h-[56px] rounded-[8px] cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap hover:bg-gradient-to-r hover:from-black hover:via-[#1a1a1a] hover:to-[#333333] hover:animate-gradient-x hover:scale-105 transition-all duration-200">
          Book a space
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="m10 17l5-5m0 0l-5-5"
            />
          </svg>
        </button> */}
        <Button
          variant="primary"
          className="flex items-center justify-center w-[200px] h-[56px] gap-2 whitespace-nowrap "
        >
          Book a space
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="m10 17l5-5m0 0l-5-5"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default CandleMaking;
