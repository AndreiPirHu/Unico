import { combineReducers } from "redux";
import { reducer as productsReducer } from "./products";

export const rootReducer = combineReducers({
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
