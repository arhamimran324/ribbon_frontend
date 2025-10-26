export const bestSellers = [
  {
    id: 1,
    image: "/assets/images/pamper.jpg",
    title: "The Pamper Hamper",
    price: "35",
    quantity: 1,
  },
  {
    id: 2,
    image: "/assets/images/baby.jpg",
    title: "Welcome baby",
    price: "65",
    quantity: 1,
  },
  {
    id: 3,
    image: "/assets/images/luxuryMum.jpg",
    title: "Luxury mum & baby gift",
    price: "95",
    quantity: 1,
  },
  {
    id: 4,
    image: "/assets/images/married.png",
    title: "Getting married",
    price: "95",
    quantity: 1,
  },
  // Start repeating with changes
  ...Array.from({ length: 36 }, (_, i) => {
    const images = [
      "/assets/images/pamper.jpg",
      "/assets/images/baby.jpg",
      "/assets/images/luxuryMum.jpg",
      "/assets/images/married.png",
    ];
    const baseTitles = [
      "The Pamper Hamper",
      "Welcome baby",
      "Luxury mum & baby gift",
      "Getting married",
    ];
    const image = images[i % images.length];
    const title = `${baseTitles[i % baseTitles.length]} ${
      Math.floor(i / 4) + 2
    }`;
    const price = (35 + i * 3).toString(); // just increasing price arbitrarily

    return {
      id: i + 5,
      image,
      title,
      price,
      quantity: 1,
    };
  }),
];

export const shopByCategory = [
  {
    image: "/assets/images/treatBox.jpg",
    title: "TreatBox Pyjamas",
  },
  {
    image: "/assets/images/newBaby.jpg",
    title: "New Baby Gift",
  },
  {
    image: "/assets/images/bridalParty.jpg",
    title: "Bridal Party",
  },
  {
    image: "/assets/images/candle.jpg",
    title: "Candle Making",
  },
];

export const whyChoose = [
  {
    image: "/assets/svgs/carefully.svg",
    title: "Carefully curated",
    text: "We ensure money-back guarantee if the product is counterfeit.",
  },
  {
    image: "/assets/svgs/lovingly.svg",
    title: "Lovingly Packaged",
    text: "Every item is carefully wrapped with love and attention to detail.",
  },
  {
    image: "/assets/svgs/womenOwner.svg",
    title: "Women owned",
    text: "Proudly led by women, driven by passion and purpose.",
  },
  {
    image: "/assets/svgs/shipping.svg",
    title: "Hassle free shipping",
    text: "We make shipping simple, so you can relax.",
  },
];

export const gratefulWork = [
  {
    image: "/assets/svgs/hitched-client-logo.svg",
  },
  {
    image: "/assets/svgs/Bridebook-Logo.svg",
  },
  {
    image: "/assets/svgs/Guide-For-Brides.svg",
  },
  {
    image: "/assets/svgs/Exlixir-clinic.svg",
  },
  {
    image: "/assets/svgs/Hill-hub.svg",
  },
  {
    image: "/assets/svgs/Nailed-it.svg",
  },
  {
    image: "/assets/svgs/PWC.svg",
  },
];

export const countries = [
  {
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 72 72"
      >
        <path fill="#fff" d="M5 17h62v38H5z" />
        <path fill="#d22f27" d="M5 17h62v5H5zm0 9h62v4H5zm0 8h62v4H5z" />
        <path fill="#1e50a0" d="M5 17h32v21H5z" />
        <path fill="#d22f27" d="M5 42h62v4H5z" />
        <circle cx="9" cy="22" r="1.75" fill="#fff" />
        <circle cx="17" cy="22" r="1.75" fill="#fff" />
        <circle cx="25" cy="22" r="1.75" fill="#fff" />
        <circle cx="33" cy="22" r="1.75" fill="#fff" />
        <circle cx="29" cy="26" r="1.75" fill="#fff" />
        <circle cx="21" cy="26" r="1.75" fill="#fff" />
        <circle cx="13" cy="26" r="1.75" fill="#fff" />
        <circle cx="9" cy="30" r="1.75" fill="#fff" />
        <circle cx="17" cy="30" r="1.75" fill="#fff" />
        <circle cx="25" cy="30" r="1.75" fill="#fff" />
        <circle cx="33" cy="30" r="1.75" fill="#fff" />
        <circle cx="29" cy="34" r="1.75" fill="#fff" />
        <circle cx="21" cy="34" r="1.75" fill="#fff" />
        <circle cx="13" cy="34" r="1.75" fill="#fff" />
        <path fill="#d22f27" d="M5 50h62v5H5z" />
        <path
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 17h62v38H5z"
        />
      </svg>
    ),
    name: "United States",
  },
  {
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 36 36"
      >
        <path
          fill="#00247d"
          d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"
        />
        <path
          fill="#cf1b2b"
          d="m25.14 23l9.712 6.801a4 4 0 0 0 .99-1.749L28.627 23zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943zm10-10h2.141l9.711-6.8a4 4 0 0 0-1.937-1.085L23 12.057zm-12.141 0L1.148 6.2a4 4 0 0 0-.991 1.749L7.372 13z"
        />
        <path
          fill="#eee"
          d="M36 21H21v10h2v-5.836L31.335 31H32a4 4 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21zM36 9a3.98 3.98 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4 4 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059zM13 5v5.837L4.664 5H4a4 4 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A4 4 0 0 0 0 9v.059L5.628 13H0v2h15V5z"
        />
        <path fill="#cf1b2b" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z" />
      </svg>
    ),
    name: "United Kingdom",
  },
  // {
  //   flag: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="24"
  //       height="24"
  //       viewBox="0 0 72 72"
  //     >
  //       <path fill="#fff" d="M5 17h62v38H5z" />
  //       <path fill="#d22f27" d="M5 17h17v38H5zm45 0h17v38H50z" />
  //       <path
  //         fill="#d22f27"
  //         stroke="#d22f27"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth="2"
  //         d="M36 46v-5m0 0h6.8l-.8-2l4-4v-3h-3l-4 4v-7l-3-3m0 15h-6.8l.8-2l-4-4v-3h3l4 4v-7l3-3"
  //       />
  //       <path
  //         fill="none"
  //         stroke="#000"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth="2"
  //         d="M5 17h62v38H5z"
  //       />
  //     </svg>
  //   ),
  //   name: "Canada",
  // },
];

export const productPageBottomImages = [
  {
    image: "/assets/images/productPageImg2.png",
  },
  {
    image: "/assets/images/productPageImg3.png",
  },
  {
    image: "/assets/images/productPageImg4.png",
  },
  {
    image: "/assets/images/productPageImg5.png",
  },
];

export const candlePageBottomImages = [
  {
    image: "/assets/svgs/candleDetail/candleDetail2.svg",
  },
  {
    image: "/assets/svgs/candleDetail/candleDetail3.svg",
  },
  {
    image: "/assets/svgs/candleDetail/candleDetail4.svg",
  },
  {
    image: "/assets/svgs/candleDetail/candleDetail5.svg",
  },
];

export const navRightIcons = [
  {
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="cursor-pointer"
      >
        <g fill="none" fillRule="evenodd">
          <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
          <path
            fill="#000"
            d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0"
          />
        </g>
      </svg>
    ),
  },
  {
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeDasharray="20"
          strokeDashoffset="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M6 19v-1c0 -2.21 1.79 -4 4 -4h4c2.21 0 4 1.79 4 4v1">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.2s"
              values="20;0"
            />
          </path>
          <path d="M12 11c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3Z">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.2s"
              dur="0.2s"
              values="20;0"
            />
          </path>
        </g>
      </svg>
    ),
  },
  {
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="cursor-pointer"
      >
        <path
          fill="#000"
          d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z"
        />
      </svg>
    ),
  },
];

export const myBasket = [
  {
    image: "/assets/images/basketImg1.jpg",
    title: "The pamper hamper",
    price: 71,
    color: "Black",
    shippimg: "Free",
  },
  {
    image: "/assets/images/basketImg2.jpg",
    title: "The pamper hamper",
    price: 100,
    color: "Black",
    shippimg: "Free",
  },
  {
    image: "/assets/images/basketImg3.jpg",
    title: "The pamper hamper",
    price: 171,
    color: "Black",
    shippimg: "Free",
  },
];

// export const blogsMain = [
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
//   {
//     image: "/assets/images/blogsImgs/blogimg.jpg",
//     category: "Livestyle",
//     date: "Feb 7, 2025",
//     title: "Creative Ways to Repurpose Your Empty Candle Jars",
//     desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
//   },
// ];

export const blogsMain = [
  {
    id: 1,
    image: "/assets/images/blogsImgs/blogimg1.jpg",
    category: "Press",
    date: "Jan 31, 2024",
    title: "Blog Title 9834",
    desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
  },
  {
    id: 2,
    image: "/assets/images/blogsImgs/blogimg2.jpg",
    category: "The Gift Edit",
    date: "Feb 25, 2024",
    title: "Blog Title 7462",
    desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
  },
  {
    id: 3,
    image: "/assets/images/blogsImgs/blogimg3.jpg",
    category: "Pop Ups",
    date: "Apr 02, 2024",
    title: "Blog Title 1032",
    desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
  },
  {
    id: 4,
    image: "/assets/images/blogsImgs/blogimg4.jpg",
    category: "Lifestyle",
    date: "Jul 14, 2023",
    title: "Blog Title 4567",
    desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
  },
  {
    id: 5,
    image: "/assets/images/blogsImgs/blogimg14.jpg",
    category: "Pop Ups",
    date: "Dec 10, 2023",
    title: "Blog Title 8651",
    desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
  },
  {
    id: 6,
    image: "/assets/images/blogsImgs/blogimg6.jpg",
    category: "Press",
    date: "Nov 21, 2023",
    title: "Blog Title 2198",
    desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
  },
  {
    id: 7,
    image: "/assets/images/blogsImgs/blogimg7.jpg",
    category: "Lifestyle",
    date: "Sep 13, 2023",
    title: "Blog Title 3124",
    desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
  },
  {
    id: 8,
    image: "/assets/images/blogsImgs/blogimg8.jpg",
    category: "The Gift Edit",
    date: "May 02, 2023",
    title: "Blog Title 5913",
    desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
  },
  {
    id: 9,
    image: "/assets/images/blogsImgs/blogimg9.jpg",
    category: "Pop Ups",
    date: "Aug 18, 2023",
    title: "Blog Title 7405",
    desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
  },
  {
    id: 10,
    image: "/assets/images/blogsImgs/blogimg10.jpg",
    category: "Press",
    date: "Mar 30, 2023",
    title: "Blog Title 8873",
    desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
  },
  {
    id: 11,
    image: "/assets/images/blogsImgs/blogimg11.jpg",
    category: "The Gift Edit",
    date: "Jan 01, 2024",
    title: "Blog Title 1287",
    desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
  },
  {
    id: 12,
    image: "/assets/images/blogsImgs/blogimg12.jpg",
    category: "Lifestyle",
    date: "Jun 03, 2023",
    title: "Blog Title 6332",
    desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good...",
  },
  // {
  //   id: 13,
  //   image: "/assets/imags/logsImgs/blogimg1.jpg",
  //   category: "Pop Ups",
  //   date: "Oct 16, 2023",
  //   title: "Blog Title 4207",
  //   desc: "Here are some aesthetic ways to repurpose your candle jars for a sustainable home We all love a good..",
  // },
];

export const bottomBlogText = [
  {
    title: "Match Holder",
    desc: "Turn your empty candle jar into a chic match holder. Just pop in a bunch of matches and stick a strike strip on the bottom or lid. It’s a cute and functional way to always have a light ready for your next candle moment.",
  },
  {
    title: "Desk Organiser for Pens & Pencils",
    desc: "Give your workspace a glow-up by using an empty jar to store pens, pencils, and markers. It’s an easy way to keep things neat while adding a touch of elegance to your desk.",
  },
  {
    title: "Match Holder",
    desc: "Turn your empty candle jar into a chic match holder. Just pop in a bunch of matches and stick a strike strip on the bottom or lid. It’s a cute and functional way to always have a light ready for your next candle moment.",
  },
  {
    title: "Match Holder",
    desc: "Turn your empty candle jar into a chic match holder. Just pop in a bunch of matches and stick a strike strip on the bottom or lid. It’s a cute and functional way to always have a light ready for your next candle moment.",
  },
  {
    title: "Match Holder",
    desc: "Turn your empty candle jar into a chic match holder. Just pop in a bunch of matches and stick a strike strip on the bottom or lid. It’s a cute and functional way to always have a light ready for your next candle moment.",
  },
  {
    title: "Match Holder",
    desc: "Turn your empty candle jar into a chic match holder. Just pop in a bunch of matches and stick a strike strip on the bottom or lid. It’s a cute and functional way to always have a light ready for your next candle moment.",
  },
  {
    title: " DIY Candle Refill",
    desc: "Why not give your jar a second life by making your own candle? With a little wax, a wick, and your favorite fragrance, you can create a whole new vibe right at home.",
  },
  {
    title: "Jewellery or Hair Accessories Holder",
    desc: "Keep your rings, earrings, or hair clips in one stylish spot. An empty candle jar makes a cute addition to your dressing table and keeps everything organised and easy to find.",
  },
  {
    title: "Coin or Key Jar",
    desc: "Tired of losing your keys or loose change? Place an empty jar near your entryway to catch those little things that always seem to go missing.",
  },
  {
    title: "Bathroom Essentials Organizer",
    desc: "Store bath salts, scrunchies, or even toothbrushes in a cleaned-out candle jar to add a little organisation and charm to your bathroom space. So next time your favourite candle is all burned out, don’t throw it away – get creative and repurpose it! We’d love to see how you’re reusing your empty candle jars. Tag us on Instagram @ribbonandbowstore and show off your ideas! Need a fresh candle to start your next upcycling project? Browse our collection at here.",
  },
];

export const FAQS = [
  {
    question: "How long will it take to receive my order?",
    answer:
      "Absolutely! All gifts can be sent directly to the person of your choice. Receipts and order confirmations are emailed to you, the sender. We make sure that this information is not sent with the gift.",
  },
  {
    question: "Can I get a gift sent directly to someone else?",
    answer:
      "Absolutely! All gifts can be sent directly to the person of your choice. Receipts and order confirmations are emailed to you, the sender. We make sure that this information is not sent with the gift.",
  },
  {
    question: "How do I add my personal message for the notecard?",
    answer:
      "Absolutely! All gifts can be sent directly to the person of your choice. Receipts and order confirmations are emailed to you, the sender. We make sure that this information is not sent with the gift.",
  },
  {
    question: "Is the packaging included in the price?",
    answer:
      "Absolutely! All gifts can be sent directly to the person of your choice. Receipts and order confirmations are emailed to you, the sender. We make sure that this information is not sent with the gift.",
  },
  {
    question: "How will I know when my order has been dispatched?",
    answer:
      "Absolutely! All gifts can be sent directly to the person of your choice. Receipts and order confirmations are emailed to you, the sender. We make sure that this information is not sent with the gift.",
  },
  {
    question: "Can I receive the order on a specific date?",
    answer:
      "Absolutely! All gifts can be sent directly to the person of your choice. Receipts and order confirmations are emailed to you, the sender. We make sure that this information is not sent with the gift.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Absolutely! All gifts can be sent directly to the person of your choice. Receipts and order confirmations are emailed to you, the sender. We make sure that this information is not sent with the gift.",
  },
  {
    question: "Do you offer custom gift boxes?",
    answer:
      "Absolutely! All gifts can be sent directly to the person of your choice. Receipts and order confirmations are emailed to you, the sender. We make sure that this information is not sent with the gift.",
  },
  {
    question: "Can I order more than one Ribbon and Bow box?",
    answer:
      "Absolutely! All gifts can be sent directly to the person of your choice. Receipts and order confirmations are emailed to you, the sender. We make sure that this information is not sent with the gift.",
  },
  {
    question:
      "Can I see the list of ingredients in the products before purchasing?",
    answer:
      "Absolutely! All gifts can be sent directly to the person of your choice. Receipts and order confirmations are emailed to you, the sender. We make sure that this information is not sent with the gift.",
  },
  {
    question: "What is the size of the gift boxes?",
    answer:
      "Absolutely! All gifts can be sent directly to the person of your choice. Receipts and order confirmations are emailed to you, the sender. We make sure that this information is not sent with the gift.",
  },
  {
    question: "What’s your returns policy?",
    answer:
      "Absolutely! All gifts can be sent directly to the person of your choice. Receipts and order confirmations are emailed to you, the sender. We make sure that this information is not sent with the gift.",
  },
  {
    question: "Got another question?",
    answer:
      "Absolutely! All gifts can be sent directly to the person of your choice. Receipts and order confirmations are emailed to you, the sender. We make sure that this information is not sent with the gift.",
  },
];

export const selectBoxData = [
  {
    image: "/assets/images/chooseCard/selectBox.jpg",
    title: "Clear box",
    text: "Fits 4 Items",
  },
  {
    image: "/assets/images/chooseCard/selectBox.jpg",
    title: "Fosted box",
    text: "Fits 4 Items",
  },
  {
    image: "/assets/images/chooseCard/selectBox.jpg",
    title: "Fosted box",
    text: "Can Fit upto 10 Items",
  },
];

export const itemsLeftImages = [
  {
    image: "/assets/images/chooseCard/selectBox.jpg",
    title: "Clear Box",
  },
  {
    image: "/assets/images/chooseCard/selectBox.jpg",
    title: "Clear Box",
  },
  {
    image: "/assets/images/chooseCard/selectBox.jpg",
    title: "Clear Box",
  },
  {
    image: "/assets/images/chooseCard/selectBox.jpg",
    title: "Clear Box",
  },
  {
    image: "/assets/images/chooseCard/selectBox.jpg",
    title: "Clear Box",
  },
  {
    image: "/assets/images/chooseCard/selectBox.jpg",
    title: "Clear Box",
  },
  {
    image: "/assets/images/chooseCard/selectBox.jpg",
    title: "Clear Box",
  },
];

export const candleMaking = [
  {
    id: 60,
    image: "/assets/svgs/candlemaking/candle1.svg",
    title: "Beginners Candle Making Workshop",
    date: "Saturday 1st June, 11AM",
    price: "95",
    quantity: 1,
  },
  {
    id: 61,
    image: "/assets/svgs/candlemaking/candle2.svg",
    title: "Beginners Candle Making Workshop",
    date: "Sunday 2nd June, 2PM",
    price: "89",
    quantity: 1,
  },
  {
    id: 62,
    image: "/assets/svgs/candlemaking/candle3.svg",
    title: "Beginners Candle Making Workshop",
    date: "Monday 3rd June, 3PM",
    price: "76",
    quantity: 1,
  },
  {
    id: 63,
    image: "/assets/svgs/candlemaking/candle4.svg",
    title: "Beginners Candle Making Workshop",
    date: "Tuesday 4th June, 5PM",
    price: "65",
    quantity: 1,
  },
  {
    id: 64,
    image: "/assets/svgs/candlemaking/candle1.svg",
    title: "Beginners Candle Making Workshop",
    date: "Wednesday 5th June, 11AM",
    price: "55",
    quantity: 1,
  },
  {
    id: 65,
    image: "/assets/svgs/candlemaking/candle2.svg",
    title: "Beginners Candle Making Workshop",
    date: "Thursday 6th June, 1PM",
    price: "78",
    quantity: 1,
  },
  {
    id: 66,
    image: "/assets/svgs/candlemaking/candle3.svg",
    title: "Beginners Candle Making Workshop",
    date: "Friday 7th June, 12PM",
    price: "59",
    quantity: 1,
  },
  {
    id: 67,
    image: "/assets/svgs/candlemaking/candle4.svg",
    title: "Beginners Candle Making Workshop",
    date: "Saturday 8th June, 2PM",
    price: "88",
    quantity: 1,
  },
  {
    id: 68,
    image: "/assets/svgs/candlemaking/candle1.svg",
    title: "Beginners Candle Making Workshop",
    date: "Sunday 9th June, 11AM",
    price: "66",
    quantity: 1,
  },
  {
    id: 69,
    image: "/assets/svgs/candlemaking/candle2.svg",
    title: "Beginners Candle Making Workshop",
    date: "Monday 10th June, 3PM",
    price: "92",
    quantity: 1,
  },
  {
    id: 70,
    image: "/assets/svgs/candlemaking/candle3.svg",
    title: "Beginners Candle Making Workshop",
    date: "Tuesday 11th June, 4PM",
    price: "63",
    quantity: 1,
  },
  {
    id: 71,
    image: "/assets/svgs/candlemaking/candle4.svg",
    title: "Beginners Candle Making Workshop",
    date: "Wednesday 12th June, 5PM",
    price: "87",
    quantity: 1,
  },
  {
    id: 72,
    image: "/assets/svgs/candlemaking/candle1.svg",
    title: "Beginners Candle Making Workshop",
    date: "Thursday 13th June, 11AM",
    price: "72",
    quantity: 1,
  },
  {
    id: 73,
    image: "/assets/svgs/candlemaking/candle2.svg",
    title: "Beginners Candle Making Workshop",
    date: "Friday 14th June, 12PM",
    price: "93",
    quantity: 1,
  },
  {
    id: 74,
    image: "/assets/svgs/candlemaking/candle3.svg",
    title: "Beginners Candle Making Workshop",
    date: "Saturday 15th June, 1PM",
    price: "60",
    quantity: 1,
  },
  {
    id: 75,
    image: "/assets/svgs/candlemaking/candle4.svg",
    title: "Beginners Candle Making Workshop",
    date: "Sunday 16th June, 2PM",
    price: "85",
    quantity: 1,
  },
  {
    id: 76,
    image: "/assets/svgs/candlemaking/candle1.svg",
    title: "Beginners Candle Making Workshop",
    date: "Monday 17th June, 3PM",
    price: "74",
    quantity: 1,
  },
  {
    id: 77,
    image: "/assets/svgs/candlemaking/candle2.svg",
    title: "Beginners Candle Making Workshop",
    date: "Tuesday 18th June, 4PM",
    price: "90",
    quantity: 1,
  },
  {
    id: 78,
    image: "/assets/svgs/candlemaking/candle3.svg",
    title: "Beginners Candle Making Workshop",
    date: "Wednesday 19th June, 5PM",
    price: "69",
    quantity: 1,
  },
  {
    id: 79,
    image: "/assets/svgs/candlemaking/candle4.svg",
    title: "Beginners Candle Making Workshop",
    date: "Thursday 20th June, 11AM",
    price: "58",
    quantity: 1,
  },
  {
    id: 80,
    image: "/assets/svgs/candlemaking/candle1.svg",
    title: "Beginners Candle Making Workshop",
    date: "Friday 21st June, 1PM",
    price: "99",
    quantity: 1,
  },
  {
    id: 81,
    image: "/assets/svgs/candlemaking/candle2.svg",
    title: "Beginners Candle Making Workshop",
    date: "Saturday 22nd June, 2PM",
    price: "77",
    quantity: 1,
  },
  {
    id: 82,
    image: "/assets/svgs/candlemaking/candle3.svg",
    title: "Beginners Candle Making Workshop",
    date: "Sunday 23rd June, 3PM",
    price: "64",
    quantity: 1,
  },
  {
    id: 83,
    image: "/assets/svgs/candlemaking/candle4.svg",
    title: "Beginners Candle Making Workshop",
    date: "Monday 24th June, 4PM",
    price: "91",
    quantity: 1,
  },
  {
    id: 84,
    image: "/assets/svgs/candlemaking/candle1.svg",
    title: "Beginners Candle Making Workshop",
    date: "Tuesday 25th June, 5PM",
    price: "67",
    quantity: 1,
  },
  {
    id: 85,
    image: "/assets/svgs/candlemaking/candle2.svg",
    title: "Beginners Candle Making Workshop",
    date: "Wednesday 26th June, 11AM",
    price: "86",
    quantity: 1,
  },
  {
    id: 86,
    image: "/assets/svgs/candlemaking/candle3.svg",
    title: "Beginners Candle Making Workshop",
    date: "Thursday 27th June, 12PM",
    price: "79",
    quantity: 1,
  },
  {
    id: 87,
    image: "/assets/svgs/candlemaking/candle4.svg",
    title: "Beginners Candle Making Workshop",
    date: "Friday 28th June, 2PM",
    price: "52",
    quantity: 1,
  },
  {
    id: 88,
    image: "/assets/svgs/candlemaking/candle1.svg",
    title: "Beginners Candle Making Workshop",
    date: "Saturday 29th June, 3PM",
    price: "81",
    quantity: 1,
  },
  {
    id: 89,
    image: "/assets/svgs/candlemaking/candle2.svg",
    title: "Beginners Candle Making Workshop",
    date: "Sunday 30th June, 4PM",
    price: "75",
    quantity: 1,
  },
  // {
  //   id: 90,
  //   image: "/assets/svgs/candlemaking/candle3.svg",
  //   title: "Beginners Candle Making Workshop",
  //   date: "Monday 1st July, 5PM",
  //   price: "61",
  //   quantity: 1,
  // },
  // {
  //   id: 91,
  //   image: "/assets/svgs/candlemaking/candle4.svg",
  //   title: "Beginners Candle Making Workshop",
  //   date: "Tuesday 2nd July, 11AM",
  //   price: "94",
  //   quantity: 1,
  // },
  // {
  //   id: 92,
  //   image: "/assets/svgs/candlemaking/candle1.svg",
  //   title: "Beginners Candle Making Workshop",
  //   date: "Wednesday 3rd July, 12PM",
  //   price: "80",
  //   quantity: 1,
  // },
  // {
  //   id: 93,
  //   image: "/assets/svgs/candlemaking/candle2.svg",
  //   title: "Beginners Candle Making Workshop",
  //   date: "Thursday 4th July, 1PM",
  //   price: "62",
  //   quantity: 1,
  // },
  // {
  //   id: 94,
  //   image: "/assets/svgs/candlemaking/candle3.svg",
  //   title: "Beginners Candle Making Workshop",
  //   date: "Friday 5th July, 2PM",
  //   price: "68",
  //   quantity: 1,
  // },
  // {
  //   id: 95,
  //   image: "/assets/svgs/candlemaking/candle4.svg",
  //   title: "Beginners Candle Making Workshop",
  //   date: "Saturday 6th July, 3PM",
  //   price: "73",
  //   quantity: 1,
  // },
  // {
  //   id: 96,
  //   image: "/assets/svgs/candlemaking/candle1.svg",
  //   title: "Beginners Candle Making Workshop",
  //   date: "Sunday 7th July, 4PM",
  //   price: "57",
  //   quantity: 1,
  // },
  // {
  //   id: 97,
  //   image: "/assets/svgs/candlemaking/candle2.svg",
  //   title: "Beginners Candle Making Workshop",
  //   date: "Monday 8th July, 5PM",
  //   price: "98",
  //   quantity: 1,
  // },
  // {
  //   id: 98,
  //   image: "/assets/svgs/candlemaking/candle3.svg",
  //   title: "Beginners Candle Making Workshop",
  //   date: "Tuesday 9th July, 11AM",
  //   price: "83",
  //   quantity: 1,
  // },
  // {
  //   id: 99,
  //   image: "/assets/svgs/candlemaking/candle4.svg",
  //   title: "Beginners Candle Making Workshop",
  //   date: "Wednesday 10th July, 2PM",
  //   price: "70",
  //   quantity: 1,
  // },
];

export const corporateGiftingImgs = [
  {
    img: "/assets/svgs/corporateGift/corporateGift1.svg",
  },
  {
    img: "/assets/svgs/corporateGift/corporateGift2.svg",
  },
  {
    img: "/assets/svgs/corporateGift/corporateGift3.svg",
  },
  {
    img: "/assets/svgs/corporateGift/corporateGift4.svg",
  },
  {
    img: "/assets/svgs/corporateGift/corporateGift5.svg",
  },
  {
    img: "/assets/svgs/corporateGift/corporateGift6.svg",
  },
  {
    img: "/assets/svgs/corporateGift/corporateGift7.svg",
  },
  {
    img: "/assets/svgs/corporateGift/corporateGift8.svg",
  },
  {
    img: "/assets/svgs/corporateGift/corporateGift9.svg",
  },
];

export const testimonials = [
  {
    star: "/assets/svgs/star.svg",
    text: "Orders just came in  and I’m in LOVE! Such gorgeous gifts. Can’t wait to order again",
    profileIcon: "/assets/svgs/profileT.svg",
    profileName: "Jenniffer Smith",
  },
  {
    star: "/assets/svgs/star.svg",
    text: "Orders just came in  and I’m in LOVE! Such gorgeous gifts. Can’t wait to order again",
    profileIcon: "/assets/svgs/profileT.svg",
    profileName: "Jenniffer Smith",
  },
  {
    star: "/assets/svgs/star.svg",
    text: "Orders just came in  and I’m in LOVE! Such gorgeous gifts. Can’t wait to order again",
    profileIcon: "/assets/svgs/profileT.svg",
    profileName: "Jenniffer Smith",
  },
  {
    star: "/assets/svgs/star.svg",
    text: "Orders just came in  and I’m in LOVE! Such gorgeous gifts. Can’t wait to order again",
    profileIcon: "/assets/svgs/profileT.svg",
    profileName: "Jenniffer Smith",
  },
  {
    star: "/assets/svgs/star.svg",
    text: "Orders just came in  and I’m in LOVE! Such gorgeous gifts. Can’t wait to order again",
    profileIcon: "/assets/svgs/profileT.svg",
    profileName: "Jenniffer Smith",
  },
  {
    star: "/assets/svgs/star.svg",
    text: "Orders just came in  and I’m in LOVE! Such gorgeous gifts. Can’t wait to order again",
    profileIcon: "/assets/svgs/profileT.svg",
    profileName: "Jenniffer Smith",
  },
];
