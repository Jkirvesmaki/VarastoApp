import React from "react";
import { ImageBackground, StyleSheet, Text, View, Pressable } from "react-native";
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
  navigation: {
    marginTop: "55%",
    marginLeft: 40,
    marginRight: 40,
    justifyContent: "space-between",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#4d4b49',
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
          <Pressable style={styles.button} onPress={() => navigation.navigate("Suorite laskuri")}>
      <Text style={styles.text}>Suorite laskuri</Text>
    </Pressable>
            <Text> {"\n"}</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate("Tarra laskuri")}>
      <Text style={styles.text}>Tarrakerays Laskuri</Text>
    </Pressable>
           
            <Text> {"\n"}</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate("Keräyskalenteri")}>
      <Text style={styles.text}>Keräyskalenteri</Text>
    </Pressable>
            
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
