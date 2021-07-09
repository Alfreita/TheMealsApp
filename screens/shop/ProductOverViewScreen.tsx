import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  FlatList,
  StyleSheet,
  Platform,
  Button,
  ActivityIndicator,
  View,
  Text,
} from "react-native";

import ProductOverViewComponent from "../../components/shop/ProductOverViewComponent";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../reduxStore/actions/cart";
import * as productsAction from "../../reduxStore/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

const ProductOverViewScreen = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
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
  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(productsAction.fetchProducts());
      setIsLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const willFocusSub = navigation.addListener("willFocus", loadProducts);
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An error ocurred!</Text>
        <Button title="Try Again" onPress={() => loadProducts()} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No product to show, start adding a new one!!</Text>
      </View>
    );
  }
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
