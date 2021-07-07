import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";

import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../models/cartItem";
const CartScreen = (props: any) => {
  const cartTotalAmount = useSelector((state: any) => state.cart.totalAmount);
  const cartTotalItems = useSelector((state: any) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems;
  });
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.summaryTextAmount}>
            ${cartTotalAmount.toFixed(2)}
          </Text>
        </Text>
        <Button
          title="Order now"
          onPress={() => {}}
          color={Colors.accent}
          disabled={cartTotalItems.length === 0}
        />
      </View>
      {/* <FlatList/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  summaryTextAmount: {
    color: Colors.primary,
  },
});
export default CartScreen;
