import React from "react";

const DeliveryAndReturns = () => {
  return (
    <div className="px-70 py-24 max-md:px-4 max-md:py-12 max-md:pb-40  ">
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[44px] text-center text-black font-normal max-md:text-[28px]"
      >
        Delivery & Returns
      </h1>
      <div className="mt-8 flex flex-col gap-8">
        <div>
          <h2 className="text-[24px] font-semibold ">Delivery</h2>
          <p className="text-[#4E525F] text-[20px] leading-8 mt-3 ">
            We aim to dispatch all orders within 2 working days of payment being
            received. Standard UK delivery usually takes 3-5 working days from
            the dispatch date and will cost £3.99 per order. The delivery costs
            for specific Ribbon and Bow boxes are confirmed on the detailed
            products page.
          </p>
          <p className="text-[#4E525F] text-[20px] leading-8 ">
            Deliveries to remote places such as the Highlands and Islands of
            Scotland, the Isle of Man or the Isle of Wight may differ and can
            take up to 7 working days. We will make every effort to ensure your
            order is delivered in the shortest time possible. During busy
            periods, such as Christmas, delivery times may take slightly longer.
          </p>
          <p className="text-[#4E525F] text-[20px] leading-8 ">
            If your Ribbon and Bow item is needed urgently or if you require
            delivery on a specific date please email us at 
            <span className="cursor-pointer text-[#d5a581] ">
              ribbonandbowstore@gmail.com
            </span>
             and we will discuss the delivery options with you.
          </p>
          <p className="text-[#4E525F] text-[20px] leading-8 ">
            If you require international shipping please contact us at 
            <span className="cursor-pointer text-[#d5a581] ">
              ribbonandbowstore@gmail.com
            </span>
             We will review the best shipping options for your destination.
          </p>
        </div>
        <div>
          <h2 className="text-[24px] font-semibold ">Returns</h2>
          <p className="text-[#4E525F] text-[20px] leading-8 mt-3 ">
            We hope that you are pleased with your Ribbon and Bow order. We
            would hate for you to be unhappy, so if there is a problem with your
            order please contact us at 
            <span className="cursor-pointer text-[#d5a581] ">
              ribbonandbowstore@gmail.com
            </span>
             within 7 days of receiving your order and we will do our best to
            rectify the issue.
          </p>
          <p className="text-[#4E525F] text-[20px] leading-8 ">
            If you do wish to return your item you must do so with all
            individual gift items in their original unused condition and in the
            original packaging, within 28 days of delivery.
          </p>
          <p className="text-[#4E525F] text-[20px] leading-8 ">
            Ribbon and Bow do not take responsibility for postage fees incurred
            by yourself when returning the item.  For your own piece of mind, we
            recommend that you use a secure postage method and obtain proof of
            postage or use a signed for service.
          </p>
          <p className="text-[#4E525F] text-[20px] leading-8 ">
            You will be refunded as soon as we receive the returned par cel in
            the abovementioned conditions, minus the original delivery costs.
          </p>
          <p className="text-[#4E525F] text-[20px] leading-8 ">
            Orders that have been cancelled before dispatch we be refunded the
            original delivery costs.
          </p>
          <p className="text-[#4E525F] text-[20px] leading-8 ">
            For our returns address or any additional information please contact
            us at{" "}
            <span className="cursor-pointer text-[#d5a581] ">
              ribbonandbowstore@gmail.com
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAndReturns;
