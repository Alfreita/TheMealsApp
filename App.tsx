import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider, useSelector } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import Navigation from "./navigation/ShopNavigator";

import productReducer from "./reduxStore/reducer/products";
import cartReducer from "./reduxStore/reducer/cart";
import orderReducer from "./reduxStore/reducer/order";
import authReducer from "./reduxStore/reducer/auth";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFont = async () => {
  await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoded] = useState(false);
  const [isSignedIn, setIsSignIn] = useState(false);

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
    <Provider store={store}>{Navigation(isSignedIn, setIsSignIn)}</Provider>
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
