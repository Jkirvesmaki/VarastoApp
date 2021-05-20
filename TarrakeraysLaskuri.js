import {
  setStatusBarNetworkActivityIndicatorVisible,
  StatusBar,
} from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Input, Button } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("suorite.db");

export default function SuoriteLisälaskuri() {
  const [rivit, setRivit] = React.useState("");
  const [paino, setPaino] = React.useState("");
  const [kannat, setKannat] = React.useState("");
  const [result, setResult] = React.useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      alignContent: "center",
    },
    input: {
      backgroundColor: "#ffffff",
      alignItems: "center",
      alignContent: "center",
      width: 300,
      padding: "20%",
    },
    box: {
      backgroundColor: "#ffffff",
      alignItems: "center",
      alignContent: "center",
      width: 300,
      marginTop: "18%",
    },
  });

  const Laske = () => {
    setResult(rivit * paino * kannat);
    return result;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.input}>
            <Input
              placeholder="Rivit"
              style={styles}
              onChangeText={(rivit) => setRivit(rivit)}
              value={rivit}
            />
            <Input
              placeholder="Paino"
              style={styles}
              onChangeText={(paino) => setPaino(paino)}
              value={paino}
            />
            <Input
              placeholder="Kantojen määrä"
              style={styles}
              onChangeText={(kannat) => setKannat(kannat)}
              value={kannat}
            />

            <Button onPress={Laske} title="Laske saatava aika" size="150" />
          </View>
          <Text>Saatava aika:</Text>
          <Text style={{ marginBottom: 25, fontSize: 20 }}>{result}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
