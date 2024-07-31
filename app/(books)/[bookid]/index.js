import { View, Text, StyleSheet, Pressable, Modal, Alert } from "react-native";
import { globalStyles } from "../../../styles/gobalStyles";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { Image } from "expo-image";
import { useState, useCallback } from "react";
import { useUser } from "../../../context/UserContext";

const API = `${process.env.EXPO_PUBLIC_API_URL}/books`;

export default function BooksDetailsPage() {
  const { user } = useUser();
  const [foundBook, setFoundBook] = useState(null);
  const { bookid } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const addToCart = async () => {
    if (!user) {
      Alert.alert("You must be logged in to rent this book!");
    }
  };

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        try {
          const response = await fetch(API + "/" + bookid);
          const data = await response.json();
          console.log(data);
          setFoundBook(data);
        } catch (error) {
          console.log(error);
        } finally {
          // setIsLoading(false);
        }
      }

      if (bookid) {
        console.log("get new bookdetails");
        loadData();
      }
    }, [bookid])
  );

  if (!foundBook) {
    return (
      <>
        <Text style={globalStyles.paragraph}>Book not found </Text>
      </>
    );
  }

  async function rentBook() {
    console.log(user.id);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/books/${foundBook.id}/rent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
          }),
        }
      );
      if (response.ok) {
        Alert.alert("You successfully rent this book");
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
    <View style={globalStyles.pageContainer}>
      <View style={styles.detailContainer}>
        <Text style={globalStyles.heading}>{foundBook.title}</Text>
        <Text style={globalStyles.paragraph}>{foundBook.author}</Text>

        <View style={styles.imageContainer}>
          <Image source={foundBook.coverImage} style={styles.image} />
        </View>
        <Text style={globalStyles.paragraph}>
          Available for rent: {foundBook.copiesInStock} /{foundBook.totalCopies}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={globalStyles.button}
      >
        <Text>Rent</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Do you want to rent this book?</Text>
          <View style={styles.modalButtons}>
            <Pressable
              style={[globalStyles.button, { width: "50%" }]}
              onPress={() => {
                setModalVisible(false);
                rentBook();
                // sendSelectedBooks(selectedBooks);
              }}
            >
              <Text>Yes</Text>
            </Pressable>
            <Pressable
              style={[globalStyles.button, { width: "50%" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text>No</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  detailContainer: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 5,
  },
});
