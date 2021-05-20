import React from "react";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import { Header } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import still from "./still.png";
import bg from "./bg.jpeg";
import SuoriteLisälaskuri from "./SuoriteLisälaskuri";
import TarrakeraysLaskuri from "./TarrakeraysLaskuri";
import SuoriteKalenteri from "./SuoriteKalenteri";

const Stack = createStackNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "25%",
    marginLeft: "8%",
    marginRight: "8%",
    marginBottom: "40%",
    backgroundColor: "#ffffff99",
    borderRadius: 50,
  },
  image: {
    width: 180,
    height: 180,
  },
  imageLocation: {
    alignItems: "center",
    padding: "10%",
  },
  navibox: {},
  navigation: {
    marginTop: "55%",
    marginLeft: 40,
    marginRight: 40,
    justifyContent: "space-between",
  },
});

function HomeScreen({ navigation }) {
  return (
    <View>
      <ImageBackground
        source={require("./bg.jpeg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View>
          <View style={styles.navigation}>
            <Button
              color="blue"
              title="Suoritelisä laskuri"
              onPress={() => navigation.navigate("Suorite laskuri")}
            />
            <Text> {"\n"}</Text>
            <Button
              color="blue"
              title="Tarrakeräys laskuri"
              onPress={() => navigation.navigate("Tarra laskuri")}
            />
            <Text> {"\n"}</Text>
            <Button
              color="blue"
              title="Keräyskalenteri"
              onPress={() => navigation.navigate("Keräyskalenteri")}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default function Menu() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Etusivu" component={HomeScreen} />
        <Stack.Screen name="Suorite laskuri" component={SuoriteLisälaskuri} />
        <Stack.Screen name="Tarra laskuri" component={TarrakeraysLaskuri} />
        <Stack.Screen name="Keräyskalenteri" component={SuoriteKalenteri} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
