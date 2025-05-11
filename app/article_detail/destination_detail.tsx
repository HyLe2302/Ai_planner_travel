import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";

const DestinationDetail = () => {
  const { data } = useLocalSearchParams();
  const router = useRouter();
  const destination = JSON.parse(data as string);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Entypo name="chevron-left" size={30} color="black" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: destination.imageURL }} style={styles.image} />

      <Text style={styles.title}>{destination.city}</Text>
      <Text style={styles.author}>Belong {destination.country}</Text>

      <Text style={styles.content}>
        {destination.test || "No content available. This is placeholder text for the destination content."}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backText: {
    fontSize: 20,
    marginLeft: 5,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
    marginTop:20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },
  author: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});

export default DestinationDetail;