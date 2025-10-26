"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { navRightIcons } from "@/data";
import { LogOutIcon, Menu, X } from "lucide-react";
import ByBasket from "./ByBasket";
import { useCart } from "react-use-cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/auth-slice";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const user = useAppSelector((store) => store.auth);
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false); // 🔹 login menu
  const loginMenuRef = useRef(null);
  const dispatch = useAppDispatch();
  const { totalItems, isEmpty } = useCart();

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/buildBox", label: "Build your box" },
    { href: "/blogs", label: "Blogs" },
    { href: "/about", label: "About" },
    { href: "/faqs", label: "FAQ's" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    if (isBasketOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isBasketOpen]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 🔹 Close login menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (loginMenuRef.current && !loginMenuRef.current.contains(e.target)) {
        setIsLoginMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="h-20 flex items-center justify-between px-4 md:px-20 bg-white sticky top-0 z-50 border-b-[1px]">
      {/* --- Mobile Nav --- */}
      <div className="flex items-center justify-between w-full lg:hidden">
        <button onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={28} />
        </button>

        <img
          onClick={() => {
            router
              .push("/")
              .then(() =>
                setTimeout(
                  () => window.scrollTo({ top: 0, behavior: "smooth" }),
                  100
                )
              );
          }}
          className="w-28 cursor-pointer"
          src="/assets/svgs/logo.svg"
          alt="logo"
        />

        <div className="flex gap-4 relative">
          {navRightIcons.map((svg, index) => {
            if (index === 0 || index === 1 || index === 2) {
              return (
                <span
                  key={index}
                  onClick={() => {
                    if (index === 1) setIsLoginMenuOpen(!isLoginMenuOpen);
                    if (index === 2) setIsBasketOpen(true);
                  }}
                  className="cursor-pointer relative"
                >
                  {svg.svg}
                </span>
              );
            }
            return null;
          })}

          {/* 🔹 Mobile Login Menu */}
          {isLoginMenuOpen && (
            <div
              ref={loginMenuRef}
              className="absolute right-0 top-10 bg-white border shadow-lg rounded-lg p-3 w-40 z-50"
            >
              {!user?.isAuthenticated ? (
                <>
                  {" "}
                  <button
                    onClick={() => {
                      router.push("/login");
                      setIsLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      router.push("/signup");
                      setIsLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Signup
                  </button>
                </>
              ) : (
                <div>
                  <h2 className="p-2">{user?.user?.user?.name}</h2>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      router.push("/login");
                      setIsLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-2 flex gap-2 items-center hover:bg-gray-100 rounded-md text-red-400"
                  >
                    <LogOutIcon /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- Desktop Nav --- */}
      <div className="hidden lg:flex justify-between items-center w-full">
        <img
          onClick={() => router.push("/")}
          className="cursor-pointer w-28"
          src="/assets/svgs/logo.svg"
          alt="logo"
        />

        <div className="flex gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative inline-flex text-xl transition-colors duration-300
                  before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px]
                  before:transition-transform before:duration-700 before:origin-left
                  ${
                    isActive
                      ? "text-[#D5A581] before:bg-[#D5A581] before:scale-x-100"
                      : "text-black hover:text-[#D5A581] before:bg-[#D5A581] before:scale-x-0 hover:before:scale-x-100"
                  }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex gap-6 relative items-center">
          {navRightIcons.map((svg, index) => (
            <span
              key={index}
              onClick={() => {
                if (index === 1) setIsLoginMenuOpen(!isLoginMenuOpen);
                if (index === 2) setIsBasketOpen(true);
              }}
              className="relative cursor-pointer"
            >
              {svg.svg}

              {index === 2 && !isEmpty && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#D5A581] text-white text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </span>
          ))}

          {/* 🔹 Desktop Login Menu */}
          {isLoginMenuOpen && (
            <div
              ref={loginMenuRef}
              className="absolute right-0 top-10 bg-white border shadow-lg rounded-lg p-3 w-40 z-50"
            >
              {!user?.isAuthenticated ? (
                <>
                  {" "}
                  <button
                    onClick={() => {
                      router.push("/login");
                      setIsLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      router.push("/signup");
                      setIsLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Signup
                  </button>
                </>
              ) : (
                <div>
                  <h2 className="p-2">{user?.user?.user?.name}</h2>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      router.push("/login");
                      setIsLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-2 flex gap-2 items-center hover:bg-gray-100 rounded-md text-red-400"
                  >
                    <LogOutIcon /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- Basket Sidebar --- */}
      <>
        {isBasketOpen && (
          <div
            onClick={() => setIsBasketOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          />
        )}

        <div
          className={`fixed ${
            isMobile ? "top-[100px]" : "top-0"
          } right-0 h-full z-50 bg-white shadow-lg w-[590px] max-md:w-[90vw] flex flex-col transition-transform duration-600 ease-in-out ${
            isBasketOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="overflow-y-auto h-full">
            <ByBasket onClose={() => setIsBasketOpen(false)} />
          </div>
        </div>
      </>
    </nav>
  );
};

export default Navbar;
