import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductOverViewScreen from "../screens/shop/ProductOverViewScreen";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
enableScreens();
const ProductsNavigator = createStackNavigator();

const defaultHeaderStyle = () => {
  return {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : "",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    headerTitleStyle: {
      fontWeight: "bold",
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
      </ProductsNavigator.Navigator>
    </NavigationContainer>
  );
};

export default ProductsStack;
