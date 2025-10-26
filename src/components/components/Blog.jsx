"use client";
import { title } from "process";
import React from "react";
import { blogsMain, bottomBlogText } from "@/data";
import { useRouter, useSearchParams } from "next/navigation";

const socislSvgs = [
  {
    svg: "/assets/svgs/faceb.svg",
  },
  {
    svg: "/assets/svgs/xb.svg",
  },
  {
    svg: "/assets/svgs/tiktokb.svg",
  },
  {
    svg: "/assets/svgs/whatsappb.svg",
  },
];

const Blog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const blog = blogsMain.find((b) => b.id === parseInt(id));

  // if (!blog) return <p>Loading or Blog not found</p>;
  return (
    <div className="px-28 py-24 max-md:px-4 max-md:py-12 max-md:pb-48">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[44px] text-center text-black font-normal max-md:text-[28px]"
      >
        {blog.title}
      </h1>
      <img
        className="my-6 h-[334px] w-full rounded-[26px] object-cover "
        src={blog.image}
        alt="blog"
      />

      <div className="flex max-md:flex-col-reverse ">
        <div className="basis-[30%] max-md:flex max-md:mt-10 ">
          <p className="text-[20px] font-bold text-[#4E525F]">Share</p>
          <div className="max-md:flex max-md:justify-center max-md:items-center ">
            {socislSvgs.map((social, index) => (
              <img
                className="mt-8 max-md:w-5 h-5 max-md:mt-0 ml-5 cursor-pointer text-center"
                key={index}
                src={social.svg}
                alt="social"
              />
            ))}
          </div>
        </div>
        <div className="basis-[70%] ">
          <div className="flex gap-5 ">
            <div className="bg-[#F5F3EB] rounded-2xl px-2 w-20 text-[14px] text-[#D5A581] font-normal text-center ">
              {blog.category}
            </div>
            <div className="text-[#646773] text-[14px] font-medium flex gap-1 justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11.5 3a9.5 9.5 0 0 1 9.5 9.5a9.5 9.5 0 0 1-9.5 9.5A9.5 9.5 0 0 1 2 12.5A9.5 9.5 0 0 1 11.5 3m0 1A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5a8.5 8.5 0 0 0 8.5-8.5A8.5 8.5 0 0 0 11.5 4M11 7h1v5.42l4.7 2.71l-.5.87l-5.2-3z"
                />
              </svg>
              {blog.date}
            </div>
          </div>
          <h1 className="text-2xl font-semibold my-5 ">
            Here are some aesthetic ways to repurpose your candle jars for a
            sustainable home
          </h1>
          <p className="text-[20px] font-normal leading-8 text-[#4E525F] ">
            We all love a good candle moment, the cosy vibes, the dreamy scents
            but what happens when the wax burns out? Don’t bin that jar just
            yet! At Ribbon and Bow Store, we’re all about adding a touch of
            creativity and sustainability to your everyday lifestyle. Empty
            candle jars are too pretty to waste, and with a little imagination,
            they can be transformed into stylish and practical additions to your
            home or office. First things first – how do you get rid of that
            leftover wax? It’s easy! Just pour hot water into the jar to loosen
            the wax, scoop out any remaining bits with a spoon, and give it a
            good wash with warm soapy water. Once your jar is clean and ready,
            the possibilities are endless! Here are a few of our favourite ways
            to repurpose them:
          </p>
          <div class="mt-3 ">
            <img
              className="h-[650px] max-md:h-[300px] "
              src="/assets/images/blog3img.jpg"
              alt="blog"
            />
          </div>
          <div className="mt-8">
            {bottomBlogText.map((item, index) => (
              <div key={index}>
                <h2 className="text-[24px] font-semibold mb-2 ">
                  {index + 1}.{item.title}
                </h2>
                <p className="text-[#4E525F] text-[20px] leading-8 mb-5 ">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <hr className="text-[#181D26] h-0.5 " />
          <button
            onClick={() => router.push("/blogs")}
            className="flex gap-2 justify-center items-center cursor-pointer mt-10 px-4 py-3 border-[1px] border-[#D3D4D7] rounded-2xl bg-white text-black "
          >
            More Stories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="m268 112l144 144l-144 144m124-144H100"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
