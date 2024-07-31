import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { globalStyles } from "../../styles/gobalStyles";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";
import { Image } from "expo-image";

const API = `${process.env.EXPO_PUBLIC_API_URL}/books`;

// item = book

const renderItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text style={globalStyles.paragraph}>{item.title}</Text>
      <Text style={globalStyles.paragraph}>{item.author}</Text>
      <Image source={item.coverImage} style={styles.image} />
      <Link style={globalStyles.paragraph} href={`${item.id}`}>
        View more details
      </Link>
    </View>
  );
};

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        try {
          const response = await fetch(API);
          const data = await response.json();
          setBooks(data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
      console.log("useFocusEffect called");
      loadData();
    }, [])
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text style={globalStyles.heading}>Find your favorite Book</Text>

        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 20,
    gap: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
});
