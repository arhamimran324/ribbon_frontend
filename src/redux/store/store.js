import languageReducer, { languageSlice } from "./languageSlice";
import authReducer from "../../redux/slices/auth-slice";
import appReducer from "../../redux/slices/app-slice";
import checkoutReducer from "../../redux/slices/checkout-slice";
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
