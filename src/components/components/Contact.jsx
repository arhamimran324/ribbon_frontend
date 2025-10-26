import React from "react";
import ContactForm from "./ContactForm";

const socislSvgs = [
  {
    svg: "/assets/svgs/x.svg",
  },
  {
    svg: "/assets/svgs/insta.svg",
  },
  {
    svg: "/assets/svgs/face.svg",
  },
  {
    svg: "/assets/svgs/tiktok.svg",
  },
];

const Contact = () => {
  return (
    <div className="bg-[#fdfdfc] px-28 py-24 max-md:px-4 max-md:py-12 max-md:pb-28  ">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[44px] text-center text-black font-normal max-md:text-[28px]"
      >
        Our friendly team is here to bring <br /> your ideas to{" "}
        <span style={{ fontFamily: "Jedira-Italic, sans-serif" }}>life.</span>
      </h1>
      <div className="flex gap-10 mt-12 max-md:flex-col-reverse">
        <div className="basis-[40%] bg-black rounded-3xl px-8 max-md:px-4 pt-6 h-[700px] ">
          <div className="mb-10">
            <span className="text-[18px] font-normal text-white/50 capitalize ">
              send direct email:
            </span>
            <p className="text-[20px] font-normal text-white mt-2 ">
              hello@chillsandchillsstore.com
            </p>
          </div>
          <div className="mb-10">
            <span className="text-[18px] font-normal text-white/50 capitalize ">
              Call US:
            </span>
            <p className="text-[20px] font-normal text-white mt-2 ">
              +1 2345 56768
            </p>
          </div>
          <div className="mb-10">
            <span className="text-[18px] font-normal text-white/50 capitalize ">
              Address:
            </span>
            <p className="text-[20px] font-normal text-white mt-2 ">
              London, United Kingdom.
            </p>
          </div>
          <div className="mb-10">
            <span className="text-[18px] font-normal text-white/50 capitalize ">
              Socials:
            </span>
            <div className="flex gap-4 mt-2 ">
              {socislSvgs.map((social, index) => (
                <div key={index} className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-400 transition-all duration-200 ">
                  <img
                    className="cursor-pointer w-5 h-5"
                    src={social.svg}
                    alt="social"
                    
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="basis-[50%] p-8 max-md:p-3 rounded-3xl bg-[#F9F9F9] ">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
