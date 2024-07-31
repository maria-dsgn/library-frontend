import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

const wait = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadFromAsyncStorage() {
      const userJSON = await AsyncStorage.getItem("user");
      if (userJSON) {
        setUser(JSON.parse(userJSON));
      } else {
        setUser(null);
      }
      setIsReady(true);
    }
    loadFromAsyncStorage();
  }, []);

  useEffect(() => {
    async function writeToAsyncStorage() {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    }
    if (isReady) {
      writeToAsyncStorage();
    }
  }, [user, isReady]);

  async function login(userName) {
    // await wait(1000);
    console.log("userName", userName);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        setUser(data);
      } else {
        console.log("something went wrong");
        const errorMessage = await response.json();
        console.log(errorMessage);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function logout() {
    await wait(1000);
    setUser(null);
  }

  if (!isReady) {
    return null;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
