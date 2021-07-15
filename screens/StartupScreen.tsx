import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as authAction from "../reduxStore/actions/auth";

const StartUpScreen = (props: any) => {
  const dispatch = useDispatch();
  const setIsAuth = props.route.params.setIsAuth;
  useEffect(() => {
    const tryLogin = async () => {
      const user = await AsyncStorage.getItem("@userData");
      if (!user) props.navigation.navigate({ name: "Auth" });
      const transformedUser = JSON.parse(user);
      const { token, userId, expireDate } = transformedUser;
      const expirationDate = new Date(expireDate);

      if (expireDate <= new Date() || !token || !userId) {
        props.navigation.navigate({ name: "Auth" });
        return;
      }
      const expireTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authAction.authenticate(userId, token, expireTime));
      setIsAuth(true);
    };
    tryLogin();
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default StartUpScreen;
