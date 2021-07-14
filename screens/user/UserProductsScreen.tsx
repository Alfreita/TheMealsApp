import React, { useLayoutEffect, useState } from "react";
import { FlatList, Platform, Button, Alert, Text, View } from "react-native";
import ProductOverViewComponent from "../../components/shop/ProductOverViewComponent";
import { useSelector, useDispatch } from "react-redux";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";
import * as productAction from "../../reduxStore/actions/products";

const UserProductScreen = (props: any) => {
  const userProducts = useSelector((state: any) => state.products.userProducts);
  const { navigation } = props;
  const dispatch = useDispatch();
  const deleteHandler = (id: any) => {
    Alert.alert("Are you shure?", "Do you really want to delete this item?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productAction.deleteProduct(id));
        },
      },
    ]);
  };

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
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => {
              navigation.navigate({
                name: "EditProduct",
                params: {
                  productId: "",
                  title: "",
                },
              });
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);
  if (userProducts.length === 0) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>No products found, maybe starting adding a new one</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductOverViewComponent
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              props.navigation.navigate({
                name: "EditProduct",
                params: {
                  productId: itemData.item.id,
                  title: itemData.item.title,
                },
              });
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductOverViewComponent>
      )}
    />
  );
};
export default UserProductScreen;
