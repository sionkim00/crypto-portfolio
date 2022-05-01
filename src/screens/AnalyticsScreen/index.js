import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { Suspense } from "react";
import {
  VictoryPie,
  VictoryTheme,
  VictoryChart,
  VictoryLine,
} from "victory-native";
import { useRecoilValue } from "recoil";
import {
  getIndividualBalances,
  getThirtyDayBalances,
} from "../../atoms/Portfolios";

export default function AnalyticsScreen() {
  const individualBalances = useRecoilValue(getIndividualBalances);
  const thirtyDayBalances = useRecoilValue(getThirtyDayBalances);
  console.log(thirtyDayBalances);

  return (
    <Suspense
      fallback={
        <View>
          <Text>Loading...</Text>
        </View>
      }
    >
      <ScrollView style={styles.container}>
        <View style={styles.pieContainer}>
          <Text style={styles.title}>Your current holdings</Text>
          <VictoryPie
            height={300}
            theme={VictoryTheme.material}
            data={[
              { x: "Bitcion", y: individualBalances.bitcoin || 1 },
              { x: "Ripple", y: individualBalances.ripple || 1 },
              { x: "Solana", y: individualBalances.solana || 1 },
            ]}
          />
          <View style={styles.holdingsContainer}>
            <Text style={styles.subTitle}>
              Bitcoin: ${individualBalances.bitcoin.toFixed(2)}
            </Text>
            <Text style={styles.subTitle}>
              Rippple: ${individualBalances.ripple.toFixed(2)}
            </Text>
            <Text style={styles.subTitle}>
              Solana: ${individualBalances.solana.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.graphContainer}>
          <VictoryChart theme={VictoryTheme.material} width={350}>
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" },
              }}
              data={thirtyDayBalances}
            />
          </VictoryChart>
        </View>
      </ScrollView>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  pieContainer: {
    marginTop: 10,
  },
  holdingsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  graphContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    color: "grey",
  },
});
