import React from "react";
import { Card, CardContent } from "@/components/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/components/ui/carousel";
import CustomForm from "./CustomForm";

const images = [
  { image: "/assets/svgs/fragrancebar/frag1.svg" },
  { image: "/assets/svgs/fragrancebar/frag3.svg" },
  { image: "/assets/svgs/fragrancebar/frag4.svg" },
  { image: "/assets/svgs/fragrancebar/frag1.svg" },
  { image: "/assets/svgs/fragrancebar/frag3.svg" },
  { image: "/assets/svgs/fragrancebar/frag4.svg" },
];

const FragranceBar = () => {
  return (
    <div className="py-10 px-4 md:px-10 lg:px-20">
      <img
        className="h-96 w-full object-cover rounded-3xl"
        src="/assets/svgs/fragrancebar/fragMain.svg"
        alt="frag"
      />
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[40px] md:text-[56px] text-center text-black font-normal mt-5 "
      >
        <span style={{ fontFamily: "Jedira-Italic, sans-serif" }}>The</span>{" "}
        Fragrance Bar
      </h1>
      <p className="text-[#4E525F] text-[14px] text-center mt-2 px-2">
        The Fragrance Bar is our mobile, immersive scent experience designed to
        elevate your events and <br className="hidden md:block" />
        activations with custom fragrance blending on-site. From brand pop-ups
        and corporate functions to <br className="hidden md:block" />
        weddings and private parties, our bar brings luxury and creativity
        together in one unforgettable <br className="hidden md:block" />
        sensory moment.
      </p>

      <div className="relative w-full mt-10">
        <Carousel>
          <CarouselContent className="-ml-2">
            {images.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-2 w-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="overflow-hidden py-0 rounded-[0] ">
                    <CardContent className="flex py-0 aspect-square items-center justify-center p-0">
                      <img
                        src={item.image}
                        alt={`Fragrance ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows at bottom-right */}
          <div className="absolute -bottom-18 right-16 flex">
            <CarouselPrevious className="relative" />
            <CarouselNext className="relative" />
          </div>
        </Carousel>
      </div>
      <div className="pt-16">
        <CustomForm />
      </div>
    </div>
  );
};

export default FragranceBar;
