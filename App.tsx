import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import ProductsStack from "./navigation/ShopNavigator";

import productReducer from "./reduxStore/reducer/products";
import cartReducer from "./reduxStore/reducer/cart";
import orderReducer from "./reduxStore/reducer/order";

const rootReducer = combineReducers({
  products: productReducer,
  cart:cartReducer,
  order:orderReducer
});
const store = createStore(rootReducer);

const fetchFont = async () => {
  await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => {
          setFontLoded(true);
        }}
        onError={() => {}}
      />
    );
  }
  return (
    <Provider store={store}>
      <ProductsStack />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
