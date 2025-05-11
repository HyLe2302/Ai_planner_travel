import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { GetGeoCoordinates, GetPhotoRef } from "./../../configs/GooglePlaceAPI";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  control: {
    minWidth: 30,
    maxWidth: 100,
    // marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
  },
});

export default function PlaceCard({
  activity,
  index,
}: {
  activity: any;
  index: any;
}) {
//   const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const [photoRef, setPhotoRef] = useState<any>();
  const [coordinates, setCoordinates] = useState<any>();

  useEffect(() => {
    GetGooglePhotoRef();
    GetGoogleGeoCoordinates();
  }, []);

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(activity.placeName);
    setPhotoRef(result.results[0].photos[0].photo_reference);
  };

  const GetGoogleGeoCoordinates = async () => {
    const result = await GetGeoCoordinates(activity.placeName);
    setCoordinates(result);
  }

  return (
    <View
      key={index}
      style={{
        padding: 10,
        borderRadius: 15,
        marginVertical: 10,
        borderColor: "#333",
        backgroundColor: "#e9e9e9",
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 120,
          borderRadius: 15,
        }}
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
            photoRef +
            "&key=" +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
      />
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          {activity.placeName}
        </Text>
        <Text style={{ color: "#333", fontWeight: "300" }}>
          {activity.placeDetails}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ marginTop: 5, gap: 5, width: "85%" }}>
            <Text style={{ fontSize: 14 }}>
              🎟️ Ticket Price:{" "}
              <Text style={{ fontWeight: "500" }}>
                {activity.ticketPricing.amount}{" "}
                {activity.ticketPricing.currency}
              </Text>
            </Text>
            <Text style={{ fontSize: 14 }}>
              ⏰ Time to Travel:{" "}
              <Text style={{ fontWeight: "500" }}>{activity.timeToTravel}</Text>
            </Text>
          </View>
          <View style={styles.control}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#333" }]}
              // onPress={() =>
              //   navigation.navigate("map", {
              //     placeName: activity.placeName,
              //     latitude: coordinates.lat,
              //     longitude: coordinates.lng,
              //     latitudeDelta: 0.005,
              //     longitudeDelta: 0.005,
              //   })
              // }
            >
              <Ionicons name="navigate" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}