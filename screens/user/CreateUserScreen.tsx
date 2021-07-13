import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import InputComponent from "../../components/UI/Input";
import Colors from "../../constants/Colors";

import { useDispatch } from "react-redux";
import * as authAction from "../../reduxStore/actions/auth";

const CreateUserScreen = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [secondPass, setSecondPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const validatePassword = async () => {
    if (password !== secondPass) {
      Alert.alert("Ooops", "Password and confirm password mismatch", [
        { text: "Okay" },
      ]);
      return;
    }
    setIsLoading(true);
    await dispatch(authAction.login(email, password));
    setIsLoading(false);
    props.navigation.goBack();
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.containerText}>
        <InputComponent
          textValue={email}
          setText={setEmail}
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputComponent
          textValue={password}
          setText={setPassWord}
          label="Password"
          keyboardType="default"
          autoCapitalize="none"
        />
        <InputComponent
          textValue={secondPass}
          setText={setSecondPass}
          label="Password"
          keyboardType="default"
          autoCapitalize="none"
        />
      </View>
      {isLoading ? (
        <ActivityIndicator color={Colors.primary} size="large" />
      ) : (
        <Button
          title="Create User"
          color={Colors.primary}
          onPress={() => {
            validatePassword();
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  containerText: {
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
});
export default CreateUserScreen;
