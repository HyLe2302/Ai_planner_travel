import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react'
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function select_budget() {

  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectBudgetList, setSelectBudgetList] = useState([
    {
      id: 1,
      title: "Cheap",
      description: "Stay conscious of costs",
      icon: "💵",
    },
    {
      id: 2,
      title: "Moderate",
      description: "Keep costs on the average side",
      icon: "💰",
    },
    {
      id: 3,
      title: "Luxury",
      description: "Don't worry about cost",
      icon: "💸",
    },
  ]);
  const [selectedBudget, setSelectedBudget] = useState({
    id: 1,
    title: "Cheap",
    description: "Stay conscious of costs",
    icon: "💵",
  });
  
  const parsedTripData = JSON.parse(params.tripData as string); 

  const [tripData, setTripData] = useState({
      name: parsedTripData?.name,
      coordinates: parsedTripData?.coordinates,
      photoRef: parsedTripData?.photoRef,
      url: parsedTripData?.url,
      traveler: parsedTripData?.traveler,
      time: parsedTripData?.time,
      budget: selectedBudget,
    });

  useEffect(() => {
    setTripData((prev) => ({
      ...prev,
      budget: selectedBudget,
    }));
  }, [selectedBudget]);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View>
        <Text style={styles.title}>Budget</Text>
        <Text style={styles.heading}>Choose spending habits for your trip</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={selectBudgetList}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => setSelectedBudget(item)}>
              <View
                style={[
                  styles.card,
                  selectedBudget.id === item.id && {
                    borderWidth: 2,
                    borderColor: "gray",
                  },
                ]}
              >
                <View>
                  <Text style={styles.card_heading}>{item.title}</Text>
                  <Text style={styles.card_description}>
                    {item.description}
                  </Text>
                </View>

                <Text style={styles.card_icon}>{item.icon}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.control}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.MAIN }]}
          onPress={() => router.push({
            pathname: '/create_trip/review_trip',
            params: {
              tripData: JSON.stringify(tripData)
            }
          })}
          // onPress={() => console.log("sdfgfg",tripData)}
        >
          <Text style={[styles.button_text, { color: "#fff" }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
  },
  card: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#e8e8e8",
  },
  card_heading: {
    fontSize: 16,
    fontWeight: "500",
  },
  card_description: {
    color: "gray",
    fontWeight: 300,
  },
  card_icon: {
    fontSize: 40,
  },
  control: {
    width: "100%",
    marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
  },
  button_icon: {
    marginRight: 10,
  },
  button_text: {
    color: "#333",
    fontSize: 20,
  },
});