import {  FlatList, StyleSheet,  Text,  TouchableOpacity,  View,} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./../../constants/Colors";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { push } from "expo-router/build/global-state/routing";

export default function SelectTraveler() {
 
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

  const [selectTravelerList, setSelectTravelerList] = useState([
      {
        id: 1,
        title: "Just Me",
        description: "A solo traveler in exploration",
        icon: "🛩",
        people: "1 people",
      },
      {
        id: 2,
        title: "A Couple",
        description: "Two travelers in tandem",
        icon: "🥂",
        people: "2 peoples",
      },
      {
        id: 3,
        title: "Family",
        description: "A group of fun-loving adventurers",
        icon: "🏡",
        people: "3 to 5 peoples",
      },
      {
        id: 4,
        title: "Friends",
        description: "A bunch of thrill-seekers",
        icon: "⛵",
        people: "5 to 10 peoples",
      },
    ]);

    const [selectedTraveler, setSelectedTraveler] = useState({
      id: 1,
      title: "Just Me",
      description: "A solo traveler in exploration",
      icon: "🛩",
      people: "1 people",
    });

  useEffect(() => {
    setTripData((prev) => ({
      ...prev,
      traveler: selectedTraveler,
    }));
  }, [selectedTraveler]);

        
  return (    
    <SafeAreaView edges={["top"]} style={styles.container}>
        <View>
        <Text style={styles.title}>Who's Traveling?</Text>
        <Text style={styles.heading}>Choose your travelers</Text>
        </View>

        <FlatList
        showsVerticalScrollIndicator={false}
        data={selectTravelerList}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => {
            return (
            <TouchableOpacity onPress={() => setSelectedTraveler(item)}>
                <View
                style={[
                    styles.card,
                    selectedTraveler.id === item.id && {
                    borderWidth: 2,
                    borderColor: Colors.MAIN,
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
            style={[styles.button, { backgroundColor: '#66CFFF' }]}
            onPress={() => router.push({
              pathname : '/create_trip/select_date',
              params: {
                    tripData: JSON.stringify(tripData), 
                  },
            })}
        >
            <Text style={[styles.button_text, { color: "#fff" }]}>Continue</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
    );
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
      borderWidth: 1,
      borderColor: "#333",
      borderRadius: 8,
    },
    button_icon: {
      marginRight: 10,
    },
    button_text: {
      color: "#333",
      fontSize: 16,
    },
  });