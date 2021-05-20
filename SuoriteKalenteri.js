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
  const [data, setData] = useState([]);
  const [kuukausi, setKuukausi] = useState("");
  const [thisMonth, setThisMonth] = useState(
    parseInt(new Date().getMonth() + 1)
  );
  let [flatListItems, setFlatListItems] = useState([]);

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
      marginTop: "10%",
    },
    monthselector: {
      paddingTop: "10%",
    },
  });

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from suorite where pvm = (?)",
      ["19.5.2021"],
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
    updateList();
    getDate();
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: "100%",
          backgroundColor: "#808080",
        }}
      />
    );
  };

  useEffect(() => {}, []);

  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from suorite where pvm = 19.5.2021",
        [],
        (_, { rows }) => setData(rows._array)
      );
    });
  };

  let listItemView = (item) => {
    return (
      <View key={item.id} style={{ backgroundColor: "white", padding: 5 }}>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "grey",
          }}
        >
          {item.pvm}
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "grey",
          }}
        >
          {item.suorite}
        </Text>
      </View>
    );
  };

  const lastMonth = () => {
    setThisMonth(thisMonth - 1);
    if (thisMonth === 0) setThisMonth(1);
    getDate(thisMonth);
  };

  const nextMonth = () => {
    setThisMonth(thisMonth + 1);
    if (thisMonth === 13) setThisMonth(12);
    getDate(thisMonth);
  };

  const month = () => {
    if (thisMonth <= 10) return thisMonth.substring(3, 3);
    else return thisMonth.substring(3, 4);
  };

  const getDate = () => {
    if (thisMonth === 1) {
      setKuukausi("Tammikuu");
      return kuukausi;
    } else if (thisMonth === 2) {
      setKuukausi("Helmikuu");
      return kuukausi;
    } else if (thisMonth === 3) {
      setKuukausi("Maaliskuu");
      return kuukausi;
    } else if (thisMonth === 4) {
      setKuukausi("Huhtikuu");
      return kuukausi;
    } else if (thisMonth === 5) {
      setKuukausi("Toukokuu");
      return kuukausi;
    } else if (thisMonth === 6) {
      setKuukausi("Kesäkuu");
      return kuukausi;
    } else if (thisMonth === 7) {
      setKuukausi("Heinäkuu");
      return kuukausi;
    } else if (thisMonth === 8) {
      setKuukausi("Elokuu");
      return kuukausi;
    } else if (thisMonth === 9) {
      setKuukausi("Syyskuu");
      return kuukausi;
    } else if (thisMonth === 10) {
      setKuukausi("Lokakuu");
      return kuukausi;
    } else if (thisMonth === 11) {
      setKuukausi("Marraskuu");
      return kuukausi;
    } else if (thisMonth === 12) {
      setKuukausi("Joulukuu");
      return kuukausi;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.monthselector}>
        <Text>
          <Button onPress={lastMonth} title="Edellinen kuukausi" />{" "}
          <Button onPress={nextMonth} title="Seuraava kuukausi" />
        </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.input}>
          <Text>{kuukausi}</Text>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "grey",
          }}
        ></Text>
      </View>
    </View>
  );
}
