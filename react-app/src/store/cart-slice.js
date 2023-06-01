import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    packages: [],
    totalPrice: 0,
    isDataLoad: false,
    showCart: false,
    counter: 0,
  },

  reducers: {
    replaceCart(state, action) {
      state.totalPrice = action.payload.totalPrice;
      state.items = action.payload.items;
      state.counter = action.payload.items.length;
      state.packages = action.payload.packages;
    },
    removeItemFromCart(state, action) {
      const id = action.payload.id;
      state.items = state.items.filter(
        (item) => String(item.item_id) !== String(id)
      );
      state.totalPrice = 'loading price';
      state.counter--;
    },
    // ליישם את זה בשביל לשפר ביצועים
    addItemToCart(state) {
      //state.counter++;
    },
    setIsLoad(state) {
      state.isDataLoad = !state.isDataLoad;
    },
    showCart(state, action) {
      state.showCart = action.payload;
    },
    changePackageOption(state, action) {
      state.totalPrice = 'loading price';
      for (let packageObj of state.packages) {
        if (packageObj.key === action.payload.key) {
          packageObj.opt = action.payload.opt;
        }
      }
    },
    replacePackages(state, action) {
      state.totalPrice = action.payload.totalPrice;
      state.packages = action.payload.packages;
    },
    resetCounter(state) {
      state.counter = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
