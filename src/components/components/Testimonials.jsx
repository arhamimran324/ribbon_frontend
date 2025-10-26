import React from "react";
import { Card, CardContent } from "@/components/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/components/ui/carousel";

import { testimonials } from "@/data";
const Testimonials = () => {
  return (
    <div className="py-10 px-6 md:px-20 h-[400px] ">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[32px] text-black text-center font-normal mt-[-28px] max-md:mt-6 max-md:text-[20px] mb-6"
      >
        What our clients say
      </h1>

      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {testimonials.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="p-8 h-60 rounded-3xl bg-[#F9F9F8] flex flex-col justify-between">
                  <CardContent className="p-0 flex flex-col gap-4 h-full justify-between">
                    <div className="space-y-5">
                      {/* Star Ratings */}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <img
                            key={i}
                            src={item.star}
                            alt="star"
                            className="w-5 h-5"
                          />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-[#000000] text-sm">{item.text}</p>
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center gap-2 mt-4">
                      <img
                        src={item.profileIcon}
                        alt="profile"
                        className="w-6 h-6"
                      />
                      <p className="text-[#000000] text-sm font-medium">
                        {item.profileName}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Controls - Bottom Right */}
          <div className="absolute -bottom-8 right-12 flex gap-2">
            <CarouselPrevious className="rounded-full border border-black w-10 h-10" />
            <CarouselNext className="rounded-full border border-black w-10 h-10" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
