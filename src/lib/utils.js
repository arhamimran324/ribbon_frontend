import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// src/lib/utils.js

export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const createNoopStorage = () => {
  return {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
};

export const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();
