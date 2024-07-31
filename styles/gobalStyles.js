import { StyleSheet } from "react-native";
import { COLORS } from "./constants";

export const globalStyles = StyleSheet.create({
  pageContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: COLORS.background,
  },
  paragraph: {
    fontSize: 18,
    color: COLORS.text,
  },
  heading: {
    fontSize: 32,
    color: COLORS.primary,
  },
  buttonContainer: {
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 20,
  },
  button: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
