import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import InputComponent from "../../components/UI/Input";
import Colors from "../../constants/Colors";

import { useDispatch } from "react-redux";
import * as authAction from "../../reduxStore/actions/auth";

const AuthScreen = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setIsAuth = props.route.params.setIsAuth;
  const dispatch = useDispatch();
  const doLogin = async () => {
    try {
      if (email.length <= 0 || password.length <= 0) {
        Alert.alert("Opss", "Please fill all field", [{ text: "Okay" }]);
        return;
      }
      setIsLoading(true);
      await dispatch(authAction.login(email, password));
      setIsLoading(false);
      setIsAuth(true);
    } catch (error) {
      Alert.alert("Opss", error.message, [{ text: "Okay" }]);
      setIsLoading(false);
    }
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
      </View>
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Button
            title="Login"
            color={Colors.primary}
            onPress={() => doLogin()}
          />
        )}
        <Button
          title="Sign up"
          color={Colors.accent}
          onPress={() => {
            props.navigation.navigate({ name: "CreateUser" });
          }}
        />
      </View>
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
export default AuthScreen;
