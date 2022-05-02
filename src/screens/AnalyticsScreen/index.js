import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryTheme } from "victory-native";
import { useRecoilValue } from "recoil";
import { LineChart } from "react-native-wagmi-charts";
import SwitchSelector from "react-native-switch-selector";
import {
  getDailyTotalBalance,
  getHourlyTotalBalance,
  getIndividualBalances,
} from "../../atoms/Portfolios";

const options = [
  { label: "24h", value: { type: "hourly", frame: "day" } },
  { label: "7d", value: { type: "daily", frame: "week" } },
  { label: "30d", value: { type: "daily", frame: "month" } },
  { label: "3m", value: { type: "daily", frame: "3month" } },
  { label: "1y", value: { type: "daily", frame: "year" } },
];

export default function AnalyticsScreen() {
  const [timeFrame, setTimeFrame] = useState({ type: "hourly", frame: "day" });
  const [chartData, setChartData] = useState([]);
  const individualBalances = useRecoilValue(getIndividualBalances);
  const hourlyDatas = useRecoilValue(getHourlyTotalBalance);
  const dailyDatas = useRecoilValue(getDailyTotalBalance);

  useEffect(() => {
    if (timeFrame.type === "hourly") {
      setChartData(hourlyDatas);
    } else if (timeFrame.type === "daily") {
      if (timeFrame.frame === "week") {
        setChartData(dailyDatas.slice(-7));
      } else if (timeFrame.frame === "month") {
        setChartData(dailyDatas.slice(-30));
      } else if (timeFrame.frame === "3month") {
        setChartData(dailyDatas.slice(-90));
      } else if (timeFrame.frame === "year") {
        setChartData(dailyDatas.slice(-365));
      }
    }
  }, [timeFrame]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pieContainer}>
        <Text style={styles.title}>Your current holdings</Text>
        <VictoryPie
          height={300}
          theme={VictoryTheme.material}
          data={[
            { x: "Bitcoin", y: individualBalances.bitcoin || 1 },
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

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Historical balances</Text>

        <SwitchSelector
          options={options}
          initial={0}
          onPress={(value) => setTimeFrame(value)}
        />
        {chartData.length > 0 && (
          <LineChart.Provider data={chartData}>
            <LineChart height={200}>
              <LineChart.Path>
                <LineChart.Gradient />
              </LineChart.Path>
            </LineChart>
          </LineChart.Provider>
        )}
      </View>
    </ScrollView>
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
  chartContainer: {
    marginTop: 50,
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
