import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import ProductOverViewScreen from "../screens/shop/ProductOverViewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";

enableScreens();
const ProductsNavigator = createStackNavigator();

const defaultHeaderStyle = () => {
  return {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : "",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
  };
};
const ProductsStack = () => {
  return (
    <NavigationContainer>
      <ProductsNavigator.Navigator
        initialRouteName="ProductOV"
        screenOptions={defaultHeaderStyle}
      >
        <ProductsNavigator.Screen
          name="ProductOV"
          component={ProductOverViewScreen}
          options={{ title: "Product OverView" }}
        />
        <ProductsNavigator.Screen
          name="ProductDetail"
          component={ProductDetailsScreen}
        />
        <ProductsNavigator.Screen name="CartScreen" component={CartScreen} />
      </ProductsNavigator.Navigator>
    </NavigationContainer>
  );
};

export default ProductsStack;
