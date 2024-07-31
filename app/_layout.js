import { StyleSheet, Pressable, View, Text } from "react-native";
import { globalStyles } from "../styles/gobalStyles";
import { Link, router, Slot, Tabs } from "expo-router";
import { COLORS } from "../styles/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { UserProvider } from "../context/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => {
              return <FontAwesome name="home" size={24} color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="(books)"
          options={{
            title: "All Books",
            tabBarIcon: ({ color }) => {
              return <FontAwesome name="book" size={24} color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="(mybooks)"
          options={{
            title: "My Books",
            tabBarIcon: ({ color }) => {
              return (
                <FontAwesome5 name="book-reader" size={24} color={color} />
              );
            },
          }}
        />
      </Tabs>
    </UserProvider>
  );
}
