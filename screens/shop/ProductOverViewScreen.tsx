import React from "react";
import { FlatList, StyleSheet } from "react-native";

import ProductOverViewComponent from "../../components/shop/ProductOverViewComponent";
import { useSelector, useDispatch } from "react-redux";
import * as cartActios from "../../reduxStore/actions/cart";

const ProductOverViewScreen = (props: any) => {
  const products = useSelector(
    (state: any) => state.products.availableProducts
  );
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductOverViewComponent
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onViewDetail={() => {
            props.navigation.navigate({
              name: "ProductDetail",
              params: {
                productId: itemData.item.id,
                title: itemData.item.title,
              },
            });
          }}
          onAddToCart={() => {
            dispatch(cartActios.addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductOverViewScreen;
