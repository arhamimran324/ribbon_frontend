"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBoxData } from "@/data";
import RadioGroupBtns from "@/components/components/ui/RadioGroupBtns";
import { Textarea } from "@/components/components/ui/textarea";
import { Button } from "@/components/components/shared/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setPersonalizationMessage,
  setPersonalizationOption,
  setSelectedBoxData,
  setSelectedBoxIndex,
} from "@/redux/slices/built-box-slice";

const SelectYourBox = ({ next }) => {
  const dispatch = useAppDispatch();
  const { selectedBoxIndex, personalizationOption, personalizationMessage } =
    useAppSelector((state) => state.buildBox);

  const handleBoxSelect = (index) => {
    dispatch(setSelectedBoxIndex(index));
    dispatch(setSelectedBoxData(selectBoxData[index]));
  };

  const handlePersonalizationChange = (value) => {
    dispatch(setPersonalizationOption(value));
  };

  const handleMessageChange = (event) => {
    dispatch(setPersonalizationMessage(event.target.value));
  };

  const handleContinue = () => {
    // You can add validation here if needed
    if (selectedBoxIndex === null) {
      alert("Please select a box");
      return;
    }
    next();
  };

  return (
    <div className="mt-10 mb-20">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[44px] text-center text-black font-normal max-md:text-[28px]"
      >
        Build Your Box
      </h1>
      <p className="text-[#4E525F] text-[14px] text-center mt-2">
        Build your own gift box by choosing unique items they will love!
      </p>

      <div className="flex justify-center max-md:flex-col max-md:items-center gap-10 my-16 max-md:my-8">
        {selectBoxData.map((item, index) => (
          <div
            onClick={() => handleBoxSelect(index)}
            className={`cursor-pointer p-2 rounded-lg transition border-2 ${
              selectedBoxIndex === index
                ? "border-[#D0B38B] border-2"
                : "border-transparent"
            }`}
            key={index}
          >
            <img
              className="w-[275px] h-[278px]"
              src={item.image}
              alt={item.title}
            />
            <div className="text-center">
              <h3 className="font-semibold mt-4 mb-3">{item.title}</h3>
              <p className="flex justify-center items-center gap-2 text-[#4E525FCC] font-medium">
                <img src="/assets/svgs/correct.svg" alt="correct" />
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center max-md:flex-col items-center gap-6">
        <h2 className="font-semibold text-[18px]">
          Do you want to personalize your box?
        </h2>
        <RadioGroupBtns
          firstBtnText="Yes"
          secondBtnText="No"
          value={personalizationOption}
          onChange={handlePersonalizationChange}
        />
      </div>

      {personalizationOption === "yes" && (
        <div className="mt-7 mb-2 flex flex-col justify-center items-center m-auto">
          <p className="text-[#344054] text-[14px] font-medium mb-2">
            Enter your message
          </p>
          <Textarea
            className="h-40 w-[40vw] max-md:w-[90vw] resize-none"
            placeholder="Enter your card message here"
            value={personalizationMessage}
            onChange={handleMessageChange}
          />
        </div>
      )}

      <div className="flex justify-center mt-5">
        <Button
          variant="primary"
          className="w-[40vw] max-md:w-[90vw] h-[55px] font-medium"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SelectYourBox;
