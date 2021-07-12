import Order from "../../models/order";
import { ADD_ORDER, SET_ORDERS } from "../actions/order";

const initialState = {
  orders: <any>[],
};

const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};

export default orderReducer;
