import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    isDataLoad: false,
    showCart: false,
    //changed: false,
  },

  reducers: {
    replaceCart(state, action) {
      state.totalPrice = action.payload.totalPrice;
      state.items = action.payload.items;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter(
        (item) => String(item.item_id) !== String(id)
      );
      state.totalPrice = 'loading price';
    },
    // ליישם את זה בשביל לשפר ביצועים
    addItemToCart(state) {},
    setIsLoad(state) {
      state.isDataLoad = !state.isDataLoad;
    },
    showCart(state, action) {
      state.showCart = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
