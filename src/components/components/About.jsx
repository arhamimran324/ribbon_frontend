import React from "react";

const About = () => {
  return (
    <div className="px-20 py-24 max-md:px-4 max-md:py-12 max-md:pb-40 flex justify-between max-md:flex-col  ">
      <div className="basis-[48%]">
        <h1
          style={{ fontFamily: "Jedira-Regular, sans-serif" }}
          className="text-[44px] max-md:text-center text-black font-normal max-md:text-[28px]"
        >
          Who We Are
        </h1>
        <p className="mt-4 text-[#101928] font-light ">
          Back in 2018 a dear friend of mine embarked on the beautiful yet
          challenging journey of motherhood. As she navigated the rollercoaster
          of emotions that often come after giving birth, she found herself
          battling with postnatal depression. Amidst the sea of gifts she
          received for her new born, there seemed to be a void in offerings that
          catered to her own well-being. It was in this moment that the seed for
          our gift box company was planted.
        </p>
        <p className="mt-4 text-[#101928] font-light ">
          With a heart full of compassion and a desire to make a difference, I
          curated a special hamper for her, filled with new mum essentials aimed
          at nurturing her physical and emotional health. This thoughtful
          gesture not only brought comfort to her, but also sparked a glimmer of
          hope in her eyes.
        </p>
        <p className="mt-4 text-[#101928] font-light ">
          Slowly but surely, the idea blossomed as friends and family witnessed
          the impact of these thoughtfully curated gifts. Before we knew it,
          orders for these soulful hampers started pouring in, especially for
          baby showers. And just like that, our humble beginnings grew into a
          blossoming venture, offering a diverse range of self-care gifts for
          all of life’s precious moments.
        </p>
        <p className="mt-4 text-[#101928] font-light ">
          Our aim is to create meaningful gifts that you feel great giving. We
          are here to make gifting easy by providing the best experience, from
          including a heartfelt note, to carefully selecting great quality items
          and  shipping it to your desired destination (saving you a trip to the
          post office).
        </p>
        <p className="text-[#101928] font-light ">
          We hope the love and care is felt through each gift box we send. 
        </p>
        <p className="text-[#101928] font-light ">Happy gifting x</p>
      </div>
      <div className="basis-[38%] relative top-20 ">
        <img
          className="h-[550px] max-md:h-[450] w-[531px] max-md:w-[90vw] "
          src="/assets/images/about.jpg"
          alt="about"
        />
        <div
          style={{ fontFamily: "Jedira-Italic, sans-serif" }}
          className="bg-[#F9F9F9] text-center p-4 font-normal text-2xl  "
        >
          Sisters{" "}
          <span style={{ fontFamily: "Jedira-Regular, sans-serif" }}>
            Temu and Tega
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
