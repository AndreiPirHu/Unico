import { createAction, createReducer } from "@reduxjs/toolkit";

const addProducts = createAction<Products>(
  "adds all the products from the database"
);

const actions = { addProducts };

const initialState: Products = {
  products: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(addProducts, (state, action) => ({
    //...state is included to preserve other values in initialState that are not in products:
    ...state,
    products: action.payload.products,
  }));
});

export { reducer, actions };
