import { FlatList, Image, Keyboard, Pressable, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../configs/FireBaseConfig"
import { red } from "react-native-reanimated/lib/typescript/Colors";
import { useRouter } from "expo-router";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
  form: {
    gap: 15,
    marginBottom: 30,
  },
  form_input_icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
  },
  form_input: {
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  description: {
    color: "gray",
    fontWeight: 300,
    marginBottom: 10,
  },
});

const DiscoverScreen = () => {

  const router = useRouter();
  const [searchInfo, setSearchInfo] = useState("");
  const [destinationList, setDestinationList] = useState<any[]>([
    
  ]);
  const [articleList, setArticleList] = useState<any[]>([
   
  ]);

  const [loadingDestination, setLoadingDestination] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(false);

  const getDestinations = async () => {
    setLoadingDestination(true);
    setDestinationList([]);
    const querySnapshot = await getDocs(collection(db, "Destination"));
    querySnapshot.forEach((doc) => {
      setDestinationList((prev) => [...prev, { docID: doc.id, ...doc.data() }]);
    });
    setLoadingDestination(false);
  };

  const getArticles = async () => {
    setLoadingArticle(true);
    setArticleList([]);
    const querySnapshot = await getDocs(collection(db, "Article"));
    querySnapshot.forEach((doc) => {
      setArticleList((prev) => [...prev, { docID: doc.id, ...doc.data() }]);
    });
    setLoadingArticle(false);
  };

  useEffect(() => {
    getDestinations();
    getArticles();
  }, []);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <AntDesign
          name="user"
          size={28}
          color="black"
          onPress={() => router.push('/(tabs)/profile')}
        />
      </View>

      <View style={styles.form}>
        <View>
          <View style={styles.form_input_icon}>
            <AntDesign name="search1" size={24} color="black" />
            <TextInput
              style={styles.form_input}
              value={searchInfo}
              onChangeText={(value) => setSearchInfo(value)}
              placeholder="Search cities..."
              showSoftInputOnFocus={false}
              onPress={() => router.push("/create_trip/search_place")}
            ></TextInput>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <Text style={styles.heading}>Popular Destinations</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={destinationList}
          keyExtractor={(item) => item.docID + ""}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => router.push({
                pathname: "/article_detail/destination_detail",
                params: { 
                  docID: item.docID, 
                  data: JSON.stringify(item) },
              })}>
                <View style={{ maxWidth: 175, marginRight: 30 }}>
                  <Image
                    style={{
                      width: 175,
                      height: 150,
                      marginBottom: 10,
                      borderRadius: 10,
                    }}
                    source={{
                      uri: item.imageURL,
                    }}
                  ></Image>
                  <Text
                    style={{ fontSize: 15, fontWeight: 500 }}
                    numberOfLines={1}
                  >
                    {item.city}
                  </Text>
                  <Text
                    style={{ color: "gray", fontWeight: 300 }}
                    numberOfLines={1}
                  >
                    {item.country}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={loadingDestination}
              onRefresh={getDestinations}
            />
          }
        />
      </View>

      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.heading}>Popular Articles</Text>
          <Text style={styles.description}>View more</Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={articleList}
          keyExtractor={(item) => item.docID + ""}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => router.push({
                  pathname: "/article_detail/article_detail",
                  params: { 
                    docID: item.docID,
                    data: JSON.stringify(item) 
                  },
                })}>
                <View style={{ maxWidth: 250, marginRight: 30 }}>
                  <Image
                    style={{
                      width: 250,
                      height: 200,
                      marginBottom: 10,
                      borderRadius: 10,
                    }}
                    source={{
                      uri: item.imageURL,
                    }}
                  ></Image>
                  <Text
                    style={{ fontSize: 15, fontWeight: 500 }}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{ color: "gray", fontWeight: 300 }}
                    numberOfLines={1}
                  >
                    Written by {item.author}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={loadingArticle}
              onRefresh={getArticles}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default DiscoverScreen;