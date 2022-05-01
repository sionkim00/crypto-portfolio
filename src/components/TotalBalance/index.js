import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
  getTotalBalance,
  getTotalBalanceDailyChange,
  portfolioValueState,
} from "../../atoms/Portfolios";
import BalanceChange from "../BalanceChange";

export default function TotalBalance() {
  const [balance, setBalance] = useState(0);
  const portfolioValue = useRecoilValue(portfolioValueState);
  const totalBalance = useRecoilValue(getTotalBalance);
  const totalBalanceDailyChange = useRecoilValue(getTotalBalanceDailyChange);

  useEffect(() => {
    setBalance(totalBalance);
  }, [portfolioValue]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Balance</Text>
      <View style={styles.balanceContainer}>
        <BalanceChange
          changePercentage={totalBalanceDailyChange}
          balance={balance}
        />
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
