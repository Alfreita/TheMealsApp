import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartModelItem from "../../models/cartItem";
import { ADD_ORDER } from "../actions/order";

const initialState = {
  items: {},
  totalAmount: 0,
};
const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      let updateedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updateedOrNewCartItem = new CartModelItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updateedOrNewCartItem = new CartModelItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice
        );
      }
      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: updateedOrNewCartItem,
        },
        totalAmount: state.totalAmount + prodPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId];
      const currentQTY = selectedCartItem.quantity;
      let updateCartItems;
      if (currentQTY > 1) {
        const updatedCartItem = new CartModelItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updateCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updateCartItems = { ...state.items };
        delete updateCartItems[action.productId];
      }
      return {
        ...state,
        items: updateCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
  }
  return state;
};

export default cartReducer;
