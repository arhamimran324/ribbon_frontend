"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Label } from "@/components/components/ui/label";
import SelectBox from "@/components/components/ui/SelectBox";
import { Button } from "@/components/components/shared/button";
import { useSelector, useDispatch } from "react-redux";
import {
  setBoxSize,
  setReason,
  setColor,
  setSort,
  setSearchQuery,
  addSelectedItem,
  removeSelectedItem,
  setSelectedItems,
  updateOrderSummary,
} from "@/redux/slices/built-box-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProducts } from "@/api/service/app";
import ReactPaginate from "react-paginate";
import { toast } from "sonner";
import useIsMobile from "@/hooks/useIsMobile";

const ChooseItems = ({ next }) => {
  const dispatch = useAppDispatch();
  const {
    boxSize,
    reason,
    color,
    sort,
    searchQuery,
    selectedItems,
    orderSummary,
    selectedBoxData,
  } = useAppSelector((state) => state.buildBox);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 8;
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (discount && discount > 0) {
      return price - (price * discount) / 100;
    }
    return price;
  };

  // Format price with 2 decimal places
  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  // Fetch products with pagination
  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getProducts(page);
      if (res.data.products) {
        const productsWithDiscount = res.data.products.map((pro) => ({
          ...pro,
          id: pro._id,
          discountedPrice: calculateDiscountedPrice(pro.price, pro.discount),
          title: pro.productName, // Ensure title is available for selection
        }));

        setProducts(productsWithDiscount);
        setTotalPages(res.data.totalPages || 1);
        setTotalProducts(res.data.totalProducts || 0);
        setCurrentPage((res.data.currentPage || 1) - 1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  // Handle page click for pagination
  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    fetchProducts(newPage);
  };

  // Filter and sort products based on selections
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.productName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply color filter (if color selection is implemented)
    if (color && color !== "Color") {
      // You would need to add color property to your products
      // filtered = filtered.filter(product => product.color === color);
    }

    // Apply sort
    switch (sort) {
      case "Date":
        return filtered.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
          return dateB - dateA;
        });

      case "Price":
        return filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);

      case "Price: High to Low":
        return filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);

      case "Name":
        return filtered.sort((a, b) =>
          a.productName?.localeCompare(b.productName || "")
        );

      default:
        return filtered;
    }
  }, [products, searchQuery, color, sort]);

  const handleBoxSizeChange = (size) => {
    dispatch(setBoxSize(size));
  };

  const handleReasonChange = (selectedReason) => {
    dispatch(setReason(selectedReason));
  };

  const handleColorChange = (selectedColor) => {
    dispatch(setColor(selectedColor));
  };

  const handleSortChange = (selectedSort) => {
    dispatch(setSort(selectedSort));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleItemSelect = (item) => {
    // Check if item is already selected
    const isAlreadySelected = selectedItems?.some(
      (selectedItem) => selectedItem.id === item.id
    );

    if (!isAlreadySelected) {
      dispatch(addSelectedItem(item));
      toast.success(`${item.productName} added to box`);
    } else {
      dispatch(removeSelectedItem(item.id));
      toast.info(`${item.productName} removed from box`);
    }
  };

  const handleItemRemove = (itemId) => {
    dispatch(removeSelectedItem(itemId));
  };

  const calculateTotal = () => {
    return selectedItems?.reduce(
      (total, item) => total + (item.discountedPrice || item.price || 0),
      0
    );
  };

  const handleCompleteBox = () => {
    if (selectedItems?.length === 0) {
      toast.error("Please select at least one item");
      return;
    }

    // Check if selected items exceed the box limit
    if (
      selectedBoxData?.limit &&
      selectedItems.length > selectedBoxData.limit
    ) {
      toast.error(
        `You can only select up to ${selectedBoxData.limit} items for this box. ` +
          `You have selected ${selectedItems.length} items.`
      );
      return;
    }

    // Check if selected items are below minimum (if minimum is specified)
    if (
      selectedBoxData?.minItems &&
      selectedItems.length < selectedBoxData.minItems
    ) {
      toast.error(
        `You need to select at least ${selectedBoxData.minItems} items for this box. ` +
          `You have selected only ${selectedItems.length} items.`
      );
      return;
    }

    // If all validations pass, proceed
    dispatch(
      updateOrderSummary({
        items: selectedItems,
        total: calculateTotal(),
        itemCount: selectedItems.length,
        boxLimit: selectedBoxData?.limit || 0,
      })
    );

    toast.success(`Box completed with ${selectedItems.length} items!`);
    next();
  };

  const isItemSelected = (itemId) => {
    return selectedItems?.some((item) => item.id === itemId);
  };

  // Price display component
  const PriceDisplay = ({ price, discount, discountedPrice }) => {
    if (discount && discount > 0) {
      return (
        <div className="flex items-baseline font-semibold text-black">
          <span className="text-sm mr-0.5">£</span>
          <span className="text-lg">{formatPrice(discountedPrice)}</span>
          <span className="text-sm line-through text-gray-500 ml-2">
            £{formatPrice(price)}
          </span>
          <span className="text-xs text-red-500 ml-2 bg-red-100 px-1 rounded">
            -{discount}%
          </span>
        </div>
      );
    }

    return (
      <p className="flex items-baseline font-semibold text-black">
        <span className="text-sm mr-0.5">£</span>
        <span className="text-lg">{formatPrice(price)}</span>
      </p>
    );
  };

  // Product title component with consistent height
  const ProductTitle = ({ title: productTitle }) => (
    <div className="min-h-[3rem] max-h-[3rem] overflow-hidden">
      <p className="font-medium line-clamp-2 leading-5 text-sm">
        {productTitle}
      </p>
    </div>
  );

  // Skeleton loader for products
  const ProductSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse cursor-pointer">
          <div className="relative">
            <div className="h-64 w-full bg-gray-300 rounded-lg mb-3"></div>
            <div className="absolute left-[30%] top-[80%]">
              <div className="bg-gray-300 rounded-2xl px-10 py-1 w-20 h-8"></div>
            </div>
          </div>
          <div className="flex justify-between my-3">
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
          <div className="border border-gray-300 rounded-3xl px-3 py-1 flex gap-2 justify-center items-center">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Render products for paginated view with selection support
  const renderProducts = () => {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredAndSortedProducts.map((item, index) => {
            const isSelected = isItemSelected(item.id);

            return (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => handleItemSelect(item)}
              >
                <div className="relative group">
                  <img
                    className="h-64 w-full object-cover rounded-lg"
                    src={item.image}
                    alt={item.productName}
                  />
                  {item.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {item.discount}% OFF
                    </div>
                  )}
                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      SELECTED
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemSelect(item);
                    }}
                    className="bg-white/30 border-[1px] border-black rounded-2xl font-semibold cursor-pointer absolute left-[30%] top-[80%] px-10 py-1 text-[14px] hidden group-hover:block"
                  >
                    {isSelected ? "Remove" : "Select"}
                  </button>
                </div>
                <div className="flex justify-between my-3 gap-2">
                  <ProductTitle title={item.productName} />
                  <PriceDisplay
                    price={item.price}
                    discount={item.discount}
                    discountedPrice={item.discountedPrice}
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemSelect(item);
                  }}
                  className={`w-full border rounded-3xl px-3 py-2 font-medium flex gap-2 justify-center items-center text-sm ${
                    isSelected
                      ? "bg-green-500 text-white border-green-500 cursor-pointer hover:bg-green-600"
                      : "border-gray-400 text-black hover:bg-black hover:text-white cursor-pointer"
                  }`}
                >
                  <span className="[&>svg]:w-4 [&>svg]:h-4">
                    {isSelected ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
                    )}
                  </span>
                  {isSelected ? "Selected" : "Add to Box"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className={`mt-8 ${isMobile ? "" : "flex justify-center"}`}>
            {!isMobile && (
              <div className="text-sm font-medium text-black text-center mt-2 mr-4">
                Page {currentPage + 1} of {totalPages}
              </div>
            )}

            <ReactPaginate
              previousLabel={"← Prev"}
              nextLabel={"Next →"}
              pageCount={totalPages}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              containerClassName="flex justify-center items-center flex-wrap gap-3"
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
        )}
      </>
    );
  };

  return (
    <div className="mt-10 mb-20 bg-[#fdfdfc] max-md:mx-6 ">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[44px] text-center text-black font-normal max-md:text-[28px]"
      >
        Choose your items
      </h1>
      <p className="text-[#4E525F] text-[14px] text-center mt-2 ">
        We've hand-selected the best products in one place. Select from the
        items below and fill up your box! <br /> Pick your products first and
        our program will automatically select the box size!
      </p>

      <div className="py-10 px-20 max-md:px-10 ">
        <div className="border-[1px] h-[50px] border-black/30 flex">
          <button
            className={`cursor-pointer text-center basis-[50%] ${
              boxSize === "Regular" ? "bg-[#F5F3EB]" : "bg-white"
            }`}
            onClick={() => handleBoxSizeChange("Regular")}
          >
            Regular
          </button>
          <button
            className={`cursor-pointer text-center basis-[50%] ${
              boxSize === "Big" ? "bg-[#F5F3EB]" : "bg-white"
            }`}
            onClick={() => handleBoxSizeChange("Big")}
          >
            Big
          </button>
        </div>

        <div className="my-8 flex justify-between max-md:flex-col max-md:justify-center max-md:items-center max-md:gap-5 ">
          {/* Left Side - All Product Images Grid */}
          <div className="basis-[55%] max-md:basis-full">
            <h2 className="text-[#101928] font-bold text-lg mb-4">
              All Products
            </h2>
            <div className="grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:grid-cols-2">
              {filteredAndSortedProducts.map((item, index) => {
                const isSelected = isItemSelected(item.id);
                return (
                  <div
                    key={index}
                    className={`relative cursor-pointer group border-2 rounded-lg p-2 ${
                      isSelected
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleItemSelect(item)}
                  >
                    <img
                      className="w-full h-32 object-cover rounded-md"
                      src={item.image}
                      alt={item.productName}
                    />

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-1 right-1 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        ✓
                      </div>
                    )}

                    {/* Product Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs font-medium truncate">
                        {item.productName}
                      </p>
                      <p className="text-xs">
                        £{formatPrice(item.discountedPrice || item.price)}
                        {item.discount > 0 && (
                          <span className="text-red-300 ml-1">
                            -{item.discount}%
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemSelect(item);
                      }}
                      className={`absolute top-1 left-1 text-xs px-2 py-1 rounded ${
                        isSelected
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {isSelected ? "Remove" : "Add"}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Show message when no products */}
            {filteredAndSortedProducts.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-gray-500">No products found</p>
                {searchQuery && (
                  <p className="text-sm text-gray-400 mt-2">
                    Try adjusting your search criteria
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Order Summary */}
          <div className="basis-[40%] max-md:basis-full max-md:mt-8 border-[1px] border-[#E4E7EC] rounded-2xl p-4 h-fit sticky top-4">
            <div>
              <h1 className="text-[#101928] font-bold text-lg">
                Order Summary
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {selectedItems?.length || 0} item
                {selectedItems?.length !== 1 ? "s" : ""} selected
              </p>

              <hr className="border-[2px] border-t border-[#F0F2F5] w-full my-4" />

              {/* Selected Items List */}
              <div className="max-h-96 overflow-y-auto">
                {selectedItems?.map((item, index) => (
                  <div
                    key={index}
                    className="mb-3 flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded border"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-[#101928] truncate">
                          {item.title}
                        </p>
                        <p className="text-[12px] text-[#475367]">
                          £{formatPrice(item.discountedPrice || item.price)}
                          {item.discount > 0 && (
                            <span className="text-green-600 ml-2">
                              Save {item.discount}%
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleItemRemove(item.id)}
                      className="text-red-500 hover:text-red-700 text-lg font-bold p-1 hover:bg-red-50 rounded"
                      title="Remove item"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {selectedItems?.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">
                      <svg
                        className="w-12 h-12 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-[14px] text-gray-500">
                      No items selected yet
                    </p>
                    <p className="text-[12px] text-gray-400 mt-1">
                      Click on products to add them to your box
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Total */}
            <hr className="border-[2px] border-t border-[#F0F2F5] w-full my-4" />
            <div className="space-y-2">
              <div className="flex justify-between text-[14px]">
                <span>Subtotal:</span>
                <span>£{calculateTotal()?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[14px] text-green-600">
                <span>Discounts:</span>
                <span>
                  £
                  {selectedItems
                    ?.reduce(
                      (total, item) =>
                        total +
                        (item.discount
                          ? (item.price * item.discount) / 100
                          : 0),
                      0
                    )
                    ?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[16px] font-semibold border-t pt-2">
                <span>Total:</span>
                <span>£{calculateTotal()?.toFixed(2)}</span>
              </div>
            </div>

            {/* Complete Box Button */}
            <div className="flex justify-end mt-6">
              <Button
                variant="primary"
                className="w-full cursor-pointer py-3 text-base"
                onClick={handleCompleteBox}
                disabled={selectedItems?.length === 0}
              >
                Complete Box ({selectedItems?.length || 0} items)
              </Button>
            </div>

            {/* Box Size Info */}
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800 text-center">
                <strong>Current Box:</strong> {boxSize}
                {selectedItems?.length > 0 && (
                  <span className="ml-2">
                    • {selectedItems.length} item
                    {selectedItems.length !== 1 ? "s" : ""} selected
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between gap-5 max-md:gap-0 max-md:flex-col">
          <div>
            <Label className="mt-4 mb-2 text-[14px] font-medium text-[#344054] ">
              Reason or Season
            </Label>
            <SelectBox
              width="26vw"
              mobWid="90vw"
              placeholder="Reason"
              firstValue="Spring"
              secondValue="Summer"
              thirdValue="Winter"
              value={reason}
              onChange={handleReasonChange}
            />
          </div>
          <div>
            <Label className="mt-4 max-md:mt-0 mb-2 text-[14px] font-medium text-[#344054] ">
              Color
            </Label>
            <SelectBox
              width="26vw"
              mobWid="90vw"
              placeholder="Color"
              firstValue="Red"
              secondValue="Blue"
              thirdValue="Green"
              value={color}
              onChange={handleColorChange}
            />
          </div>
          <div>
            <Label className="mt-4 max-md:mt-0 mb-2 text-[14px] font-medium text-[#344054] ">
              Sort
            </Label>
            <SelectBox
              width="26vw"
              mobWid="90vw"
              placeholder="Sort"
              firstValue="Date"
              secondValue="Price"
              thirdValue="Name"
              value={sort}
              onChange={handleSortChange}
            />
          </div>
        </div>

        {/* Search */}
        <div className="mt-4">
          <Label className="mb-2 text-[14px] font-medium text-[#344054] ">
            Search
          </Label>
          <div className="relative w-[26vw] max-md:w-[90vw] ">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 17a6 6 0 100-12 6 6 0 000 12z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              name="search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full h-[50px] pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-sm placeholder-gray-400"
              placeholder="Search Item"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div>{loading ? <ProductSkeleton /> : renderProducts()}</div>
      </div>
    </div>
  );
};

export default ChooseItems;
