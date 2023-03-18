import {
  StyleSheet
} from "react-native";

export const authPageStyles = StyleSheet.create({
  parent: {
    width: "100%",
    height: "100%",
    backgroundColor: "#add8e6",
    margin: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontStyle: "italic",
    textAlign: "center",
  },
  btn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#3a9fbf",
  },
  btnText: {
    fontWeight: "bold",
  }
});