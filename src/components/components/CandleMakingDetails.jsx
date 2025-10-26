"use client";
import React, { useState } from "react";
import {
  bestSellers,
  candleMaking,
  productPageBottomImages,
  candlePageBottomImages,
} from "@/data";
import ProductRating from "./ReactStars";
import RadioGroupBtns, { RadioGroupDemo } from "./ui/RadioGroupBtns";
import SelectBox from "./ui/SelectBox";
import { Input } from "@/components/components/ui/input";
import { Textarea } from "@/components/components/ui/textarea";
import { QuantitySelector } from "./ui/QuantitySelector";
import useIsMobile from "../../hooks/useIsMobile";
import { useCart } from "react-use-cart";
import { useRouter, useSearchParams } from "next/navigation";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button } from "@/components/components/shared/button";
import { toast } from "sonner";

const CandleMakingDetails = () => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => setExpanded(!expanded);
  const isMobile = useIsMobile();
  const { addItem, updateItemQuantity, items } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const product = candleMaking.find((b) => b.id === parseInt(id));
  const itemInCart = items.some((b) => b.id === product.id);
  console.log("itemNotInCart", itemInCart);

  console.log("Product", product);

  const galleryImages = [
    {
      original: "/assets/svgs/candleDetail/candleDetail1.svg",
      thumbnail: "/assets/svgs/candleDetail/candleDetail1.svg",
    },
    ...candlePageBottomImages.map((item) => ({
      original: item.image,
      thumbnail: item.image,
    })),
  ];

  const fullText =
    "Looking for a unique way to spend a spring afternoon in Central London? Join us at our Regent Street store for a relaxed and hands-on Beginners Candle Making Workshop – the perfect seasonal activity to enjoy solo or with friends. Led by one of our expert candle makers, you’ll be guided through the steps to create your own scented soy wax candle – the perfect hands-on activity to welcome the warmer months. Inspired by our best-selling book The Scented Candle Workshop, this session will cover everything from choosing the right wax and wick to blending your own bespoke scent using a selection of fragrance oils. You’ll pour a 6oz soy wax candle to take home, and enjoy a refreshing drink from our in-store coffee shop while you work. All materials are included, and you’ll also receive 20% off in-store purchases on the day. Please note that we don't send out physical tickets. The confirmation email is your e-ticket.";

  const previewText =
    "Looking for a unique way to spend a spring afternoon in Central London? Join us at our Regent Street store for a relaxed and hands-on Beginners Candle Making Works";

  return (
    <div className={`px-20 pb-10  max-md:px-4 max-md:py-1`}>
      {!isMobile && (
        <div className="text-[14px] py-10 text-[#D5A581] font-medium ">
          Candle making worskshp /{" "}
          <span className="text-[#667185]  ">Workshop details</span>
        </div>
      )}
      <div className=" w-full ">
        <div className="w-[95%] flex justify-between gap-10 max-lg:flex-col max-md:justify-center max-md:flex-col">
          <div className="basis-[35%]">
            <ImageGallery
              items={galleryImages}
              showFullscreenButton={false}
              showPlayButton={false}
              showNav={false}
              thumbnailPosition="bottom"
            />
          </div>
          <div className="basis-[55%]">
            <h1
              style={{ fontFamily: "Jedira-Regular, sans-serif" }}
              className="text-[32px] font-normal text-[#101928] whitespace-nowrap "
            >
              {product.title}
            </h1>
            <div>
              <p className="text-[14px] text-[#667185] font-normal mt-2 ">
                {expanded ? fullText : previewText}
              </p>
              <span
                style={{
                  color: "#D0B38B",
                  cursor: "pointer",
                  marginLeft: 5,
                  fontSize: "14px",
                  fontWeight: "500",
                  marginLeft: "-1px",
                }}
                onClick={handleToggle}
              >
                {expanded ? "View less" : "View more"}
              </span>
            </div>
            <ProductRating rating={5} reviews={124} />
            <h1 className="text-2xl font-bold text-[#101928] mt-3 ">
              ${product.price}.00
            </h1>
            <hr className="border-[1px] border-t border-[#F0F2F5] w-[full]  max-md:m-auto my-5 max-md:my-5" />

            <hr className="border-[1px] border-t border-[#F0F2F5] w-[full]  max-md:m-auto my-5 max-md:my-5" />

            <hr className="border-[1px] border-t border-[#F0F2F5] w-[full]  max-md:m-auto my-5 max-md:my-5" />
            <div>
              <p className="text-primary font-semibold">Quantity</p>
              <QuantitySelector product={product} />
              <div className="my-6 flex gap-4 ">
                <Button
                  variant="primary"
                  onClick={() => router.push("/checkout")}
                  className="rounded-full px-14"
                >
                  Buy now
                </Button>

                <button
                  onClick={() => {
                    if (itemInCart) {
                      toast.warning("Item is already in cart!");
                      return;
                    } else {
                      addItem(product);
                      toast.success("Item is added to cart successfully!");
                    }
                  }}
                  className={`border-2 border-black w-[196px] ${
                    itemInCart
                      ? '"bg-gray-600 text-gray-600 cursor-not-allowed "'
                      : "text-black cursor-pointer transition-all duration-200 hover:bg-black hover:border-none hover:text-white"
                  } max-md:w-[170px] max-sm:w-[150px] whitespace-nowrap rounded-full px-6 py-4 font-semibold`}
                  disabled={itemInCart}
                >
                  {itemInCart ? "Added" : "Add to basket"}
                </button>
              </div>
              <div className="flex justify-start items-start rounded-3xl p-6 max-md:p-4 gap-4 bg-white shadow-sm border border-[#E4E7EC] max-w-3xl">
                <div className="text-[#667185]">
                  <h2 className="font-bold text-gray-900 mb-2">
                    Delivery Information
                  </h2>
                  <p>
                    The confirmation email will be your ticket which will
                    include all further workshop details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-md:h-auto">
        <h1
          style={{ fontFamily: "Jedira-Regular, sans-serif" }}
          className="text-[32px] text-black font-normal max-md:text-[20px] mb-6 mt-8"
        >
          Similar Items You Might Like
        </h1>
        <div className="mt-8 mb-8 cursor-pointer flex justify-between basis-[22%] max-md:flex-wrap max-md:basis-[90%] max-md:justify-center max-md:items-center max-md:gap-8">
          {candleMaking.slice(0, 4).map((item, index) => {
            const isInCart = items.some((cartItem) => cartItem.id === item.id);
            return (
              <div key={index} className="p-2 w-[25vw] max-md:w-[100vw] ">
                <div className="relative group">
                  <img
                    className="h-[400px] max-md:h-[200px] w-full object-cover"
                    src={item.image}
                    alt={item.title}
                    // onClick={() => router.push("/productDetails")}
                  />
                  <button
                    onClick={() => router.push(`/candledetail?id=${item.id}`)}
                    variant="primary"
                    className="bg-white/30 border-[1px] border-black rounded-2xl font-semibold cursor-pointer absolute left-[30%] top-[80%] px-10 py-1 text-[14px] hidden group-hover:block "
                  >
                    View
                  </button>
                </div>
                <p className="font-[600] text-[14px] whitespace-nowrap mt-3 ">
                  {item.title}
                </p>
                <p className="font-medium text-[#848484] text-[13px] mt-1 ">
                  {item.date}
                </p>
                <p className="flex items-baseline font-semibold text-[13px] text-black mt-2 ">
                  <span className="text-sm mr-0.5">$</span>
                  <span className="text-lg">{item.price}</span>
                  <span className="text-sm ml-0.5">.00</span>
                </p>
                {/* <button
                  onClick={() => {
                    if (!isInCart) {
                      addItem(item);
                      toast.success("Item added to cart successfully!");
                    }
                  }}
                  disabled={isInCart}
                  className={`group border rounded-3xl px-3 py-1 font-medium flex gap-2 justify-center items-center text-sm
                    ${
                      isInCart
                        ? "border-gray-300 text-gray-400 cursor-not-allowed bg-gray-100"
                        : "border-gray-400 text-black hover:bg-black hover:text-white cursor-pointer"
                    }`}
                >
                  <span className="[&>svg]:w-4 [&>svg]:h-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className={`${
                        isInCart ? "fill-gray-400" : "group-hover:fill-white"
                      } ${isInCart ? "fill-gray-400" : "fill-black"}`}
                    >
                      <path d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z" />
                    </svg>
                  </span>
                  {isInCart ? "Added" : "Add to basket"}
                </button> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CandleMakingDetails;
