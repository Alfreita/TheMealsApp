import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import * as cartActions from "../../reduxStore/actions/cart";
import * as ordersAction from "../../reduxStore/actions/order";

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
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispacth = useDispatch();
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.summaryTextAmount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          title="Order now"
          onPress={() => {
            dispacth(ordersAction.addOrder(cartTotalItems, cartTotalAmount));
          }}
          color={Colors.accent}
          disabled={cartTotalItems.length === 0}
        />
      </View>
      <FlatList
        data={cartTotalItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispacth(cartActions.removeFromCart(itemData.item.productId));
            }}
            deletable
          />
        )}
      />
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
