"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartWrapper from "../components/components/CartWrapper";
import { Toaster } from "../components/components/ui/sonner";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<div>loading....</div>}>
          <Provider store={store}>
            <div className="w-full max-w-[3840px] mx-auto">
              <CartWrapper>
                <Toaster position="top-right" richColors />
                {children}
              </CartWrapper>
            </div>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
