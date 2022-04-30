import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import BalanceChange from "../BalanceChange";

export default function TotalBalance() {
  const [balance, setBalance] = useState(5000.12);
  const [changePercentage, setChangePercentage] = useState(-2.4);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Balance</Text>
      <View style={styles.balanceContainer}>
        <BalanceChange changePercentage={changePercentage} balance={9281.13} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  title: {
    fontSize: 18,
    letterSpacing: 0.7,
    color: "grey",
  },
});
