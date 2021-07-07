import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/cartItem";

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
        updateedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updateedOrNewCartItem = new CartItem(
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
  }
  return state;
};

export default cartReducer;
