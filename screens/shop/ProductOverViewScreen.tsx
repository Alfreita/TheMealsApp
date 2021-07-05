import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ProductOverViewScreen = (props: any) => {
  const products = useSelector(
    (state: any) => state.products.availableProducts
  );
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductOverViewScreen;
