"use client";
import React, { useEffect, useState, useMemo } from "react";
import { bgH2, phoneIcon } from "../../../public/assets/images";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useCart } from "react-use-cart";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/components/ui/dropdown-menu";
import PaginatedBestSellers from "./paginatedBestSellers/PaginatedBestSellers";
import { useRouter } from "next/navigation";
import useIsMobile from "../../hooks/useIsMobile";
import { toast } from "sonner";
import { getProducts } from "@/api/service/app";
import ReactPaginate from "react-paginate";

const BestSellers = ({ title }) => {
  const [sortBy, setSortBy] = useState("Sort by");
  const router = useRouter();
  const { addItem, items } = useCart();
  const isMobile = useIsMobile();
  const [bestSellers, setBestSellers] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 8; // For paginated view

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
        const products = res.data.products.map((pro) => ({
          ...pro,
          id: pro._id,
          discountedPrice: calculateDiscountedPrice(pro.price, pro.discount),
        }));

        setBestSellers(products);
        setOriginalProducts(products);
        console.log(res.data);
        setTotalPages(res.data.totalPages || 1);
        setTotalProducts(res.data.totalProducts || 0);
        setCurrentPage((res.data.currentPage || 1) - 1); // Convert to 0-based index
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  // Handle page click for pagination
  const handlePageClick = (event) => {
    const newPage = event.selected + 1; // Convert to 1-based for API
    fetchProducts(newPage);
  };

  // Sort products based on selected criteria (client-side sorting)
  const sortedProducts = useMemo(() => {
    if (!bestSellers.length) return [];

    const productsToSort = [...bestSellers];

    switch (sortBy) {
      case "Date":
        return productsToSort.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
          return dateB - dateA;
        });

      case "Price":
        return productsToSort.sort(
          (a, b) => a.discountedPrice - b.discountedPrice
        );

      case "Price: High to Low":
        return productsToSort.sort(
          (a, b) => b.discountedPrice - a.discountedPrice
        );

      case "Name":
        return productsToSort.sort((a, b) =>
          a.productName?.localeCompare(b.productName || "")
        );

      case "Default":
      default:
        return bestSellers; // Use current page products
    }
  }, [bestSellers, sortBy]);

  const sortOptions = ["Date", "Price"];

  const ProductSkeleton = () => (
    <div className="p-2 animate-pulse">
      <div className="relative">
        <div className="h-64 w-full bg-gray-300 rounded-lg"></div>
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
  );

  // Skeleton loader for paginated view
  const PaginatedSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="h-64 w-full bg-gray-300 rounded-lg mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
          <div className="h-8 bg-gray-300 rounded-3xl w-full"></div>
        </div>
      ))}
    </div>
  );

  // Price display component
  const PriceDisplay = ({ price, discount, discountedPrice }) => {
    if (discount && discount > 0) {
      return (
        <div className="flex items-baseline font-semibold text-black">
          <span className="text-sm mr-0.5">$</span>
          <span className="text-lg">{formatPrice(discountedPrice)}</span>
          <span className="text-sm line-through text-gray-500 ml-2">
            ${formatPrice(price)}
          </span>
          <span className="text-xs text-red-500 ml-2 bg-red-100 px-1 rounded">
            -{discount}%
          </span>
        </div>
      );
    }

    return (
      <p className="flex items-baseline font-semibold text-black">
        <span className="text-sm mr-0.5">$</span>
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

  // Render products for carousel (Best Sellers section)
  const renderCarouselProducts = () => {
    const productsToShow = sortedProducts.length ? sortedProducts : bestSellers;
    return productsToShow.slice(0, 4).map((item, index) => (
      <div key={index} className="p-2 cursor-pointer">
        <div className="relative group">
          <img
            className="h-64 w-full object-cover"
            src={item.image}
            alt={item.productName}
          />
          {item.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {item.discount}% OFF
            </div>
          )}
          <button
            onClick={() => router.push(`/productDetails?id=${item.id}`)}
            className="bg-white/30 border-[1px] border-black rounded-2xl font-semibold cursor-pointer absolute left-[30%] top-[80%] px-10 py-1 text-[14px] hidden group-hover:block"
          >
            View
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
          disabled={items.some((cartItem) => cartItem.id === item.id)}
          onClick={(e) => {
            e.stopPropagation();
            if (!items.some((cartItem) => cartItem.id === item.id)) {
              console.log({ ...item, price: item.discountedPrice });
              addItem({
                ...item,
                price: item.discountedPrice,
                title: item.productName,
              });
              toast.success("Item added to cart successfully!");
            }
          }}
          className={`group/item border border-gray-400 rounded-3xl px-3 py-1 font-medium flex gap-2 justify-center items-center text-sm ${
            items.some((cartItem) => cartItem.id === item.id)
              ? "bg-gray-100 text-gray-600 cursor-not-allowed"
              : "text-black hover:bg-black hover:text-white cursor-pointer"
          }`}
        >
          <span className="[&>svg]:w-4 [&>svg]:h-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`${
                items.some((cartItem) => cartItem.id === item.id)
                  ? "fill-gray-400"
                  : "group-hover/item:fill-white fill-black"
              } transition-colors duration-200`}
            >
              <path d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z" />
            </svg>
          </span>
          {items.some((cartItem) => cartItem.id === item.id)
            ? "Added"
            : "Add to basket"}
        </button>
      </div>
    ));
  };

  // Render products for paginated view
  const renderPaginatedProducts = () => {
    const productsToShow = sortedProducts.length ? sortedProducts : bestSellers;
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsToShow.map((item, index) => {
            const isInCart = items.some((cartItem) => cartItem.id === item.id);

            return (
              <div key={index} className="cursor-pointer">
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
                  <button
                    onClick={() => router.push(`/productDetails?id=${item.id}`)}
                    className="bg-white/30 border-[1px] border-black rounded-2xl font-semibold cursor-pointer absolute left-[30%] top-[80%] px-10 py-1 text-[14px] hidden group-hover:block"
                  >
                    View
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
                  disabled={isInCart}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isInCart) {
                      addItem({
                        ...item,
                        price: item.discountedPrice,
                        title: item.productName,
                      });
                      toast.success("Item added to cart successfully!");
                    }
                  }}
                  className={`w-full border border-gray-400 rounded-3xl px-3 py-2 font-medium flex gap-2 justify-center items-center text-sm ${
                    isInCart
                      ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                      : "text-black hover:bg-black hover:text-white cursor-pointer"
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
                          : "group-hover/item:fill-white fill-black"
                      } transition-colors duration-200`}
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
    <div
      className={`pt-15 pl-20 pr-20 ${
        title === "Best Sellers"
          ? "h-[500px] max-md:px-8"
          : "h-auto max-md:px-4"
      } max-md:h-auto`}
    >
      <div className="flex justify-between">
        <h1
          style={{ fontFamily: "Jedira-Regular, sans-serif" }}
          className="text-[32px] text-black font-normal max-md:text-[20px] mb-[-10px] "
        >
          {title}
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="border-[1px] w-28 border-[#D0D5DD] text-[#667185] rounded-3xl px-1 py-[-6px] font-medium cursor-pointer flex gap-2 justify-center items-center text-[14px] focus:outline-none focus:ring-0">
              {sortBy}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
                  fillRule="evenodd"
                  d="M4.43 8.512a.75.75 0 0 1 1.058-.081L12 14.012l6.512-5.581a.75.75 0 0 1 .976 1.138l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.057"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-black">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                className="cursor-pointer"
                onClick={() => setSortBy(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-8 mb-8 max-w-full">
        {loading ? (
          title === "Best Sellers" ? (
            <Carousel
              responsive={responsive}
              infinite={false}
              autoPlay={false}
              showDots={false}
              arrows={false}
              keyBoardControl
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </Carousel>
          ) : (
            <PaginatedSkeleton />
          )
        ) : title === "Best Sellers" ? (
          <Carousel
            responsive={responsive}
            infinite
            autoPlay={isMobile ? true : false}
            autoPlaySpeed={2000}
            showDots={false}
            arrows={false}
            keyBoardControl
          >
            {renderCarouselProducts()}
          </Carousel>
        ) : (
          renderPaginatedProducts()
        )}
      </div>
    </div>
  );
};

export default BestSellers;
