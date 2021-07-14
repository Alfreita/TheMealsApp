import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  try {
    return async (dispatch: any, getState: any) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const response = await fetch(
        `https://theshopapp-2071e-default-rtdb.firebaseio.com/products.json?auth=${token}`
      );
      if (!response.ok) {
        const error = await response.json();
        // console.log(token);
        throw new Error("something went wrong");
      }
      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    };
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = (productId: any) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    await fetch(
      `https://theshopapp-2071e-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    dispatch({ type: DELETE_PRODUCT, productId: productId });
  };
};
export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
) => {
  try {
    return async (dispatch: any, getState: any) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const response = await fetch(
        `https://theshopapp-2071e-default-rtdb.firebaseio.com/products.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price,
            ownerId: userId,
          }),
        }
      );
      const resData = await response.json();
      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: resData.name,
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        },
      });
    };
  } catch (error) {
    // console.log("erro" + error);
  }
};

export const updateProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string
) => {
  return async (dispatch: any) => {
    await fetch(
      `https://theshopapp-2071e-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    dispatch({
      type: UPDATE_PRODUCT,
      productId: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
