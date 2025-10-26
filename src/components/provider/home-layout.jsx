"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";

export const HomeLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
