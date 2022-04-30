import { Image, StyleSheet, View } from "react-native";
import React from "react";
import TotalBalance from "../../components/TotalBalance";
import MyPortfolio from "../../components/MyPortfolio";

export default function HomeScreen() {
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
});
