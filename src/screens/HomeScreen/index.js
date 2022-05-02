import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import TotalBalance from "../../components/TotalBalance";
import MyPortfolio from "../../components/MyPortfolio";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/elon.jpeg")}
        style={styles.profileImage}
      />
      {/* Total balance */}
      <View style={styles.totalContainer}>
        <TotalBalance />
      </View>
      {/* My Portfolio */}
      <View style={styles.myPortfolioContainer}>
        <MyPortfolio />
      </View>

      <TouchableOpacity
        style={styles.addContainer}
        onPress={() => navigation.navigate("AddPortfolioScreen")}
      >
        <Text style={styles.add}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#eee",
  },
  profileImage: {
    aspectRatio: 1,
    marginTop: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#179e0e",
  },
  totalContainer: {
    marginTop: 30,
  },
  myPortfolioContainer: {
    marginTop: 40,
  },
  addContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 40,
  },
  add: {
    color: "white",
    fontSize: 40,
  },
});
