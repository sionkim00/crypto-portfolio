import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function BalanceChange({ changePercentage, balance }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text style={styles.symbolText}>$</Text>
        <Text style={styles.balanceText}>{balance}</Text>
      </View>
      <View
        style={{
          ...styles.percentageContainer,
          backgroundColor: changePercentage >= 0 ? "#59b370" : "#f24f4f",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {changePercentage >= 0 ? (
            <Ionicons name="trending-up" size={20} color="white" />
          ) : (
            <Ionicons name="trending-down" size={20} color="white" />
          )}
          <Text style={styles.percentageChangeText}>
            {changePercentage.toFixed(1)}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  symbolText: {
    fontSize: 25,
    color: "grey",
  },
  balanceText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  percentageContainer: {
    backgroundColor: "#59b370",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 15,
  },
  percentageChangeText: {
    fontWeight: "600",
    letterSpacing: 1,
    marginLeft: 5,
    color: "white",
  },
});
