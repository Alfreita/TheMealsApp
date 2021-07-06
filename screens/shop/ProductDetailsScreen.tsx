import React, { useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  Image,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
const ProductDetailsScreen = (props: any) => {
  const id = props.route.params.productId;
  const title = props.route.params.title;

  const selectProduct = useSelector((state: any) =>
    state.products.availableProducts.find((prod: any) => prod.id === id)
  );
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: title === "" ? "No title" : title,
    });
  }, [title]);
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectProduct.imageUrl }} />
      <View style={styles.buttonView}>
        <Button color={Colors.primary} title="Add to Cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>{selectProduct.price.toFixed(2)}$</Text>
      <Text style={styles.description}>{selectProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  buttonView: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
});

export default ProductDetailsScreen;
