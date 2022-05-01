import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPortfolioScreen from "../screens/AddPortfolioScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddPortfolioScreen" component={AddPortfolioScreen} />
    </Stack.Navigator>
  );
}
