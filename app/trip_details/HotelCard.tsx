import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { GetPhotoRef } from "./../../configs/GooglePlaceAPI";

export default function HotelCard({ item } : { item: any }) {
  const [photoRef, setPhotoRef] = useState<any>();

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(item.hotelName);
    setPhotoRef(result.results[0].photos[0].photo_reference);
  };

  return (
    <View style={{ marginRight: 20, width: 200 }}>
      <Image
        style={{ width: 200, height: 120, borderRadius: 15 }}
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
            photoRef +
            "&key=" +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
      />
      <View style={{ padding: 5 }}>
        <Text style={{ fontWeight: 500 }}>{item.hotelName}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#333", fontWeight: 300 }}>
            ⭐ {item.rating}
          </Text>
          <Text style={{ color: "#333", fontWeight: 300 }}>
            💰 {item.price.perNight} {item.price.currency}/night
          </Text>
        </View>
      </View>
    </View>
  );
}