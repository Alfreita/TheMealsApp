import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";
const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product: any) => product.ownerId === "u1"),
};

const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.products.filter(
          (prod: any) => prod.ownerId === "u1"
        ),
      };
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
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.availableProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod: any) => prod.id === action.productId
      );
      const updatedProduct = new Product(
        action.productId,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        (prod: any) => prod.id === action.productId
      );
      const updateAvailableProducts = [...state.availableProducts];
      updateAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updateAvailableProducts,
        userProducts: updatedUserProducts,
      };
  }
  return state;
};

export default productReducer;
