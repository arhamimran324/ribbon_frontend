import axios from "axios";
import { toast } from "sonner";
import { store } from "@/redux/store/store";
import Cookies from "js-cookie";

// REST API Client (Default)
const restApiClient = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_REST_API_BASE_URL || "http://localhost:5000",
  baseURL:
    process.env.NEXT_PUBLIC_REST_API_BASE_URL ||
    "https://ribbon-backend.vercel.app",
});

restApiClient.interceptors.request.use((config) => {
  const token = store.getState()?.auth?.user?.token || Cookies.get("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const xeroApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_XERO_API_BASE_URL,
});

export const api = async ({
  url,
  method = "get",
  payload = {},
  params = {},
  rest = {},
  apiType = "rest",
}) => {
  try {
    const headers = rest.headers || {};
    const axiosInstance = apiType === "xero" ? xeroApiClient : restApiClient;

    let response;

    switch (method.toLowerCase()) {
      case "get":
        response = await axiosInstance.get(url, {
          params,
          headers,
          ...rest,
        });
        break;

      case "post":
        response = await axiosInstance.post(url, payload, {
          params,
          headers,
          ...rest,
        });
        break;

      case "put":
        response = await axiosInstance.put(url, payload, {
          params,
          headers,
          ...rest,
        });
        break;

      case "patch":
        response = await axiosInstance.patch(url, payload, {
          params,
          headers,
          ...rest,
        });
        break;

      case "delete":
        response = await axiosInstance.delete(url, {
          data: payload, // axios delete can accept `data` for request body
          params,
          headers,
          ...rest,
        });
        break;

      case "head":
        response = await axiosInstance.head(url, {
          params,
          headers,
          ...rest,
        });
        break;

      case "options":
        response = await axiosInstance.options(url, {
          params,
          headers,
          ...rest,
        });
        break;

      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return response?.data;
  } catch (error) {
    console.error("🚀 ~ api error:", error);

    if (error?.code === "ERR_NETWORK") {
      console?.error("Network error");
    } else if (error?.response?.data?.message) {
      console?.error(error.response.data.message);
    } else {
      console?.error("Something went wrong");
    }

    throw error;
  }
};
