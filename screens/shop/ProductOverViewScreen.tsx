import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet, Platform, Button } from "react-native";

import ProductOverViewComponent from "../../components/shop/ProductOverViewComponent";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../reduxStore/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

const ProductOverViewScreen = (props: any) => {
  const products = useSelector(
    (state: any) => state.products.availableProducts
  );
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
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {
              navigation.navigate({
                name: "CartScreen",
                // params: {
                //   productId: itemData.item.id,
                //   title: itemData.item.title,
                // },
              });
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductOverViewComponent
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              props.navigation.navigate({
                name: "ProductDetail",
                params: {
                  productId: itemData.item.id,
                  title: itemData.item.title,
                },
              });
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductOverViewComponent>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductOverViewScreen;
