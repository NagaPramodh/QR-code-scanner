import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        title="Scan QR Code"
        onPress={() => navigation.navigate("Scanner")}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
