export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems: any, totalAmount: any) => {
  // return {
  //   type: ADD_ORDER,
  //   orderData: { items: cartItem, amount: totalAmount },
  // };
  try {
    const data = new Date();
    return async (dispatch: any) => {
      const response = await fetch(
        "https://theshopapp-2071e-default-rtdb.firebaseio.com/orders/u1.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            totalAmount,
            date: data.toISOString(),
          }),
        }
      );
      const resData = await response.json();
      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: resData.name,
          items: cartItems,
          amount: totalAmount,
          date: data,
        },
      });
    };
  } catch (error) {}
};
