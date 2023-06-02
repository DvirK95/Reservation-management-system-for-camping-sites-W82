import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  packages: [],
  totalPrice: 0,
  isDataLoad: false,
  showCart: false,
  counter: 0,
  errorMessage: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

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
    setErrorMessage(state, action) {
      for (let item of state.items) {
        if (item.key === action.payload.key) {
          item.errorMessage = action.payload.errorMessage;
        }
      }
    },
    changePeopleAmount(state, action) {
      let typeChange = 'toddler';
      for (let item of state.items) {
        if (item.key === action.payload.key) {
          if (item.adults !== action.payload.adult) {
            typeChange = 'adults';
          } else if (item.children !== action.payload.child) {
            typeChange = 'children';
          }
          item[[typeChange]] = '...';
        }
      }
    },
    resetCart: (state) => initialState,
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
