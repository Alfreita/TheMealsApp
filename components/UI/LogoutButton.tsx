import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Text, Platform, View, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LogoutButton = (props: any) => {
  const doLogout = async () => {
    Alert.alert("Logout", "Logout done", [
      {
        text: "Okay",
        style: "destructive",
      },
    ]);
    await AsyncStorage.clear();
    props.setAuth(false);
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={({ focused, size }) => (
          <View style={styles.view}>
            <Ionicons
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={23}
              color={focused ? Colors.primary : "gray"}
            />
            <Text style={styles.text}>Logout</Text>
          </View>
        )}
        onPress={() => doLogout()}
      />
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },

  text: {
    marginLeft: 30,
    fontFamily: "open-sans-bold",
    color: "gray",
    fontSize: 15,
    marginBottom: 15,
  },
});
export default LogoutButton;
