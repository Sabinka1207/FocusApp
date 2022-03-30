import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

export const RoundedBtn = ({ name, onPress, size }) => {
  return (
    <TouchableOpacity
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
      }}
      onPress={onPress}
    >
      <Text style={{ color: "white", fontSize: 15 }}>{name}</Text>
    </TouchableOpacity>
  );
};
