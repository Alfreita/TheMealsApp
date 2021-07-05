import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ProductOverViewComponent from "../../components/shop/ProductOverViewComponent";

const ProductOverViewScreen = (props: any) => {
  const products = useSelector(
    (state: any) => state.products.availableProducts
  );
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
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductOverViewScreen;
