import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import ProductsStack from "./navigation/ShopNavigator";

import productReducer from "./reduxStore/reducer/products";

const rootReducer = combineReducers({
  products: productReducer,
});
const store = createStore(rootReducer);

export default function App() {
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
