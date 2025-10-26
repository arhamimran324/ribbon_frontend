"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/components/ui/button";
import { useCart } from "react-use-cart";
import { toast } from "sonner";

export function QuantitySelector({ product }) {
  const { updateItemQuantity, getItem, addItem, items } = useCart();

  const cartItem = getItem(product.id);
  const quantity = cartItem?.quantity || 1;
  const itemInCart = items.some((b) => b.id === product.id);
  console.log("itemNotInCart", itemInCart);

  const increment = () => {
    if (!product || !product.id) {
      toast.warning("Invalid product!");
      return;
    }

    if (!cartItem) {
      // addItem({ ...product, quantity: 1 });
      toast.warning("First Add item to basket then increase quantity!");
    } else {
      updateItemQuantity(cartItem.id, cartItem.quantity + 1);
    }
  };

  const decrement = () => {
    if (!cartItem || !cartItem.id || cartItem.quantity <= 1) {
      toast.warning("At least one item needed to proceed!");
      return;
    }
    updateItemQuantity(cartItem.id, cartItem.quantity - 1);
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      <div className="flex items-center rounded-full bg-[#F6F6F6] px-5 py-2 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          className="text-[#667185] cursor-pointer "
          onClick={decrement}
        >
          <Minus size={16} />
        </Button>
        <span className="mx-4 text-[#D0B38B] font-semibold">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#D0B38B] cursor-pointer "
          onClick={increment}
        >
          <Plus size={16} />
        </Button>
      </div>

      <div className="text-sm text-[#667185]">
        Only{" "}
        <span className="text-[#D0B38B] font-semibold">
          {product.stock || product.quantity} Items
        </span>{" "}
        Left!
        <br />
        Don’t miss it
      </div>
    </div>
  );
}
