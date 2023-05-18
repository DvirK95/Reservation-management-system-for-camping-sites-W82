import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    isDataLoad: false,
    //changed: false,
  },

  reducers: {
    replaceCart(state, action) {
      state.totalPrice = action.payload.totalPrice;
      state.items = action.payload.items;
    },
    /*removeItemFromCart(state, action) {
      const id = action.payload;

      state.items = state.items.filter(
        (item) => String(item.id) !== String(id)
      );
    },*/
    setIsLoad(state) {
      state.isDataLoad = !state.isDataLoad;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
