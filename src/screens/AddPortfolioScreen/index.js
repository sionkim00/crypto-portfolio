import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { portfolioValueState } from "../../atoms/Portfolios";

export default function AddPortfolioScreen() {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [amount, setAmount] = useState(""); // String type
  const [portfolioValue, setPortfolioValue] =
    useRecoilState(portfolioValueState);
  const navigation = useNavigation();

  const onAddPress = () => {
    if (!amount || !selectedCoin) return; //Safeguard
    setPortfolioValue({
      ...portfolioValue,
      [selectedCoin]: portfolioValue[selectedCoin] + parseFloat(amount),
    });
    navigation.navigate("HomeScreen");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Portfolio</Text>
      <Text style={styles.subTitle}>1. Choose a coin to add</Text>

      <Picker
        selectedValue={selectedCoin}
        onValueChange={(itemValue) => setSelectedCoin(itemValue)}
        itemStyle={{ fontSize: 15 }}
      >
        <Picker.Item label="Bitcoin" value="bitcoin" />
        <Picker.Item label="Ripple" value="ripple" />
        <Picker.Item label="Solana" value="solana" />
      </Picker>

      <Text style={styles.subTitle}>2. Enter amount</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="example: 1.57"
        numberOfLines={1}
        maxLength={7}
        value={amount}
        onChangeText={(text) => setAmount(text)}
        style={styles.amountInput}
      />

      <TouchableOpacity
        style={{
          ...styles.addContainer,
          backgroundColor: amount <= 0 ? "grey" : "#01050d",
        }}
        disabled={amount <= 0}
        onPress={onAddPress}
      >
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  subTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "500",
  },
  amountInput: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
  },
  addContainer: {
    marginTop: 10,
    marginHorizontal: 30,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
