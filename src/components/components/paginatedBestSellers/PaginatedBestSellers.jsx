import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import { useRouter } from "next/navigation";
import { useCart } from "react-use-cart";
import { toast } from "sonner";
import { Button } from "@/components/components/shared/button";

const PaginatedBestSellers = ({
  bestSellers,
  // New optional props for selection functionality
  onItemSelect,
  selectedItems = [],
  enableSelection = false,
  selectionMode = "single", // "single" or "multiple"
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { addItem, items } = useCart();

  console.log("Items", items);

  if (!bestSellers || !Array.isArray(bestSellers)) {
    return <div>No best sellers found.</div>;
  }

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setItemsPerPage(isMobileView ? 9 : 12);
      setIsMobile(isMobileView);
    };

    handleResize(); // on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const offset = currentPage * itemsPerPage;
  const currentItems = bestSellers.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(bestSellers.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Check if an item is selected
  const isItemSelected = (item) => {
    return selectedItems.some((selectedItem) => selectedItem.id === item.id);
  };

  // Handle item selection
  const handleItemSelect = (e, item) => {
    e.stopPropagation();

    if (!enableSelection || !onItemSelect) return;

    if (selectionMode === "single") {
      // For single selection, replace the current selection
      if (isItemSelected(item)) {
        onItemSelect([]); // Deselect if already selected
      } else {
        onItemSelect([item]);
      }
    } else {
      // For multiple selection, toggle the item
      if (isItemSelected(item)) {
        // Remove item from selection
        const updatedSelection = selectedItems.filter(
          (selectedItem) => selectedItem.id !== item.id
        );
        onItemSelect(updatedSelection);
      } else {
        // Add item to selection
        const updatedSelection = [...selectedItems, item];
        onItemSelect(updatedSelection);
      }
    }
  };

  // Handle card click - navigate to product details or select item
  const handleCardClick = (item) => {
    if (enableSelection && onItemSelect) {
      // In selection mode, clicking the card selects the item
      handleItemSelect({ stopPropagation: () => {} }, item);
    } else {
      // Normal behavior - navigate to product details
      router.push(`/productDetails?id=${item.id}`);
    }
  };

  // Handle view button click
  const handleViewClick = (e, item) => {
    e.stopPropagation();
    router.push(`/productDetails?id=${item.id}`);
  };

  // Handle add to cart - remains unchanged for backward compatibility
  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    if (!items.some((cartItem) => cartItem.id === item.id)) {
      addItem(item);
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <div>
      {/* Selection mode indicator */}
      {enableSelection && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm font-medium">
            {selectionMode === "single"
              ? "Select one item"
              : `Select multiple items (${selectedItems.length} selected)`}
          </p>
        </div>
      )}

      {/* Cards */}
      <div className="mt-8 mb-8 max-w-full flex flex-wrap">
        {currentItems.map((item, index) => {
          const isInCart = items.some((cartItem) => cartItem.id === item.id);
          const isSelected = enableSelection && isItemSelected(item);

          return (
            <div
              key={index}
              className={`p-2 w-[25%] max-[1150px]:w-auto mb-12 max-md:w-[50%] max-sm:w-[100%] max-md:mb-6 cursor-pointer ${
                enableSelection ? "relative" : ""
              }`}
              onClick={() => handleCardClick(item)}
            >
              {/* Selection indicator */}
              {enableSelection && isSelected && (
                <div className="absolute top-4 right-4 z-10 bg-green-500 rounded-full p-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {/* Selection border */}
              <div
                className={`relative group ${
                  enableSelection && isSelected
                    ? "ring-2 ring-green-500 ring-offset-2 rounded-lg"
                    : enableSelection
                    ? "hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 rounded-lg transition-all"
                    : ""
                }`}
              >
                <img
                  className="h-64 w-full object-cover rounded-lg"
                  src={item.image}
                  alt={item.title}
                />

                {/* View button - only show in non-selection mode or as alternative */}
                {!enableSelection && (
                  <button
                    onClick={(e) => handleViewClick(e, item)}
                    variant="primary"
                    className="bg-white/30 border-[1px] border-black rounded-2xl font-semibold cursor-pointer absolute left-[30%] top-[80%] px-10 py-1 text-[14px] hidden group-hover:block"
                  >
                    View
                  </button>
                )}

                {/* Selection button in selection mode */}
                {enableSelection && (
                  <button
                    onClick={(e) => handleItemSelect(e, item)}
                    variant="primary"
                    className={`border-[1px] rounded-2xl font-semibold cursor-pointer absolute left-[30%] top-[80%] px-8 py-1 text-[14px] hidden group-hover:block ${
                      isSelected
                        ? "bg-green-500 text-white border-green-600"
                        : "bg-white/90 border-black text-black"
                    }`}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </button>
                )}
              </div>

              <div className="flex justify-between my-3">
                <p className="font-medium">{item.title}</p>
                <p className="flex items-baseline font-semibold text-black">
                  <span className="text-sm mr-0.5">$</span>
                  <span className="text-lg">{item.price}</span>
                  <span className="text-sm ml-0.5">.00</span>
                </p>
              </div>

              {/* Add to basket button - show in both modes */}
              <button
                onClick={(e) => handleAddToCart(e, item)}
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
                      isInCart ? "fill-gray-400" : "group-hover/item:fill-white"
                    } ${isInCart ? "fill-gray-400" : "fill-black"}`}
                  >
                    <path d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z" />
                  </svg>
                </span>
                {isInCart ? "Added" : "Add to basket"}
              </button>
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
          containerClassName="flex w-[400px] justify-center mb-20 items-center flex-wrap gap-3"
          pageClassName="text-[#98A2B3] px-3 py-1 rounded-md cursor-pointer order-1"
          activeClassName="border-[1.5px] border-[#D5A581] rounded-[6px] text-black"
          previousClassName="border px-3 py-1 rounded-md cursor-pointer order-2"
          nextClassName="border px-3 py-1 rounded-md cursor-pointer order-2"
          breakLabel={isMobile ? null : "..."}
          breakClassName="px-3 py-1 order-1"
          marginPagesDisplayed={isMobile ? 0 : 2}
          pageRangeDisplayed={isMobile ? 0 : 1}
        />
      </div>
    </div>
  );
};

export default PaginatedBestSellers;
