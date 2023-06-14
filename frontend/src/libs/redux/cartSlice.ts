import { createSlice } from '@reduxjs/toolkit';
export interface CartItem {
  _id: number;
  uuid: number;
  name: string;
  price: number;
  amount: number;
  photo: string;
  files: File[] | FileList;
}
const cartItemsHistory = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    count: cartItemsHistory.length,
    cartItems: cartItemsHistory
  },
  reducers: {
    addCartItem: (state, action) => {
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);
      if (existingItem) {
        // If the item already exists, update its amount
        existingItem.amount = action.payload.amount;
      } else {
        // If the item doesn't exist, push the new product to cartItems
        state.cartItems.push(action.payload);
        state.count++;
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, { payload: productId }) => {
      state.cartItems = state.cartItems.filter(item => item._id !== productId);

      if (state.cartItems.length !== state.count) {
        state.count--;
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
    addFileDesign: (state, { payload: { productId, files } }) => {
      state.cartItems = state.cartItems.map(item => {
        if (item._id === productId) {
          // Update the files field of the matching cartItem
          item.files = files;
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    removeFileDesign: state => {
      state.cartItems = state.cartItems.map(item => {
        item.files = [];
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    }

  }
})

// Action creators are generated for each case reducer function
export const { addCartItem, removeCartItem, addFileDesign, removeFileDesign } = cartSlice.actions

export default cartSlice.reducer