import languageReducer, { languageSlice } from "./languageSlice";
import authReducer from "../slices/auth-slice";
import appReducer from "../slices/app-slice";
import checkoutReducer from "../slices/checkout-slice";
import buildBoxReducer from "../slices/built-box-slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { storage } from "../../lib/utils";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  language: languageReducer,
  app: appReducer,
  auth: authReducer,
  checkout: checkoutReducer,
  buildBox: buildBoxReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["register", "rehydrate"],
      },
    }),
});

export const persistor = persistStore(store);
