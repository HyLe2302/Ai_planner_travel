import { View, Text, RefreshControl, ScrollView, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { AntDesign, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from "./../../configs/FireBaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from 'expo-image';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

export default function Mytrip() {

  const router = useRouter();
  const [userTrips, setUserTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    user && GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    
    const q = query(
      collection(db, "UserTrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
    // const latestTrip = JSON.parse(userTrips[0].tripData);
    setLoading(false);
  };

  const handleDeleteTrip = (docID: string) => {
    Alert.alert(
      "Confirm delete",
      "Are you sure you want to delete this trip? This process cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "UserTrips", docID));
              setUserTrips((prev) =>
                prev.filter((trip) => trip.docID !== docID)
              );
              Toast.show({
                    type: 'success',
                    text1: 'Congratualte',
                    text2: 'This trip has been deleted',
                    visibilityTime: 2000,
                  });
            } catch (error) {
              Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: 'Delete failed',
                    visibilityTime: 2000,
                  });
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
        <AntDesign
          name="user"
          size={28}
          color="black"
          onPress={() => router.push('/(tabs)/profile')}
        />
      </View>
      {userTrips?.length == 0 ? (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={GetMyTrips} />
          }
        >
          <View style={styles.body}>
            <FontAwesome6 name="location-dot" size={33} color={Colors.MAIN} />
            <Text style={styles.heading}>No trips planned yet</Text>
            <Text style={styles.description}>
              Looks like its time to plan {'\n'}
              a new travel experinece! Get Started below
            </Text>

            <View style={styles.control}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: Colors.MAIN }]}
                onPress={() => router.push('/create_trip/search_place')}
              >
                <Text style={[styles.button_text, { color: "#fff" }]}>
                  Start a new trip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, marginTop: 15 }}>
          <View style={{ marginBottom: 10 }}>
            {JSON.parse(userTrips[userTrips.length - 1].tripData).photoRef ? (
              <Image
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  borderRadius: 15,
                }}
                source={{
                  uri:
                    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                    JSON.parse(userTrips[userTrips.length - 1].tripData)
                      .photoRef +
                    "&key=" +
                    process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                }}
              />
            ) : (
              <Image
                style={{
                  width: "100%",
                  height: 240,
                  objectFit: "cover",
                  borderRadius: 15,
                }}
                source={require("./../../assets/images/login1.jpg")}
              />
            )}
            <View style={{ marginVertical: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: 500 }}>
                {userTrips[userTrips.length - 1].tripPlan.tripDetails.location}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#333", fontWeight: 300 }}>
                  {moment(
                    JSON.parse(userTrips[userTrips.length - 1].tripData).time
                      .startDate
                  ).format("DD MMM yyyy")}
                </Text>
                <Text style={{ color: "#333", fontWeight: 300 }}>
                  {
                    JSON.parse(userTrips[userTrips.length - 1].tripData)
                      .traveler.icon
                  }{" "}
                  {
                    JSON.parse(userTrips[userTrips.length - 1].tripData)
                      .traveler.title
                  }
                </Text>
              </View>
            </View>
            <View style={{ width: "100%" ,alignItems:'center' }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: Colors.MAIN }]}
                onPress={() => {
                  userTrips.length > 0 &&
                    router.push({
                      pathname: '/trip_details/trip_details',
                      params: {
                        item: JSON.stringify(userTrips[userTrips.length - 1]),
                      },
                    });
                }}           
              >
                <Text style={[styles.button_text, { color: "#fff" }]}>
                  See your plan
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            style={{ marginBottom: 47 }}
            showsVerticalScrollIndicator={false}
            data={userTrips}
            keyExtractor={(trip) => trip.docID + ""}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>router.push({
                    pathname:'/trip_details/trip_details',
                    params:{
                      item : JSON.stringify(item)
                    }
                  })}
                  onLongPress={() => handleDeleteTrip(item.docID)}
                >
                  <View
                    style={{
                      marginTop: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Image
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 15,
                      }}
                      source={{
                        uri:
                          "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                          JSON.parse(item.tripData).photoRef +
                          "&key=" +
                          process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                      }}
                    />
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: 500 }}>
                        {item.tripPlan.tripDetails.location}
                      </Text>
                      <Text style={{ color: "#333", fontWeight: 300 }}>
                        {moment(
                          JSON.parse(item.tripData).time.startDate
                        ).format("DD MMM yyyy")}
                      </Text>
                      <Text style={{ color: "#333", fontWeight: 300 }}>
                        {JSON.parse(item.tripData).traveler.icon}{" "}
                        {JSON.parse(item.tripData).traveler.title}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={GetMyTrips} />
            }
          />
        </View>
      )}

      {userTrips?.length != 0 ? (
        <FontAwesome6
          style={styles.add_icon}
          name="add"
          size={24}
          color= {Colors.PRIMARY}
          onPress={() => router.push('/create_trip/search_place')}
        />
      ) : null}

    </SafeAreaView>
  )
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
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 10,
    // borderWidth: 1,
    // borderColor: "red",
  },
  heading: {
    fontSize: 25,
    fontFamily:'outfit-medium',    
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize:15,
    fontFamily:'outfit',
    textAlign:'center',
    color:Colors.GRAY,
    marginBottom: 10,
  },
  control: {
    width: "50%",
    // gap: 15,
    // marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    borderRadius: 15,
    width:250
  },
  button_icon: {
    marginRight: 10,
  },
  button_text: {
    color:Colors.WHITE,
    fontSize: 17,
    fontFamily:'outfit-medium',
  },
  add_icon: {
    position: "absolute",
    bottom: 90,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
  },
});