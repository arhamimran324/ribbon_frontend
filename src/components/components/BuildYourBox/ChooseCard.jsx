"use client";
import React from "react";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/components/ui/card";
// import { Button } from "@/components/components/ui/button";
import { Input } from "@/components/components/ui/input";
import { Textarea } from "@/components/components/ui/textarea";
import { Checkbox } from "@/components/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/components/ui/select";
import { Label } from "@/components/components/ui/label";
import { Button } from "@/components/components/shared/button";

const cardOptions = [
  {
    id: "thank-you",
    label: "Thank You",
    img: "/assets/images/chooseCard/thankyou.png",
  },
  {
    id: "celebrate",
    label: "Celebrate",
    img: "/assets/images/chooseCard/celebrate.png",
  },
  {
    id: "cant-say",
    label: "I can't say 'I do' without you",
    img: "/assets/images/chooseCard/without.jpg",
  },
  {
    id: "thinking-of-you",
    label: "Thinking of you",
    img: "/assets/images/chooseCard/thinking.png",
  },
  { id: "xoxo", label: "XOXO", img: "/assets/images/chooseCard/xoxo.png" },
];

const ChooseCard = ({ next }) => {
  const [selectedCard, setSelectedCard] = useState(cardOptions[0]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="mt-10 px-32 mb-20 bg-[#fdfdfc] max-md:mx-6 ">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[44px] text-center text-black font-normal max-md:text-[28px]"
      >
        Choose your card
      </h1>
      <p className="text-[#4E525F] text-[14px] text-center mt-2 ">
        Choose the perfect card for the occasion from our selection of exclusive
        designs. Our team handwrites each and <br /> every note to keep your
        gifts personal. (Plus, we have great handwriting.)
      </p>
      <div className="flex justify-between max-md:flex-col max-md:px-0 max-md:justify-center max-md:items-center max-md:gap-8 mt-16">
        {/* Card Selector */}
        <div className="basis-[30%] max-md:basis-[90%] space-y-5 ">
          <img
            src={selectedCard.img}
            alt={selectedCard.label}
            // className="object-fill"
            className="w-[90%] max-md:w-[100%] h-[60%] max-md:h-[40%] object-cover"
          />

          <Select
            onValueChange={(value) =>
              setSelectedCard(cardOptions.find((card) => card.id === value))
            }
            className="cursor-pointer"
          >
            <SelectTrigger className="w-[90%] max-md:w-[100%] h-[55px] ">
              <SelectValue className="text-black " placeholder="Change card" />
            </SelectTrigger>
            <SelectContent>
              {cardOptions.map((card) => (
                <SelectItem key={card.id} value={card.id}>
                  {card.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-5 flex-wrap">
            {cardOptions.map((card) => (
              <img
                key={card.id}
                src={card.img}
                alt={card.label}
                className={`w-14 h-14 cursor-pointer border ${
                  card.id === selectedCard.id ? "ring-2 ring-black" : ""
                }`}
                onClick={() => setSelectedCard(card)}
              />
            ))}
          </div>
        </div>

        {/* Message Form */}
        <Card className="basis-[60%] max-md:basis-[90%] max-md:rounded-none max-md:mt-6 h-[50%] py-0 bg-[#f9f9f9] border-none ">
          <CardContent className="p-4 space-y-4">
            <div className="flex max-md:flex-col gap-4">
              <div>
                <Label className="mb-2">To</Label>
                <Input
                  className="h-[55px] w-[24.2vw] max-md:w-[80vw] border-[1px] border-[#D0D5DD] "
                  placeholder="To"
                />
              </div>
              <div>
                <Label className="mb-2">From</Label>
                <Input
                  className="h-[55px] w-[24.2vw] max-md:w-[80vw] border-[1px] border-[#D0D5DD] "
                  placeholder="From"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">
                Enter your message
              </label>
              <Textarea
                className="h-36 resize-none border-[1px] border-[#D0D5DD] "
                placeholder="Enter your card message here"
                rows={5}
              />
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox id="blank" />
              <label htmlFor="blank" className="text-[16px] ">
                Leave the card blank to fill in yourself.
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="no-note" />
              <label htmlFor="no-note" className="text-[16px] ">
                No note or card needed.
              </label>
            </div>

            {/* <Button
              onClick={next}
              className="w-full cursor-pointer mt-2 h-[55px] bg-black text-white hover:bg-gradient-to-r hover:from-black hover:via-[#1a1a1a] hover:to-[#333333] hover:animate-gradient-x "
            >
              Add to cart
            </Button> */}
            <Button
              onClick={next}
              variant="primary"
              className="w-full cursor-pointer mt-2 h-[55px]"
            >
              Add to cart
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChooseCard;
