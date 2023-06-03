import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartState: false,
  //if localstorage empti leave cart empty
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};
const CartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    setOpenCart: (state, action) => {
      //cart state equal to action
      state.cartState = action.payload.cartState;
    },
    setCloseCart: (state, action) => {
      //cart state equal to action
      state.cartState = action.payload.cartState;
    },
    // This code updates the state of a shopping cart by adding items to it.
    setAddItemToCart: (state, action) => {
      //searches for an item in the cart array that has the same id as the item specified in the action's payload.
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      //If the item is already in the cart, this line increments the cartQuantity property of the item at the specified index
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`Item quantity increased`);
      } else {
        //This line creates a new object named "temp" using the spread syntax. It copies all the properties from the item specified in the action's payload and adds a new property called "cartQuantity" with a value of 1. This represents the item being added to the cart for the first time.
        const temp = { ...action.payload, cartQuantity: 1 };
        //This line adds the new item (with the added "cartQuantity" property) to the cartItems array in the state.
        state.cartItems.push(action.payload);
        toast.success(`${action.payload.title} added to Cart`);
      }
      //saving it to local storage with key and value param
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setRemoveItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.id !== action.payloadid
      );
      state.cartItems = removeItem;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      toast.success(`${action.payload.title} removed from cart`);
    },
    setIncreaseItemQTY: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      //If the item is already in the cart, this line increments the cartQuantity property of the item at the specified index
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`Item quantity increased`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setDecreaseItemQTY: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      //If the item is already in the cart, this line increments the cartQuantity property of the item at the specified index
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.success(`Item quantity decreased`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setClearCarItem: (state, action) => {
      state.cartItems = [];
      toast.success(`Cart Cleared`);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setGetTotals: (state, action) => {
      state.cartItems.reduce(
        () => {
          let { totalAmount, totalQTY } = state.cartItems.reduce(
            (cartTotal, cartItem) => {
              const { price, cartQuantity } = cartItem;
              const totalPrice = price * cartQuantity;
              cartTotal.totalAmount += totalPrice;
              cartTotal.totalQTY += cartQuantity;
              return cartTotal;
            }
          );
        },
        {
          totalAmount: 0,
          totalQTY: 0,
        }
      );
      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQTY;
    },
  },
});
export const {
  setOpenCart,
  setCloseCart,
  setAddItemToCart,
  setClearCarItem,
  setDecreaseItemQTY,
  setIncreaseItemQTY,
  setGetTotals,
} = CartSlice.actions;
export const selectCartState = (state) => state.cart.cartState;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalQTY = (state) => state.cart.cartTotalQuantity;
export default CartSlice.reducer;
