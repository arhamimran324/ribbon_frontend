"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import { useRouter } from "next/navigation";
import { useCart } from "react-use-cart";
import { toast } from "sonner";
import { Button } from "@/components/components/shared/button";

const PaginatedCorporateGifting = ({ corporateGiftingImgs }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { addItem, items } = useCart();

  if (!corporateGiftingImgs || !Array.isArray(corporateGiftingImgs)) {
    return <div>No Candle Making found.</div>;
  }

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setItemsPerPage(isMobileView ? 3 : 9);
      setIsMobile(isMobileView);
    };

    handleResize(); // on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const offset = currentPage * itemsPerPage;
  const currentItems = corporateGiftingImgs.slice(
    offset,
    offset + itemsPerPage
  );
  const pageCount = Math.ceil(corporateGiftingImgs.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      {/* Cards */}
      <div className="mt-8 mb-8 max-w-full flex flex-wrap justify-between gap-3">
        {currentItems.map((item, index) => {
          const isInCart = items.some((cartItem) => cartItem.id === item.id);
          console.log("Items", items);

          return (
            <div
              key={index}
              className=" w-[24%] max-[1150px]:w-auto max-md:w-[47%]  "
            //   onClick={() => router.push(`/candledetail?id=${item.id}`)}
            >
              <div className="relative group">
                <img
                  className="h-[400px] max-md:h-[200px] w-full object-cover"
                  src={item.img}
                  alt="imag"
                  // onClick={() => router.push("/productDetails")}
                />
                {/* <button
                  onClick={() => router.push(`/candledetail?id=${item.id}`)}
                  variant="primary"
                  className="bg-white/30 border-[1px] border-black rounded-2xl font-semibold cursor-pointer absolute left-[30%] top-[80%] px-10 py-1 text-[14px] hidden group-hover:block "
                >
                  View
                </button> */}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className={`${isMobile} ? "": flex justify-center`}>
        {!isMobile && (
          <div className="text-sm font-medium text-black text-center mt-2">
            Page {currentPage + 1} of {pageCount}
          </div>
        )}

        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          forcePage={currentPage}
          containerClassName="flex w-[400px] justify-center mb-20 items-center flex-wrap gap-3" // space between left/right
          pageClassName="text-[#98A2B3] px-3 py-1 rounded-md cursor-pointer order-1" // order left
          activeClassName="border-[1.5px] border-[#D5A581] rounded-[6px] text-black"
          previousClassName="border px-3 py-1 rounded-md cursor-pointer order-2" // order right
          nextClassName="border px-3 py-1 rounded-md cursor-pointer order-2" // order right
          breakLabel={isMobile ? null : "..."}
          breakClassName="px-3 py-1 order-1"
          marginPagesDisplayed={isMobile ? 0 : 2}
          pageRangeDisplayed={isMobile ? 0 : 1}
        />
      </div>
    </div>
  );
};

export default PaginatedCorporateGifting;
