import { FlatList,Image, Keyboard, Pressable, StyleSheet,  Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";

interface IDestination {
  id: number;
  city: string;
  country: string;
}

interface IArticle {
  id: number;
  title: string;
  author: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "red",
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
  const navigation: any = useNavigation();

  const [searchInfo, setSearchInfo] = useState("");
  const [destinationList, setDestinationList] = useState<IDestination[]>([
    { id: 1, city: "Tokyo, Tokyo", country: "Japan" },
    { id: 2, city: "London, England", country: "United Kingdom" },
    { id: 3, city: "Paris, Île-de-France", country: "France" },
    { id: 4, city: "New York City, New York", country: "United States" },
    { id: 5, city: "Rome, Lazio", country: "Italy" },
    { id: 6, city: "Bangkok, Bangkok", country: "Thailand" },
    { id: 7, city: "Kuala Lumpur, Kuala Lumpur", country: "Malaysia" },
    { id: 8, city: "Dubai, Dubai", country: "United Arab Emirates" },
    { id: 9, city: "Barcelona, Barcelona", country: "Spain" },
    { id: 10, city: "Madrid, Madrid", country: "Spain" },
    { id: 11, city: "Las Vegas, Nevada", country: "United States" },
    {
      id: 12,
      city: "Singapore, Central Singapore Community Development Council",
      country: "Singapore",
    },
    { id: 13, city: "Lisbon, Lisbon", country: "Portugal" },
    { id: 14, city: "Amsterdam, North Holland", country: "Netherlands" },
    { id: 15, city: "San Francisco, California", country: "United States" },
    { id: 16, city: "Taipei City, Taipei", country: "Taiwan" },
    { id: 17, city: "Budapest, Budapest", country: "Hungary" },
    { id: 18, city: "Orlando, Florida", country: "United States" },
    { id: 19, city: "Milan, Lombardy", country: "Italy" },
    { id: 20, city: "Toronto, Ontario", country: "Canada" },
    { id: 21, city: "Berlin, Berlin", country: "Germany" },
    { id: 22, city: "Los Angeles, California", country: "United States" },
    { id: 23, city: "Prague, Praha, Hlavní Město", country: "Czech Republic" },
    { id: 24, city: "Denpasar, Bali", country: "Indonesia" },
  ]);
  const [articleList, setArticleList] = useState<IArticle[]>([
    {
      id: 1,
      title: "10 Amazing Restaurants in Portland, Oregon",
      author: "Remedy Apps",
    },
    { id: 2, title: "Melbourne's Diverse Food Scene", author: "Remedy Apps" },
    { id: 3, title: "5 Must-See Places in Tokyo", author: "Remedy Apps" },
  ]);

  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <AntDesign
          name="user"
          size={28}
          color="black"
          onPress={() => navigation.navigate("profile")}
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
              onPress={() => navigation.navigate("search")}
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
          keyExtractor={(item) => item.id + ""}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <View style={{ maxWidth: 175, marginRight: 30 }}>
                  <Image
                    style={{
                      width: 175,
                      height: 150,
                      marginBottom: 10,
                      borderRadius: 10,
                    }}
                    source={require('./../../assets/images/login1.jpg')}
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
          keyExtractor={(item) => item.id + ""}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <View style={{ maxWidth: 250, marginRight: 30 }}>
                  <Image
                    style={{
                      width: 250,
                      height: 200,
                      marginBottom: 10,
                      borderRadius: 10,
                    }}
                    source={require('./../../assets/images/login1.jpg')}
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
        />
      </View>
    </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
};

export default DiscoverScreen;
