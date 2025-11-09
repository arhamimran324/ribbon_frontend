"use client";
import React, { useEffect, useState } from "react";
import {
  setProductCustomization,
  setBoxType,
  setNoteCard,
  setPersonalization,
  setQuantity,
} from "@/redux/slices/checkout-slice";
import { bestSellers, productPageBottomImages } from "@/data";
import ProductRating from "./ReactStars";
import RadioGroupBtns, { RadioGroupDemo } from "./ui/RadioGroupBtns";
import SelectBox from "./ui/SelectBox";
import { Input } from "@/components/components/ui/input";
import { Textarea } from "@/components/components/ui/textarea";
import { QuantitySelector } from "./ui/QuantitySelector";
import useIsMobile from "../../hooks/useIsMobile";
import { useCart } from "react-use-cart";
import { useRouter, useSearchParams } from "next/navigation";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button } from "@/components/components/shared/button";
import { toast } from "sonner";
import { getProductByID, getSimilarProductsByID } from "@/api/service/app";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const ProductDetails = () => {
  const [expanded, setExpanded] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(true);
  const handleToggle = () => setExpanded(!expanded);
  const isMobile = useIsMobile();
  const { addItem, updateItemQuantity, items } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Redux
  const dispatch = useAppDispatch();
  const { productCustomization } = useAppSelector((state) => state.checkout);

  const itemInCart = items.some((b) => b.id === product?.id);

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (discount && discount > 0) {
      return price - (price * discount) / 100;
    }
    return price;
  };

  // Format price with 2 decimal places
  const formatPrice = (price) => {
    return parseFloat(price)?.toFixed(2);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await getProductByID(id);
        if (res.success && res.data) {
          const productData = {
            ...res.data,
            id: res.data._id,
            title: res.data.productName,
            price: res.data.price,
            description: res.data.description,
            image: res.data.image,
            discount: res.data.discount,
            status: res.data.status,
            category: res.data.category,
            createdAt: res.data.createdAt,
            updatedAt: res.data.updatedAt,
            discountedPrice: calculateDiscountedPrice(
              res.data.price,
              res.data.discount
            ),
          };
          setProduct(productData);

          // Fetch similar products after main product is loaded
          await fetchSimilarProducts(res.data._id);
        } else {
          toast.error("Product not found");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  // Fetch similar products
  const fetchSimilarProducts = async (productId) => {
    try {
      setSimilarLoading(true);
      const res = await getSimilarProductsByID(productId);
      if (res.success && res.data) {
        const similarProductsData = res.data.similarProducts.map((product) => ({
          ...product,
          id: product._id,
          title: product.productName,
          discountedPrice: calculateDiscountedPrice(
            product.price,
            product.discount
          ),
        }));
        setSimilarProducts(similarProductsData);
      }
    } catch (error) {
      console.error("Error fetching similar products:", error);
      setSimilarProducts([]);
    } finally {
      setSimilarLoading(false);
    }
  };

  // Handle box type change
  const handleBoxTypeChange = (value) => {
    dispatch(setBoxType(value));
  };

  // Handle note card change
  const handleNoteCardChange = (value) => {
    dispatch(setNoteCard(value));
  };

  // Handle personalization change
  const handlePersonalizationChange = (field, value) => {
    dispatch(setPersonalization({ [field]: value }));
  };

  // Handle personalized box change
  const handlePersonalizedChange = (value) => {
    dispatch(
      setPersonalization({
        personalized: value === "Yes",
      })
    );
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    dispatch(setQuantity(newQuantity));
  };

  // Handle add to cart with customization
  const handleAddToCart = () => {
    if (itemInCart) {
      toast.warning("Item is already in cart!");
      return;
    }

    const productWithCustomization = {
      ...product,
      price: product.discountedPrice,
      customization: productCustomization,
      title: product.productName,
    };

    addItem(productWithCustomization);
    toast.success("Item is added to cart successfully!");
  };

  // Handle buy now with customization
  const handleBuyNow = () => {
    if (itemInCart) {
      toast.warning("Item is already in cart!");
      return;
    }

    const productWithCustomization = {
      ...product,
      price: product.discountedPrice,
      customization: productCustomization,
      title: product.productName,
    };

    addItem(productWithCustomization);
    router.push("/checkout");
  };

  // Price display component
  const PriceDisplay = ({ price, discount, discountedPrice }) => {
    if (discount && discount > 0) {
      return (
        <div className="flex items-baseline gap-2">
          <div className="flex items-baseline font-bold text-[#101928]">
            <span className="text-sm mr-0.5">£</span>
            <span className="text-2xl">
              {formatPrice(discountedPrice || 0)}
            </span>
          </div>
          <div className="flex items-baseline text-gray-500">
            <span className="text-sm line-through mr-0.5">£</span>
            <span className="text-lg line-through">
              {formatPrice(price || 0)}
            </span>
          </div>
          <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded ml-2">
            Save {discount}%
          </span>
        </div>
      );
    }

    return (
      <div className="flex items-baseline font-bold text-[#101928]">
        <span className="text-sm mr-0.5">£</span>
        <span className="text-2xl">{formatPrice(price || 0)}</span>
      </div>
    );
  };

  // Similar Product Skeleton
  const SimilarProductSkeleton = () => (
    <div className="p-2 w-[25vw] max-md:w-[100vw] animate-pulse">
      <div className="relative">
        <div className="h-64 w-full bg-gray-300 rounded-lg"></div>
        <div className="absolute left-[30%] top-[80%]">
          <div className="bg-gray-300 rounded-2xl px-10 py-1 w-20 h-8"></div>
        </div>
      </div>
      <div className="flex justify-between my-3 gap-2">
        <div className="min-h-[3rem] max-h-[3rem] overflow-hidden">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="flex flex-col items-end">
          <div className="h-4 bg-gray-300 rounded w-16 mb-1"></div>
          <div className="h-3 bg-gray-300 rounded w-12"></div>
        </div>
      </div>
      <div className="border border-gray-300 rounded-3xl px-3 py-1 flex gap-2 justify-center items-center">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );

  const ProductDetailsSkeleton = () => (
    <div className="px-20 pb-10 max-md:px-4 max-md:py-1">
      {!isMobile && (
        <div className="text-[14px] py-10 text-[#D5A581] font-medium animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      )}
      <div className="w-full">
        <div className="w-[95%] flex justify-between gap-10 max-lg:flex-col max-md:justify-center max-md:flex-col">
          <div className="basis-[35%] animate-pulse">
            <div className="h-96 bg-gray-300 rounded-lg mb-2"></div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-20 bg-gray-300 rounded w-1/4"
                ></div>
              ))}
            </div>
          </div>
          <div className="basis-[55%] animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/6"></div>
            <div className="h-px bg-gray-300 w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="h-12 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className="px-20 pb-10 max-md:px-4 max-md:py-1 flex justify-center items-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600">
            Product Not Found
          </h2>
          <Button
            variant="primary"
            onClick={() => router.push("/")}
            className="mt-4 rounded-full"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Create gallery images from product data
  const galleryImages = [
    {
      original: product.image,
      thumbnail: product.image,
    },
  ];

  const fullText = product.description || "No description available.";
  const previewText =
    fullText.length > 150 ? fullText.substring(0, 150) + "..." : fullText;

  return (
    <div className={`px-20 pb-10  max-md:px-4 max-md:py-1`}>
      {!isMobile && (
        <div className="text-[14px] py-10 text-[#D5A581] font-medium ">
          Home / {product.category} /{" "}
          <span className="text-[#667185]  ">{product.productName}</span>
        </div>
      )}
      <div className=" w-full ">
        <div className="w-[95%] flex justify-between gap-10 max-lg:flex-col max-md:justify-center max-md:flex-col">
          <div className="basis-[35%]">
            <ImageGallery
              items={galleryImages}
              showFullscreenButton={false}
              showPlayButton={false}
              showNav={false}
              thumbnailPosition="bottom"
            />
          </div>
          <div className="basis-[55%]">
            <h1
              style={{ fontFamily: "Jedira-Regular, sans-serif" }}
              className="text-[32px] font-normal text-[#101928] "
            >
              {product.productName}
            </h1>
            <div>
              <p className="text-[14px] text-[#667185] font-normal mt-2 ">
                {expanded ? fullText : previewText}
              </p>
              {fullText.length > 150 && (
                <span
                  style={{
                    color: "#D0B38B",
                    cursor: "pointer",
                    marginLeft: 5,
                    fontSize: "14px",
                    fontWeight: "500",
                    marginLeft: "-1px",
                  }}
                  onClick={handleToggle}
                >
                  {expanded ? "View less" : "View more"}
                </span>
              )}
            </div>
            <ProductRating
              rating={product.rating?.average}
              reviews={product.rating?.count}
            />

            {/* Updated Price Display */}
            <div className="mt-3">
              <PriceDisplay
                price={product.price}
                discount={product.discount}
                discountedPrice={product.discountedPrice}
              />
            </div>

            <hr className="border-[2px] border-t border-[#F0F2F5] w-[full]  max-md:m-auto my-5 max-md:my-5" />

            <div>
              <p className="font-semibold text-[#101928] ">Box Type</p>
              <RadioGroupBtns
                firstBtnText="White Box"
                secondBtnText="Clear Box"
                onValueChange={handleBoxTypeChange}
                defaultValue={productCustomization.boxType}
              />
            </div>

            <hr className="border-[2px] border-t border-[#F0F2F5] w-[full]  max-md:m-auto my-5 max-md:my-5" />

            <div>
              <div>
                <p className="text-[14px] font-medium text-[#344054] ">
                  Add a note card
                </p>
                <SelectBox
                  width="100%"
                  placeholder="None"
                  firstValue="General"
                  secondValue="Work"
                  thirdValue="Personal"
                  onValueChange={handleNoteCardChange}
                  defaultValue={productCustomization.noteCard}
                />
              </div>
              <div className="flex gap-5 justify-between mt-5">
                <div className="w-[50%]">
                  <p>To</p>
                  <div className="m-auto mt-1">
                    <Input
                      placeholder="To address"
                      className=" h-[56px]  "
                      value={productCustomization.personalization.to}
                      onChange={(e) =>
                        handlePersonalizationChange("to", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="w-[50%]">
                  <p>From</p>
                  <div className="m-auto mt-1">
                    <Input
                      placeholder="From address"
                      className=" h-[56px]  "
                      value={productCustomization.personalization.from}
                      onChange={(e) =>
                        handlePersonalizationChange("from", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <p>Do you want to personalize your box?</p>
                <RadioGroupBtns
                  firstBtnText="Yes"
                  secondBtnText="No"
                  onValueChange={handlePersonalizedChange}
                  defaultValue={
                    productCustomization.personalization.personalized
                      ? "Yes"
                      : "No"
                  }
                />
              </div>
              <div className="mt-7 mb-2">
                <p>Enter your message</p>
                <Textarea
                  className="h-36 resize-none "
                  placeholder="Enter your card message here"
                  value={productCustomization.personalization.message}
                  onChange={(e) =>
                    handlePersonalizationChange("message", e.target.value)
                  }
                />
              </div>
            </div>

            <hr className="border-[2px] border-t border-[#F0F2F5] w-[full]  max-md:m-auto my-5 max-md:my-5" />

            <div>
              <p className="text-primary font-semibold">Quantity</p>
              <QuantitySelector
                product={product}
                onQuantityChange={handleQuantityChange}
                initialQuantity={productCustomization.quantity}
              />
              <div className="my-6 flex gap-4 ">
                <Button
                  variant="primary"
                  onClick={handleBuyNow}
                  className="rounded-full px-14"
                >
                  Buy now
                </Button>

                <button
                  onClick={handleAddToCart}
                  className={`border-2 border-black w-[196px] ${
                    itemInCart
                      ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                      : "text-black cursor-pointer transition-all duration-200 hover:bg-black hover:border-none hover:text-white"
                  } max-md:w-[170px] max-sm:w-[150px] whitespace-nowrap rounded-full px-6 py-4 font-semibold`}
                  disabled={itemInCart}
                >
                  {itemInCart ? "Added" : "Add to basket"}
                </button>
              </div>
              <div className="flex justify-start items-start rounded-3xl p-6 max-md:p-4 gap-4 bg-white shadow-sm border border-[#E4E7EC] max-w-3xl">
                <img
                  src="/assets/svgs/store.svg"
                  alt="store"
                  className="w-7 h-7"
                />
                <div className="text-[#667185]">
                  <h2 className="font-bold text-gray-900 mb-2">
                    Delivery Information
                  </h2>
                  <p className="text-[14px] ">
                    Please allow at least 48 hours for all orders to be
                    processed.
                  </p>
                  <ul className="list-disc pl-5  my-2 space-y-1 text-[14px]">
                    <li>
                      <span className="font-medium">Standard shipping:</span> 3
                      to 5 working days from dispatch date – £3.99
                    </li>
                    <li>
                      <span className="font-medium">First Class shipping:</span>{" "}
                      2 to 3 working days from dispatch date – £12.99
                    </li>
                  </ul>
                  <p className=" text-[14px]">
                    This applies to UK / mainland shipping addresses only. For
                    international deliveries, please email us at&nbsp;
                    <a href="mailto:ribbonandbowstore@gmail.com" className="">
                      ribbonandbowstore@gmail.com
                    </a>
                    &nbsp;so we can provide the best shipping rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="h-auto max-md:h-auto mt-16">
        <h1
          style={{ fontFamily: "Jedira-Regular, sans-serif" }}
          className="text-[32px] text-black font-normal max-md:text-[20px] mb-6"
        >
          Similar Items You Might Like
        </h1>
        <div className="mt-8 mb-8 cursor-pointer flex justify-between basis-[22%] max-md:flex-wrap max-md:basis-[90%] max-md:justify-center max-md:items-center max-md:gap-8">
          {similarLoading ? (
            // Show skeleton loading while loading similar products
            Array.from({ length: 4 }).map((_, index) => (
              <SimilarProductSkeleton key={index} />
            ))
          ) : similarProducts.length > 0 ? (
            // Show actual similar products
            similarProducts.slice(0, 4).map((item, index) => {
              const isInCart = items.some(
                (cartItem) => cartItem.id === item.id
              );

              return (
                <div key={index} className="p-2 w-[25vw] max-md:w-[100vw] ">
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
                      onClick={() =>
                        router.push(`/productDetails?id=${item.id}`)
                      }
                      className="bg-white/30 border-[1px] border-black rounded-2xl font-semibold cursor-pointer absolute left-[30%] top-[80%] px-10 py-1 text-[14px] hidden group-hover:block "
                    >
                      View
                    </button>
                  </div>
                  <div className="flex justify-between my-3 gap-2">
                    <div className="min-h-[3rem] max-h-[3rem] overflow-hidden">
                      <p className="font-medium line-clamp-2 leading-5 text-sm">
                        {item.productName}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      {item.discount > 0 ? (
                        <>
                          <div className="flex items-baseline font-semibold text-black">
                            <span className="text-sm mr-0.5">£</span>
                            <span className="text-lg">
                              {formatPrice(item.discountedPrice || 0)}
                            </span>
                          </div>
                          <div className="flex items-baseline text-gray-500">
                            <span className="text-xs line-through mr-0.5">
                              £
                            </span>
                            <span className="text-sm line-through">
                              {formatPrice(item.price || 0)}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-baseline font-semibold text-black">
                          <span className="text-sm mr-0.5">£</span>
                          <span className="text-lg">
                            {formatPrice(item.price || 0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (!isInCart) {
                        addItem({
                          ...item,
                          price: item.discountedPrice,
                          title: item.productName,
                        });
                        toast.success("Item added to cart successfully!");
                      }
                    }}
                    disabled={isInCart}
                    className={`group border rounded-3xl px-3 py-1 font-medium flex gap-2 justify-center items-center text-sm
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
                          isInCart ? "fill-gray-400" : "group-hover:fill-white"
                        } ${isInCart ? "fill-gray-400" : "fill-black"}`}
                      >
                        <path d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z" />
                      </svg>
                    </span>
                    {isInCart ? "Added" : "Add to basket"}
                  </button>
                </div>
              );
            })
          ) : (
            // Show message when no similar products found
            <div className="w-full text-center py-8">
              <p className="text-gray-500">No similar products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
