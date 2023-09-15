import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { formReducer } from "./reducers/FormSlice";
import { postsApi } from "../api/postsApi";

const rootReducer = combineReducers({
  formReducer,
  [postsApi.reducerPath]: postsApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postsApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
