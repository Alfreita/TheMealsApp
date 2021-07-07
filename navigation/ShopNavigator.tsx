import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { enableScreens } from "react-native-screens";
import ProductOverViewScreen from "../screens/shop/ProductOverViewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import OrderScreen from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";

enableScreens();
const ProductsNavigator = createStackNavigator();
const OrdersNavigator = createStackNavigator();
const Drawer = createDrawerNavigator();

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
    <ProductsNavigator.Navigator
      initialRouteName="ProductOV"
      screenOptions={defaultHeaderStyle}
    >
      <ProductsNavigator.Screen
        name="ProductOV"
        component={ProductOverViewScreen}
        options={{ title: "All Products" }}
      />
      <ProductsNavigator.Screen
        name="ProductDetail"
        component={ProductDetailsScreen}
      />
      <ProductsNavigator.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ title: " Your cart" }}
      />
    </ProductsNavigator.Navigator>
  );
};

const OrdersStack = () => {
  return (
    <OrdersNavigator.Navigator
      initialRouteName="ProductOV"
      screenOptions={defaultHeaderStyle}
    >
      <OrdersNavigator.Screen name="Orders" component={OrderScreen} />
    </OrdersNavigator.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Products"
        drawerContentOptions={{
          activeTintColor: Colors.primary,
          labelStyle: {
            fontFamily: "open-sans-bold",
          },
        }}
      >
        <Drawer.Screen
          name="Products"
          component={ProductsStack}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={focused ? Colors.primary : "gray"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={OrdersStack}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={focused ? Colors.primary : "gray"}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
