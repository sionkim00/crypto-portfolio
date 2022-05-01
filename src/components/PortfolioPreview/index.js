import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import React from "react";
import useSWR from "swr";
import { Ionicons } from "@expo/vector-icons";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function PortfolioPreview({ coinId }) {
  // Get current data
  const coinDataURL = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`;
  const {
    data: coinData,
    error: coinError,
    isLoading: coinIsLoading,
  } = useSWR(coinDataURL, fetcher);

  if (coinIsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (coinError) {
    return (
      <View style={styles.container}>
        <Text>Failed to load data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: coinData?.image.small }}
            style={styles.thumbnailImage}
          />
        </View>
        <View>
          <Text style={styles.symbolText}>
            {coinData?.symbol.toUpperCase()}
          </Text>
          <Text style={styles.coinText}>{coinData?.name}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text style={{ fontWeight: "bold" }}>
            ${coinData?.market_data.current_price.usd.toFixed(2)}
          </Text>
        </View>
        <View style={styles.percentageContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {coinData?.market_data.price_change_percentage_24h >= 0 ? (
              <Ionicons name="trending-up" size={20} color="#59b370" />
            ) : (
              <Ionicons name="trending-down" size={20} color="#f24f4f" />
            )}
            <Text
              style={{
                ...styles.percentageChangeText,
                color:
                  coinData?.market_data.price_change_percentage_24h >= 0
                    ? "#59b370"
                    : "#f24f4f",
              }}
            >
              {coinData?.market_data.price_change_percentage_24h.toFixed(1)}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 130,
    padding: 15,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginRight: 30,
    justifyContent: "center",
  },
  symbolText: {
    fontSize: 15,
    fontWeight: "700",
  },
  coinText: {
    fontSize: 13,
    fontWeight: "500",
    color: "grey",
    letterSpacing: 0.6,
  },
  thumbnailImage: {
    width: 20,
    height: 20,
  },
  thumbnailContainer: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: "#f4f4f4",
    marginRight: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  percentageChangeText: {
    fontWeight: "bold",
    letterSpacing: 1,
    marginLeft: 5,
  },
});
