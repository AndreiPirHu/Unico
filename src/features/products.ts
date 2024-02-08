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
    ...state,
    products: action.payload.products,
  }));
});

export { reducer, actions };
