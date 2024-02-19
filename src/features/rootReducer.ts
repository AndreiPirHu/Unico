import { combineReducers } from "redux";
import { reducer as productsReducer } from "./products";
import { reducer as cartReducer } from "./cart";
export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
