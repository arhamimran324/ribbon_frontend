"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/components/ui/sheet";
import { Button } from "@/components/components/ui/button";
import ByBasket from "./ByBasket";

const BasketDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Basket</Button>
      </SheetTrigger>
      {/* 👇 This opens from the right */}
      <SheetContent side="right" className="w-[100vw]">
        {/* <SheetHeader>
          <SheetTitle>My Basket</SheetTitle>
          <SheetDescription>Items in your cart</SheetDescription>
        </SheetHeader>

        <div className="p-4">Cart items will go here</div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter> */}
        <ByBasket/>
      </SheetContent>
    </Sheet>
  );
};

export default BasketDrawer;
