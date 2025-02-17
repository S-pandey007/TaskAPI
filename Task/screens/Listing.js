import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
  Pressable,
  Modal,
} from "react-native";
import React from "react";
import styles from "../style/ListingStyle";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getDocs, doc, where, query, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next"; // Import translation hook
import i18n from "../i18n";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from '@expo/vector-icons/Entypo';
const Listing = ({ setIsLogged }) => {
  const navigation = useNavigation();
  const [langModal, setLangModal] = useState(false);
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [image, setImage] = useState([]);
  const [userData, setUserData] = useState();
  const fetchPosts = async (newPage = 1, isRefreshing = false) => {
    if (loading) return;
    setLoading(true);
    setRefreshing(isRefreshing);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${newPage}`
      );
      const data = await response.json();
      setPosts((prevPosts) => (isRefreshing ? data : [...prevPosts, ...data]));
      setPage(newPage);
      // console.log("posts", data.map(post => post.id));

      for (const post of data) {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/photos/${post.id}`
        );

        const img = await res.json();
        const imageArray = Array.isArray(img) ? img : [img];
        setImage((prevImages) => [...prevImages, ...imageArray]);
      }
      // console.log("image",image.map(img => img.thumbnailUrl));
    } catch (error) {
      console.log("error fetching posts :", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts(1, true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      // console.log("Current User:", currentUser);
      const userEmail = await AsyncStorage.getItem("userEmail");

      const usersRef = collection(db, "TaskUsers");
      const q = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        // console.log("User Data:", userData);
        setUserData(userData);
      } else {
        console.log("User not found");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("userId");
      const userEmail = await AsyncStorage.getItem("userEmail");
      const userId = await AsyncStorage.getItem("userId");
      console.log("User logged out:", userEmail);
      console.log("User ID:", userId);
      navigation.navigate("Login");
      setIsLogged(false);
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  // Function to change language dynamically
  const changeLanguage = async (lang) => {
    i18n.changeLanguage(lang); // Change language in i18n
    await AsyncStorage.setItem("appLanguage", lang); // Store selected language
    setLangModal(false);
  };
  return (
    <View style={styles.container}>
      {/* floating header  */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {t("welcome")}!<Text style={styles.highlight}> {userData?.name}</Text>
        </Text>

        <Pressable onPress={handleLogout} style={styles.logoutContainer}>
          <Text style={styles.logout}>{t("logout")}</Text>
        </Pressable>
      </View>

      {/* Language Switcher */}
      <Pressable
        onPress={() => setLangModal(true)}
        style={styles.languageSwitcher}
      >
        <FontAwesome name="language" size={44} color="black" />
      </Pressable>
      
      {/* Language Modal */}
      <Modal visible={langModal} animationType="slide" transparent={true}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
        <Entypo onPress={()=>setLangModal(false)} name="circle-with-cross"  style={{paddingBottom:6}} size={34} color="black" />
            <Text style={styles.modalTitle}>{t("chooseLanguage")}</Text>
            <View style={styles.logoutContainer}>
        <Pressable onPress={() => changeLanguage("en")}>
          <Text style={styles.languageOption}>🇺🇸 English</Text>
        </Pressable>
        <Pressable onPress={() => changeLanguage("hi")}>
          <Text style={styles.languageOption}>🇮🇳 हिन्दी</Text>
        </Pressable>
        <Pressable onPress={() => changeLanguage("mr")}>
          <Text style={styles.languageOption}>🇮🇳 मराठी</Text>
        </Pressable>
      </View>
        </View>
      </View>
      </Modal>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => {
          const selectedImage = image.find((img) => img.id === item.id);
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", { id: item.id })}
              style={styles.card}
            >
              {image.map((img) => img).includes(item.id) ? (
                <Image
                  source={{ uri: selectedImage.thumbnailUrl }}
                  style={{ width: 200, height: 200, borderRadius: 25 }}
                />
              ) : null}
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body} numberOfLines={2}>
                  {item.body}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        onEndReached={() => {
          if (!loading) {
            fetchPosts(page + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="#333" />
        }
      />
    </View>
  );
};

export default Listing;
