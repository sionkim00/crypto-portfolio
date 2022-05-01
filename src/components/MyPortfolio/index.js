import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import PortfolioPreview from "../PortfolioPreview";

export default function MyPortfolio() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Portfolio</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.previewContainer}
      >
        <PortfolioPreview coinId="bitcoin" />
        <PortfolioPreview coinId="ripple" />
        <PortfolioPreview coinId="solana" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  previewContainer: {
    marginTop: 10,
  },
});
