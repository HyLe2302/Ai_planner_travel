
import moment from "moment";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import HotelCard from "./HotelCard";
import PlaceCard from "./PlaceCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
    // marginTop: 40,
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "red",
  },
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
  button_icon: {
    marginRight: 10,
  },
  button_text: {
    color: "#333",
  },
  right_icon: {
    padding: 3,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
});

const TripDetailScreen = () => {

  const router = useRouter()
  const params = useLocalSearchParams();
  const trip = JSON.parse(params.item as string);

  const [tripDetails, setTripDetails] = useState(trip);

  useEffect(() => {
    setTripDetails(trip); 
  }, []);

  return (
    <>
    <Stack.Screen
        options={{
          headerRight: () => (
            <MaterialIcons
              name="explore"
              size={24}
              color="black"
              style={{ marginRight: 15 }}
              // onPress={() => router.push({ pathname: '/map', params: { trip: JSON.stringify(trip) } })}
            />
          ),
        }}
      />

    {tripDetails && (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        
        <View style={{ position: "relative" }}>
          <Image
            style={{
              width: "100%",
              height: 330,
            }}
            source={{
              uri:
                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                JSON.parse(tripDetails.tripData).photoRef +
                "&key=" +
                process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            }}
          />
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/trip_details/map",
                params: { trip: JSON.stringify(tripDetails) },
              })
            }
            style={{
              position: "absolute",
              top: 15,
              right: 15,
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 5,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            }}
          >
            <MaterialIcons name="explore" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 15,
            backgroundColor: "#fff",
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 500 }}>
            {tripDetails.tripPlan.tripDetails.location}
          </Text>
          <View style={{ flexDirection: "row", gap: 5, marginTop: 5 }}>
            <Text style={{ color: "#333", fontWeight: 300 }}>
              {moment(JSON.parse(tripDetails.tripData).time.startDate).format(
                "DD MMM yyyy"
              )}
            </Text>
            <Text style={{ color: "#333", fontWeight: 300 }}>
              -{" "}
              {moment(JSON.parse(tripDetails.tripData).time.endDate).format(
                "DD MMM yyyy"
              )}
            </Text>
          </View>
          <Text style={{ color: "#333", fontWeight: 300 }}>
            {JSON.parse(tripDetails.tripData).traveler.icon}{" "}
            {JSON.parse(tripDetails.tripData).traveler.title}
          </Text>

          {/* Flight Info */}
          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: "lightgray",
              padding: 10,
              borderRadius: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 6 }}>
                🛩 Flights
              </Text>
              <View style={styles.control}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#333" }]}
                >
                  <Text style={[styles.button_text, { color: "#fff" }]}>
                    Book here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={{ color: "#333", fontWeight: 300 }}>
              Airline: {tripDetails.tripPlan.flightDetails.arrivalCity}
            </Text>
            <Text style={{ color: "#333", fontWeight: 300 }}>
              Price:{" "}
              {tripDetails.tripPlan.flightDetails.estimatedFlightPrice.amount}{" "}
              {tripDetails.tripPlan.flightDetails.estimatedFlightPrice.currency}
            </Text>
          </View>

          {/* Hotel List */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
              🏨 Hotel Recommendation
            </Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={tripDetails.tripPlan.hotelOptions}
              renderItem={({ item }) => {
                return <HotelCard item={item} />;
              }}
            />
          </View>

          {/* Trip Day Planner Info */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
              🏕 Plan Details
            </Text>

            {tripDetails.tripPlan.dayPlans.map((dayPlan: any, index: any) => (
              <View key={index}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  Day {dayPlan.day}
                </Text>

                {dayPlan.activities.map((activity: any, index: any) => (
                  <PlaceCard key={index} activity={activity} index={index} />
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    )}
    </>
  );
  
};

export default TripDetailScreen;
