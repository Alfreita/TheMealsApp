import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from "../../reduxStore/actions/products";

const EditProductScreen = (props: any) => {
  const id = props.route.params.productId;
  const dispatch = useDispatch();
  const { navigation } = props;
  const addedProduct = useSelector((state: any) =>
    state.products.userProducts.find((prod: any) => prod.id === id)
  );
  const [title, setTitle] = useState(addedProduct ? addedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    addedProduct ? addedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState(addedProduct ? addedProduct.price : "");
  const [description, setDescription] = useState(
    addedProduct ? addedProduct.description : ""
  );

  const submitHandler = () => {
    if (
      title.length <= 0 ||
      imageUrl.length <= 0 ||
      price.length <= 0 ||
      description.length <= 0
    ) {
      Alert.alert("Sorry", "You need to fill every fields", [
        {
          text: "Okay",
          style: "destructive",
        },
      ]);
      return;
    }
    if (addedProduct) {
      dispatch(productAction.updateProduct(id, title, description, imageUrl));
      navigation.goBack();
    } else {
      dispatch(
        productAction.createProduct(title, description, imageUrl, Number(price))
      );
      navigation.goBack();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: id ? "Edit Product" : "Add Product",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={() => submitHandler()}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, title, imageUrl, description, price]);
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
            keyboardType="default"
          />
          {title.length <= 0 ? (
            <Text style={{ color: "red" }}>Fill this field</Text>
          ) : null}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
          {imageUrl.length <= 0 ? (
            <Text style={{ color: "red" }}>Fill this field</Text>
          ) : null}
        </View>
        {!addedProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
              keyboardType="decimal-pad"
            />
            {price.length <= 0 ? (
              <Text style={{ color: "red" }}>Fill this field</Text>
            ) : null}
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          {description.length <= 0 ? (
            <Text style={{ color: "red" }}>Fill this field</Text>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
