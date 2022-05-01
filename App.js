import "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./src/navigator/BottomTabs";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <View style={styles.container}>
      <RecoilRoot>
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
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
