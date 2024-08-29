import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice(
    {
        name: 'product',
        initialState: 
        {
            items: [],
            total: 0,
            isLoading: false,
            error: null,
        },
        reducers: 
        {
            setProduct: (state, action) => 
            {
                state.items = action.payload.items;
                state.total = action.payload.total;
            },
            addProduct: (state, action) => 
            {
                    state.items = [...state.items, action.payload];
                    state.total += 1;
            },
            editProduct: (state, action) => 
            {
                    const{id, item} = action.payload;
                    state.items = state.items.map((productItem) =>
                        productItem === id ? item : productItem
                    );
            },
            setLoading: (state, action) =>
            {
                state.isLoading=action.payload;
            },
            setError: (state, action) =>
            {
                state.error=action.payload;
            }
        },
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
    });

// Action creators are generated for each case reducer function
export const { setProduct, setLoading, setError } = productSlice.actions;
const {reducer: productReducer } = productSlice;

export default productReducer