import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputComponent = (props: any) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        value={props.textValue}
        onChangeText={(text) => props.setText(text)}
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
      />
      {props.textValue <= 0 ? (
        <Text style={{ color: "red" }}>Fill this field</Text>
      ) : null}
    </View>
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

export default InputComponent;
