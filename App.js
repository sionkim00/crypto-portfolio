import "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./src/navigator/BottomTabs";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
