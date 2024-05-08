import React from "react";
import { View, StyleSheet } from "react-native";

const NewTask: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.lightBlue]} />
      <View style={[styles.circle, styles.darkBlue]} />
    </View>
  );
};

export default NewTask;

const styles = StyleSheet.create({
  container: {
    transform: [{ rotate: "-45deg" }],
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 70,
    position: "absolute",
    top: -80,
  },
  lightBlue: {
    backgroundColor: "#50C2C9",
    left: 0,
  },
  darkBlue: {
    backgroundColor: "#8FE1D7",
    opacity: 0.5,
    left: 100,
  },
  lighterBlue: {
    backgroundColor: "lightcyan",
  },
});
