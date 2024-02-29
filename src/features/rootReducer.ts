import { combineReducers } from "redux";
import { reducer as productsReducer } from "./products";
import { reducer as cartReducer } from "./cart";
import { reducer as orderReducer } from "./order";
export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
