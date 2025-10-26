import React from "react";
import PaginatedCorporateGifting from "./paginatedCorporateGifting/PaginatedCorporateGifting";
import { corporateGiftingImgs } from "@/data";
import CustomForm from "./CustomForm";

const CorporateGifting = () => {
  return (
    <div className="py-10 px-4 md:px-10 lg:px-20">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[30px] md:text-[56px] text-center text-black font-normal mt-5 "
      >
        <span style={{ fontFamily: "Jedira-Italic, sans-serif" }}>Custom</span>{" "}
        Corporate Gifting
      </h1>
      <p className="text-[#4E525F] text-[14px] text-center mt-2 px-2">
        Elevate client and team gifts with our bespoke corporate gifting
        service. We handle everything- from <br /> curation to delivery straight
        to each recipient- saving you time while making a lasting impression.
      </p>
      <PaginatedCorporateGifting corporateGiftingImgs={corporateGiftingImgs} />
      <div>
        <CustomForm />
      </div>
    </div>
  );
};

export default CorporateGifting;
