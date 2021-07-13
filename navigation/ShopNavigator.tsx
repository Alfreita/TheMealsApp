import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { enableScreens } from "react-native-screens";
import ProductOverViewScreen from "../screens/shop/ProductOverViewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import UserProductScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProduct";
import OrderScreen from "../screens/shop/OrdersScreen";
import AuthScreen from "../screens/user/AuthScreen";

import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import CreateUserScreen from "../screens/user/CreateUserScreen";

enableScreens();
const ProductsNavigator = createStackNavigator();
const OrdersNavigator = createStackNavigator();
const UserNavigator = createStackNavigator();
const AuthNavigator = createStackNavigator();
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

const UserStack = () => {
  return (
    <UserNavigator.Navigator
      initialRouteName="ProductOV"
      screenOptions={defaultHeaderStyle}
    >
      <UserNavigator.Screen
        name="UserProduct"
        component={UserProductScreen}
        options={{ title: " Your products" }}
      />
      <UserNavigator.Screen name="EditProduct" component={EditProductScreen} />
    </UserNavigator.Navigator>
  );
};

export const AuthStack = () => {
  return (
    <NavigationContainer>
      <AuthNavigator.Navigator
        initialRouteName="ProductOV"
        screenOptions={defaultHeaderStyle}
      >
        <AuthNavigator.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: "Login" }}
        />
        <AuthNavigator.Screen
          name="CreateUser"
          options={{ title: "Create user" }}
          component={CreateUserScreen}
        />
      </AuthNavigator.Navigator>
    </NavigationContainer>
  );
};
export const DrawerNavigation = () => {
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
        <Drawer.Screen
          name="User"
          component={UserStack}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
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
