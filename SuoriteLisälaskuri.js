import {
  setStatusBarNetworkActivityIndicatorVisible,
  StatusBar,
} from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import * as SQLite from "expo-sqlite";
import DateTimePicker from "@react-native-community/datetimepicker";

const db = SQLite.openDatabase("suorite.db");

export default function SuoriteLisälaskuri() {
  const [A, setA] = React.useState("");
  const [suorite, setSuorite] = useState(0);
  const [data, setData] = useState([]);
  const [pvm, setPvm] = useState([]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
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
      width: 400,
      padding: "10%",
    },
    inputbar: {
      alignItems: "center",
      alignContent: "center",
      width: "100%",
      marginTop: "20%",
      padding: "1%",
    },
    box: {
      backgroundColor: "#ffffff",
      alignItems: "center",
      alignContent: "center",
      width: 300,
      marginTop: "18%",
    },

    listcontainer: {
      flexDirection: "row",
      backgroundColor: "white",
    },
    button: {
      
      width: 200,
       paddingVertical: 8,
       paddingHorizontal: 24,
       borderRadius: 4,
       elevation: 3,
       backgroundColor: 'lightblue',
     },
     text: {
       fontSize: 16,
       lineHeight: 21,
       fontWeight: 'bold',
       letterSpacing: 0.25,
       color: '#4d4b49',
     },
  });

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists suorite (id integer primary key not null, suorite int, pvm date);"
      );
    });
    updateList();
  }, []);

  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from suorite;", [], (_, { rows }) =>
        setData(rows._array)
      );
    });
  };

  const Laske = () => {
    Suoritelisälasku();
  };

  const Suoritelisälasku = () => {
    if (A <= 1) {
      setSuorite(20);
    } else if (A <= 2) {
      setSuorite(30);
    } else if (A <= 3) {
      setSuorite(35);
    } else if (A <= 4) {
      setSuorite(55);
    } else if (A <= 5) {
      setSuorite(70);
    } else if (A <= 6) {
      setSuorite(85);
    } else if (A <= 7) {
      setSuorite(100);
      //setData([...data,{key: suorite}])
    } else {
      Alert.alert("Error", "Syötä numerot");
    }
  };

  const Tallenna = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into suorite (suorite, pvm) values (?, ?);", [
          suorite,
          new Date().getDate() +
            "." +
            parseInt(new Date().getMonth() + 1) +
            "." +
            new Date().getFullYear(),
        ]);
      },
      null,
      updateList
    );
  };
  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from suorite where id = ?;`, [id]);
      },
      null,
      updateList
    );
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff99",
        }}
      />
    );
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const showTimepicker = () => {
    showMode("time");
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.input}>
            <View style={styles.inputbar}>
              <Input
                placeholder="Laskurin aika"
                style={styles}
                onChangeText={(A) => setA(A)}
                value={A}
              />
            </View>
          
             <Pressable style={styles.button} onPress={Laske}>
      <Text style={styles.text}>Laske suoriteaste</Text>
    </Pressable>  
            <Text>
              {"\n"}Suoriteasteesi on tänään: {suorite}{"\n"}
            </Text>
            <Text>
              {"\n"}
            </Text>
            <Pressable style={styles.button} onPress={Tallenna}>
      <Text style={styles.text}>Tallenna suorite</Text>
    </Pressable>  
            <Text style={{ marginTop: 30, fontSize: 20 }}>
              Suoritteet:{"\n"}
            </Text>
            <FlatList
              initialNumToRender={5}
              style={{ marginLeft: "0%" }}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.listcontainer}>
                  <Text style={{ fontSize: 18 }}>
                    {item.suorite} Pvm: {item.pvm}
                  </Text>
                  <Text
                    style={{ fontSize: 18, color: "#0000ff" }}
                    onPress={() => deleteItem(item.id)}
                  >
                    {" "}
                    Poista
                  </Text>
                </View>
              )}
              data={data}
              ItemSeparatorComponent={listSeparator}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

/*  <Text>Käytetty aika:</Text>
<TextInput
style={styles.input}
keyboardType="numeric"
style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
onChangeText={(B) => setB(B)}
value={String(B)}
/> */
