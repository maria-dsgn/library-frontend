import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { globalStyles } from "../../styles/gobalStyles";
import { COLORS } from "../../styles/constants";
import { useState, useEffect } from "react";
import { Foundation, MaterialIcons } from "@expo/vector-icons";
import { useUser } from "../../context/UserContext";

export default function HomePage() {
  const [name, setName] = useState("");
  const { user, login, logout } = useUser();

  // switch to next site, when user is logged in
  useEffect(() => {
    if (user) {
      router.push("/(books)");
    }
  }, [user]);

  return (
    <>
      <Text style={globalStyles.heading}>
        Welcome to the library App {user ? user.name + " " : null}
      </Text>

      <View style={styles.loginContainer}>
        <Text style={globalStyles.paragraph}>
          Login <MaterialIcons name="login" size={24} color="white" />
        </Text>

        <TextInput
          placeholder="Name"
          autoCapitalize="none"
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
          style={styles.textInput}
        />

        <Pressable
          onPress={() => {
            login(`${name} `);
          }}
          title="Login"
          style={globalStyles.button}
        >
          <Text>Login</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    gap: 10,
    marginTop: 30,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: "100%",
    height: 40,
    borderRadius: 6,
    padding: 8,
    fontSize: 18,
    color: COLORS.background,
    backgroundColor: "white",
  },
});
