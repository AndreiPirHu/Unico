import { createAction, createReducer } from "@reduxjs/toolkit";

const storeOrderID = createAction<string>("Stores the latest orderID");

const actions = { storeOrderID };

const initialState: string = "";

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(storeOrderID, (state, action) => {
    return action.payload;
  });
});

export { reducer, actions };
