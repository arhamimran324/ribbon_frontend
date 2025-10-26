import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import { useRouter } from "next/navigation";
import { useCart } from "react-use-cart";
import { toast } from "sonner";
import { Button } from "@/components/components/shared/button";

const PaginatedCandleMaking = ({ candleMaking }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { addItem, items } = useCart();

  if (!candleMaking || !Array.isArray(candleMaking)) {
    return <div>No Candle Making found.</div>;
  }

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setItemsPerPage(isMobileView ? 9 : 8);
      setIsMobile(isMobileView);
    };

    handleResize(); // on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const offset = currentPage * itemsPerPage;
  const currentItems = candleMaking.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(candleMaking.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      {/* Cards */}
      <div className="mt-8 mb-8 max-w-full flex flex-wrap justify-between ">
        {currentItems.map((item, index) => {
          const isInCart = items.some((cartItem) => cartItem.id === item.id);
          console.log("Items", items);

          return (
            <div
              key={index}
              className="p-2 w-[25%] max-[1150px]:w-auto mb-12 max-md:w-[50%] max-sm:w-[100%] max-md:mb-6 cursor-pointer"
              onClick={() => router.push(`/candledetail?id=${item.id}`)}
            >
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
              <p className="font-semibold mt-3 text-[#101928] ">{item.title}</p>
              <p className="text-[#848484] mt-2 ">{item.date}</p>
              <div className="flex justify-between my-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isInCart) {
                      addItem(item);
                      toast.success("Item added to cart successfully!");
                    }
                  }}
                  disabled={isInCart}
                  className={`group/item border rounded-3xl px-3 py-1 font-medium flex gap-2 justify-center items-center text-sm
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
                        isInCart
                          ? "fill-gray-400"
                          : "group-hover/item:fill-white"
                      } ${isInCart ? "fill-gray-400" : "fill-black"}`}
                    >
                      <path d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z" />
                    </svg>
                  </span>
                  {isInCart ? "Added" : "Add to basket"}
                </button>
                <p className="flex items-baseline font-semibold text-black">
                  <span className="text-sm mr-0.5">$</span>
                  <span className="text-lg">{item.price}</span>
                  <span className="text-sm ml-0.5">.00</span>
                </p>
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

export default PaginatedCandleMaking;
