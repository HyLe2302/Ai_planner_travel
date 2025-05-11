import React from 'react'
import { Text, View, TouchableOpacity, Alert, Platform, StyleSheet,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarPicker, { ChangedDate } from "react-native-calendar-picker";
import { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Toast from 'react-native-toast-message';

export default function select_date() {

  const [startDate, setStartDate] = useState<Moment|null>();
  const [endDate, setEndDate] = useState<Moment|null>();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const parsedTripData = JSON.parse(params.tripData as string);
  
  const [tripData, setTripData] = useState({
    name: parsedTripData?.name,
    coordinates: parsedTripData?.coordinates,
    photoRef: parsedTripData?.photoRef,
    url: parsedTripData?.url,
    traveler: parsedTripData?.traveler,
    time: {
      startDate: null,
      endDate: null,
      totalNoOfDays: 0,
    },
    budget: parsedTripData?.budget,
  });
  

  const onDateChange = (date: Date, type: ChangedDate) => {
    
    if (type === "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateSelectionContinue = () => {
    if (startDate == null) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Please select Start Date',
        visibilityTime: 2000,
      });
      return;
    }
    
    if (endDate == null) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Please select End Date',
        visibilityTime: 2000,
      });
      return;
    }

    const totalNoOfDays = endDate.diff(startDate, "days");
    if (Number.isNaN(totalNoOfDays)) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Please select End Date',
        visibilityTime: 2000,
      });
      return;
    }

    router.push({
      pathname: '/create_trip/select_budget',
      params:{
        tripData: JSON.stringify(tripData),
      },
    })
  };

  useEffect(() => {
    if (endDate == null) {
      return;
    }

    const totalNoOfDays = endDate?.diff(startDate, "days");
    if (Number.isNaN(totalNoOfDays)) {
      return;
    }

    setTripData((prev) => ({
      ...prev,
      time: {
        startDate: startDate,
        endDate: endDate,
        totalNoOfDays: totalNoOfDays + 1,
      },
    }));
  }, [endDate])

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View>
        <Text style={styles.title}>Travel Dates</Text>
      </View>

      <View style={{ flex: 1 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{
            backgroundColor: "#333",
          }}
          selectedDayTextStyle={{
            color: "#fff",
          }}
        />
      </View>

      <View style={styles.control}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.MAIN }]}
          onPress={onDateSelectionContinue}
        >
          <Text style={[styles.button_text, { color: Colors.WHITE }]}>Continue</Text>
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