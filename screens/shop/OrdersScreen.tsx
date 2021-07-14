import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  Text,
  FlatList,
  Platform,
  ActivityIndicator,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as orderActions from "../../reduxStore/actions/order";
import Colors from "../../constants/Colors";

const OrderScreen = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state: any) => state.order.orders);
  const { navigation } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="cart"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  if (isLoading) {
    <ActivityIndicator
      size="large"
      color={Colors.primary}
      style={{ justifyContent: "center", alignItems: "center" }}
    />;
  }
  if (orders.length === 0) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>No orders found, maybe starting adding a new one</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.ReadableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export default OrderScreen;
