import PRODUCTS from "../../data/dummy-data";
const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product:any) =>product.id === 'u1'),
};

const productReducer = (state = initialState, action: any) => {
  return state;
};

export default productReducer;