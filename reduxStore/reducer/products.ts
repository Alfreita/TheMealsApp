import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";
const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product: any) => product.ownerId === "u1"),
};

const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product: any) => product.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (product: any) => product.id !== action.productId
        ),
      };
  }
  return state;
};

export default productReducer;
