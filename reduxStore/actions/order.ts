export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItem: any, totalAmount: any) => {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItem, amount: totalAmount },
  };
};
