import { configureStore } from "@reduxjs/toolkit";
import { SummraizerApi } from "../services/SummraizerApi";

export const store = configureStore({
  reducer: {
    [SummraizerApi.reducerPath]: SummraizerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(SummraizerApi.middleware),
});