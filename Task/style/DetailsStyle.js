import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  animation: {
    width: 250,
    height: 250,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    left:20
  },
  image: {
    width: 500,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,

    color: "#666",
    marginBottom: 20,
  },
});
export default styles;
