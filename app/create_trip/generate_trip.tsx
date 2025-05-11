import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { chatSession } from "../../configs/AIModal";
import { auth, db } from "./../../configs/FireBaseConfig";
import React from 'react'
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";

export default function generate_trip() {

  const router = useRouter();
  const params = useLocalSearchParams();
  const parsedTripData = JSON.parse(params.tripData as string);

  const [tripData, setTripData] = useState({
    name: parsedTripData?.name,
    coordinates: parsedTripData?.coordinates,
    photoRef: parsedTripData?.photoRef,
    url: parsedTripData?.url,
    traveler: parsedTripData?.traveler,
    time: parsedTripData?.time,
    budget: parsedTripData?.budget,
  });

  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    tripData&&GenerateAITrip();
  }, [tripData]);

  const AI_PROMPT =
    'Generate a {totalDays} Day, {totalNight} Night travel plan JSON for {traveler} with a {budget} budget in {location}, strictly following this structure: { "tripDetails": { "budget", "duration", "location", "travelers" }, "flightDetails": { "arrivalCity", "estimatedFlightPrice": { "amount",  "currency" }, "exampleBookingUrl" }, "hotelOptions": [{ "hotelName", "hotelAddress", "price": { "currency", "perNight" }, "hotelImageUrl", "geoCoordinates": { "latitude", "longitude" }, "rating", "description", "amenities": [] }], "dayPlans": [{ "day", "activities": [{ "placeName", "placeDetails", "placeImageUrl", "geoCoordinates": { "latitude", "longitude" }, "ticketPricing": { "amount", "currency" }, "timeToTravel", "bestTimeToVisit" }] }], "foodRecommendations": [], "notes": [] }, where "placeName" is a real location verifiable on Google Maps for accurate "geoCoordinates", using placeholder URLs/dates/prices, and outputting ONLY the JSON block.';

  const GenerateAITrip = async () => {
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replaceAll("{location}", tripData.name)
      .replaceAll("{totalDays}", tripData.time.totalNoOfDays + "")
      .replaceAll("{totalNight}", tripData.time.totalNoOfDays - 1 + "")
      .replaceAll("{traveler}", tripData.traveler.title)
      .replaceAll("{budget}", tripData.budget.title);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    const tripResponse = JSON.parse(result.response.text());
    setLoading(false);

    const docID = Date.now().toString();
    await setDoc(doc(db, "UserTrips", docID), {
      userEmail: user?.email,
      tripPlan: tripResponse,
      tripData: JSON.stringify(tripData),
      docID: docID,
    });

    router.push('/(tabs)/mytrip')
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <Text style={styles.title}>Please Wait...</Text>
      <Text style={styles.heading}>
        We are working to generate your dream trip
      </Text>
      <Image
        contentFit="contain"
        style={{ width: "100%", height: 300 }}
        source={{
          uri: "https://ugokawaii.com/wp-content/uploads/2023/04/plane.gif",
        }}
      ></Image>
      <Text style={styles.description}>Do not Go Back</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 20,
    textAlign: "center",
  },
  heading: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    color: "gray",
    fontSize: 16,
    fontWeight: 300,
    textAlign: "center",
  },
});