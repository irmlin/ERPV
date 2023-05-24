import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { fetchUserJSON } from '../data/DBUserData';

const { width, height } = Dimensions.get("window");
const fontScale = Math.min(width, height) / 400;

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 0.8 * width,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  even_row: {
    backgroundColor: "#fff",
  },
  uneven_row: {
    backgroundColor: "#C2C6D5",
  },
  first_row: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  last_row: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  label: {
    fontSize: 14 * fontScale,
    fontWeight: "bold",
    color: "#555",
    marginRight: 10,
    minWidth: 100,
    flexWrap: "wrap",
  },
  value: {
    fontSize: 14 * fontScale,
    flex: 1,
    textAlign: "right",
    color: "#747272",
    fontWeight: "bold",
  },
});

export default function StatsTable() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
      // Fetch the user data from the API
      fetchUserJSON()
        .then(data => setUserData(data))
        .catch(error => console.error(error));
      console.log(userData)
  }, []);

  return (
    <View style={styles.rowContainer}>
      <View style={styles.container}>
      <View style={[styles.row, styles.uneven_row, styles.first_row]}>
          <Text style={styles.label}>Vartotojo vardas:</Text>
          <Text style={styles.value}>{ userData['username'] }</Text>
        </View>
        <View style={[styles.row, styles.even_row]}>
          <Text style={styles.label}>Surinktų taškų skaičius:</Text>
          <Text style={styles.value}>{ userData['totalAmountOfPoints'] }</Text>
        </View>
        <View style={[styles.row, styles.uneven_row]}>
          <Text style={styles.label}>Atsakytų klausimų kiekis:</Text>
          <Text style={styles.value}>{ userData['amountOfQuestions'] }</Text>
        </View>
        <View style={[styles.row, styles.even_row]}>
          <Text style={styles.label}>Teisingai atsakyti klausimai:</Text>
          <Text style={styles.value}>{ userData['correctAnswers'] }</Text>
        </View>
        <View style={[styles.row, styles.uneven_row]}>
          <Text style={styles.label}>Neteisingai atsakyti klausimai: </Text>
          <Text style={styles.value}>{ userData['amountOfQuestions'] - userData['correctAnswers'] }</Text>
        </View>
        {/* <View style={[styles.row, styles.uneven_row]}>
          <Text style={styles.label}>Nuskenuota plastiko:</Text>
          <Text style={styles.value}>{ userData['scannedPlastic'] }</Text>
        </View>
        <View style={[styles.row, styles.even_row]}>
          <Text style={styles.label}>Nuskenuota popieriaus:</Text>
          <Text style={styles.value}>{ userData['scannedPaper'] }</Text>
        </View>
        <View style={[styles.row, styles.uneven_row]}>
          <Text style={styles.label}>Nuskenuota stiklo:</Text>
          <Text style={styles.value}>{ userData['scannedGlass'] }</Text>
        </View>
        <View style={[styles.row, styles.even_row, styles.last_row]}>
          <Text style={styles.label}>Avatarų kiekis:</Text>
          <Text style={styles.value}>{ userData['amountOfAvatars'] }</Text>
        </View> */}
      </View>
    </View>
  );
};
