"use client";
import React from "react";
import { bestSellers, myBasket } from "@/data";

import { useState } from "react";
import { Minus, Plus, X } from "lucide-react"; // optional icons from lucide
// import { Button } from "@/components/components/ui/button";
import { useRouter } from "next/navigation";
import { useCart } from "react-use-cart";
import { Button } from "@/components/components/shared/button";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { resetCheckout } from "@/redux/slices/checkout-slice";

const ByBasket = ({ stock = 12, onClose }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const {
    totalItems,
    isEmpty,
    items,
    cartTotal,
    removeItem,
    updateItemQuantity,
  } = useCart();
  const dispatch = useAppDispatch();

  const increment = (item) => {
    updateItemQuantity(item.id, item.quantity + 1);
  };

  const decrement = (item) => {
    if (item.quantity > 1) {
      updateItemQuantity(item.id, item.quantity - 1);
    }
  };

  if (totalItems === 0)
    return (
      <>
        <div className="flex justify-between items-center px-5 py-4">
          <div className="flex gap-2 items-center">
            <h1 className="font-semibold text-2xl ">My Basket</h1>
            <button className="bg-[#D5A581] w-6 h-6 rounded-full text-white ">
              {totalItems}
            </button>
          </div>
          <X onClick={onClose} cursor="pointer" color="#475367" size={24} />
        </div>
        <p className="pt-8 flex justify-center items-center text-2xl font-medium ">
          The cart is empty!
        </p>
      </>
    );

  return (
    <div className="w-full max-w-[590px]">
      <div className="px-5 py-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h1 className="font-semibold text-2xl ">My Basket</h1>
            <button className="bg-[#D5A581] w-6 h-6 rounded-full text-white ">
              {totalItems}
            </button>
          </div>
          <X onClick={onClose} cursor="pointer" color="#475367" size={24} />
        </div>
        <div className="flex flex-col gap-7 mt-10 mb-7 ">
          {items.map((item, index) => (
            <div key={index} className="flex gap-6 max-md:gap-3">
              <img
                className="h-48 w-52 max-md:h-28 max-md:w-32 basis-[40%] rounded-[10px] "
                src={item.image}
                alt={item.title}
              />
              <div className="py-2 basis-[60%]">
                <div className="flex justify-between my-3 max-md:my-1">
                  <p className="font-semibold max-md:text-[10px] max-md:whitespace-nowrap text-[#101928] ">
                    {item.title}
                  </p>
                  <p className="flex items-baseline font-semibold text-black">
                    <span className="text-sm max-md:text-[10px] mr-0.5">$</span>
                    <span className="text-lg max-md:text-[12px] ">
                      {item.price * item.quantity}
                    </span>
                    <span className="text-sm max-md:text-[10px] ml-0.5">
                      .00
                    </span>
                  </p>
                </div>
                <div className="text-[#475367] max-md:text-[9px] ">
                  <p>
                    Discount:{" "}
                    <span className="font-semibold ">{item.discount}%</span>
                  </p>
                </div>
                <div className="flex justify-between mt-5 max-md:mt-2">
                  <div className="flex items-center justify-center h-10 w-32 max-md:h-6 max-md:w-26 rounded-full bg-[#F6F6F6] px-3 py-3 max-md:px-2 max-md:py-2 shadow-sm">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#667185] cursor-pointer max-md:text-[10px]"
                      onClick={() => decrement(item)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} className="max-md:text-[10px]" />
                    </Button>
                    <span className="mx-4 max-md:mx-1 text-[#D0B38B] font-semibold max-md:text-[10px] ">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#D0B38B] cursor-pointer max-md:text-[10px]"
                      onClick={() => increment(item)}
                    >
                      <Plus size={16} className="max-md:text-[10px]" />
                    </Button>
                  </div>
                  <img
                    className="cursor-pointer"
                    src="/assets/svgs/delete.svg"
                    alt="delete"
                    onClick={() => {
                      removeItem(item.id);
                      dispatch(resetCheckout());
                      toast.success("Item removed from cart successfully!");
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="border-[2px] border-t border-[#F0F2F5] w-[100%] max-md:w-[98%] max-md:m-auto my-5 max-md:my-5" />
        <div className="flex justify-between my-3">
          <p className="font-normal text-[#667185] max-md:text-[14px] ">
            Subtotal:
          </p>
          <p className="flex items-baseline font-semibold text-black">
            <span className="text-sm max-md:text-[10px] mr-0.5">$</span>
            <span className="text-lg max-md:text-[12px] ">
              {cartTotal?.toFixed(2)}
            </span>
            {/* <span className="text-sm max-md:text-[10px] ml-0.5">.00</span> */}
          </p>
        </div>
        <hr className="border-[2px] border-t border-[#F0F2F5] w-[100%] max-md:w-[98%] max-md:m-auto my-5 max-md:my-5" />
        {/* <Button
        onClick={() => router.push("/checkout")}
        className="w-[100%] h-[56px] text-[16px] font-bold m-auto rounded-[30px] hover:bg-gradient-to-r hover:from-black hover:via-[#1a1a1a] hover:to-[#333333] hover:animate-gradient-x hover:scale-105 transition-all duration-100 "
      >
        Checkout
      </Button> */}
        <Button
          onClick={async () => {
            router.push("/checkout");
            onClose();
          }}
          variant="primary"
          className="w-[100%] h-[56px] rounded-[30px]"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default ByBasket;
