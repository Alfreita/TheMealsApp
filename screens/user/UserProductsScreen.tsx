import React, { useLayoutEffect } from "react";
import { FlatList, Platform } from "react-native";
import ProductOverViewComponent from "../../components/shop/ProductOverViewComponent";
import { useSelector } from "react-redux";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Button } from "react-native";
import Colors from "../../constants/Colors";

const UserProductScreen = (props: any) => {
  const userProducts = useSelector((state: any) => state.products.userProducts);
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
                name: "ProductDetail",
                params: {
                  productId: itemData.item.id,
                  title: itemData.item.title,
                },
              });
            }}
          />
          <Button color={Colors.primary} title="Delete" onPress={() => {}} />
        </ProductOverViewComponent>
      )}
    />
  );
};
export default UserProductScreen;
