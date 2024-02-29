import { createAction, createReducer } from "@reduxjs/toolkit";

const addToCart = createAction<CartProduct>("Adds a product to cart");

const removeFromCart = createAction<CartProduct>(
  "Removes an item from cart based on id"
);

const removeSeveralFromCart = createAction<{ name: string; size: string }>(
  "Removes all items with the same name and size from cart"
);

const clearCart = createAction("Clears the cart of all items");

const actions = { addToCart, removeFromCart, clearCart, removeSeveralFromCart };

const initialState: CartProduct[] = [];

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => [...state, action.payload])

    .addCase(removeFromCart, (state, action) =>
      state.filter((product) => product.id !== action.payload.id)
    )
    .addCase(removeSeveralFromCart, (state, action) =>
      state.filter(
        (product) =>
          product.name !== action.payload.name ||
          product.size !== action.payload.size
      )
    )

    .addCase(clearCart, () => initialState);
});

export { reducer, actions };
