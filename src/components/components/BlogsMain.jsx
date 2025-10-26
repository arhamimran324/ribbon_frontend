"use client";
import React from "react";
import { blogsMain } from "@/data";
import { useRouter } from "next/navigation";

const BlogsMain = () => {
  const router = useRouter();
  return (
    <div className="px-20 py-24 max-md:px-4 max-md:py-12">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[44px] text-center text-black font-normal max-md:text-[28px]"
      >
        Read up on our{" "}
        <span style={{ fontFamily: "Jedira-Italic, sans-serif" }}>
          trending
        </span>{" "}
        <br />
        insights & updates
      </h1>
      <div className="my-10 flex flex-wrap justify-between max-md:justify-center max-md:gap-3">
        {blogsMain.map((blog, index) => (
          <div
            onClick={() => router.push(`/blog?id=${blog.id}`)}
            key={index}
            className="cursor-pointer mb-10 basis-[32%] max-md:basis-[97%]"
          >
            <img
              className="w-[32vw] max-md:w-[97vw] object-cover h-60 rounded-3xl "
              src={blog.image}
              alt="blog"
            />
            <div className="flex justify-between mt-2">
              <div className="bg-[#F5F3EB] rounded-2xl px-2 text-[14px] text-[#D5A581] font-normal text-center ">
                {blog.category}
              </div>
              <div className="text-[#A7A9AF] text-[14px] flex gap-1 justify-center ">
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
            <h1 className="text-[20px] font-bold my-2">{blog.title}</h1>
            <p className="text-[#646773] text-[14px] font-normal leading-[24px] ">
              {blog.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsMain;
