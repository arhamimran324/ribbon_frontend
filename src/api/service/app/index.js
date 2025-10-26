import { api } from "@/api/base";

export const getProducts = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api({
    method: "get",
    url: `/api/products?${queryParams}`,
  });
};

export const getProductByID = async (id) => {
  return await api({
    method: "get",
    url: `/api/products/${id}`,
  });
};

export const getSimilarProductsByID = async (id) => {
  return await api({
    method: "get",
    url: `/api/products/similar/${id}`,
  });
};

export const getFAQs = async () => {
  const response = await api({
    method: "get",
    url: `/api/faq`,
  });
  return response.data;
};

export const createOrder = async (orderData) => {
  return await api({
    method: "post",
    url: "/api/orders/create",
    payload: orderData,
  });
};

export const confirmPayment = async (paymentData) => {
  return await api({
    method: "post",
    url: "/api/orders/confirm-payment",
    payload: paymentData,
  });
};

export const createContactUs = async (orderData) => {
  return await api({
    method: "post",
    url: "/api/contact-us",
    payload: orderData,
  });
};

export const submitFeedback = async (feedback) => {
  return await api({
    method: "post",
    url: "/api/feedback",
    payload: feedback,
  });
};
