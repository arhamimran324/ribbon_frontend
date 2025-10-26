"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/components/Header";
import BestSellers from "@/components/components/BestSellers";
import ShopByCategory from "@/components/components/ShopByCategory";
import WhyChoose from "@/components/components/WhyChoose";
import CandleMaking from "@/components/components/CandleMaking";
import CustomCorporate from "@/components/components/CustomCorporate";
import GratefulWork from "@/components/components/GratefulWork";
import Footer from "@/components/components/Footer";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/components/ui/dialog";
// import { Button } from "@/components/components/ui/button";
import { Label } from "@/components/components/ui/label";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/shared/button";
import ShopByService from "@/components/components/ShopByService";
import Testimonials from "@/components/components/Testimonials";
import { HomeLayout } from "@/components/provider/home-layout";
import Image from "next/image";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // useEffect(() => {
  //   const hasVisited = localStorage.getItem("hasVisited");
  //   if (!hasVisited) {
  //     setOpen(true); // Show dialog on first visit
  //     // localStorage.setItem("hasVisited", "true"); // Mark as visited
  //   }
  // }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <HomeLayout>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[532px] max-md:w-[380px] ">
          <DialogHeader>
            <DialogTitle>
              <Image
                className="h-10 w-20 m-auto mt-4"
                src="/assets/svgs/modal.svg"
                alt="modal"
                width={80}
                height={40}
              />
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 pb-2">
            <h1
              style={{ fontFamily: "Jedira-Regular, sans-serif" }}
              className="text-[40px] text-black text-center font-normal max-md:text-[20px]"
            >
              Enjoy 10% off
            </h1>
            <p className="text-[#475367] text-center ">
              Subscribe to our newsletter and enjoy 10% off your first order.
              Gain early access to our vintage drops, and more.
            </p>

            <div className="m-auto">
              <Input
                placeholder="Email address"
                className="w-[425px] h-[56px] max-md:w-[300px] "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="primary"
              className="w-[92%] h-[56px] m-auto"
              onClick={() => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email) {
                  toast.error("Please enter your email!");
                } else if (!emailRegex.test(email)) {
                  toast.error("Please enter a valid email address!");
                  setEmail("");
                } else {
                  toast.success("Email Submitted successfully!");
                  setEmail("");
                  setOpen(false);
                }
              }}
            >
              Subscribe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BestSellers title="Best Sellers" />
      <ShopByCategory />
      <ShopByService />
      <WhyChoose />
      <CandleMaking />
      <CustomCorporate />
      <GratefulWork />
      <Testimonials />
      {/* <ProductDetails/> */}
      {/* <BasketDrawer/> */}
    </HomeLayout>
  );
};

export default HomePage;
