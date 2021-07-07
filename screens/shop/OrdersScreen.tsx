import React, { useLayoutEffect } from "react";
import { Text, FlatList, Platform } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrderScreen = (props: any) => {
  const orders = useSelector((state: any) => state.order.orders);
  const { navigation } = props;
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
