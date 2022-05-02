import "react-native-reanimated";
import React, { Suspense } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./src/navigator/BottomTabs";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <View style={styles.container}>
      <RecoilRoot>
        <Suspense
          fallback={
            <View>
              <Text>Loading...</Text>
            </View>
          }
        >
          <NavigationContainer>
            <BottomTabs />
          </NavigationContainer>
        </Suspense>
      </RecoilRoot>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
