// app/contact.js
import { FlatList, View, Text, Pressable, Alert } from "react-native";
import { Link, router } from "expo-router";
import { globalStyles } from "../../styles/gobalStyles";
import { useUser } from "../../context/UserContext";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export default function MybooksPage() {
  const [myBooks, setMyBooks] = useState([]);
  const { user, logout } = useUser();
  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        try {
          const response = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/users/${user.id}/rentals`
          );
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setMyBooks(data);
          } else {
            console.log(data);
            setMyBooks([]);
          }
        } catch (error) {
          console.log(error);
        } finally {
        }
      }
      console.log("useFocusEffect called");
      if (user) {
        loadData();
      }
    }, [])
  );

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={globalStyles.paragraph}>{item.title}</Text>
        <Text style={globalStyles.paragraph}>{item.rentalDate}</Text>
        <Pressable
          onPress={() => {
            returnBook(item.bookId, item.copyId);
          }}
          style={globalStyles.button}
        >
          <Text>Return Book</Text>
        </Pressable>
      </View>
    );
  };

  async function returnBook(bookId, copyId) {
    console.log(copyId);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/books/${bookId}/rent`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            copyId: copyId,
          }),
        }
      );
      if (response.ok) {
        Alert.alert("You successfully returned this book");
      } else {
        console.log("something went wrong");
        const errorMessage = await response.json();
        console.log(errorMessage);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <View>
        <Text style={globalStyles.paragraph}>
          User: {user ? user.name + " " + user.id : "Not logged in"}
        </Text>
        <Text style={globalStyles.heading}> My rented Books </Text>
        <FlatList
          data={myBooks}
          renderItem={renderItem}
          keyExtractor={(item) => item.copyId}
        />

        <Pressable
          onPress={() => {
            logout();
          }}
          title="Logout"
          style={globalStyles.button}
        >
          <Text>Logout</Text>
        </Pressable>
      </View>
    </>
  );
}
