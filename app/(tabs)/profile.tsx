import { ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Divider } from "react-native-paper";
import { useRouter } from "expo-router";

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
  heading: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
  },
});

const Profile = () => {

  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <AntDesign
          name="user"
          size={28}
          color="black"
          // onPress={() => navigation.navigate("profile")}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>App</Text>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo
                  name="light-up"
                  size={24}
                  color="black"
                  style={{ marginRight: 30 }}
                />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{ fontSize: 15, fontWeight: 500 }}
                    numberOfLines={1}
                  >
                    Theme
                  </Text>
                  <Text
                    style={{ color: "gray", fontWeight: 300 }}
                    numberOfLines={1}
                  >
                    Light mode
                  </Text>
                </View>
              </View>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Account</Text>
          <View style={{ width: "100%" }}>
            <Divider
              style={{
                height: 1,
                backgroundColor: "lightgray",
                marginVertical: 10,
              }}
            />
          </View>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AntDesign
                  name="creditcard"
                  size={24}
                  color="black"
                  style={{ marginRight: 30 }}
                />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{ fontSize: 15, fontWeight: 500 }}
                    numberOfLines={1}
                  >
                    Billing & subscriptions
                  </Text>
                  <Text
                    style={{ color: "gray", fontWeight: 300 }}
                    numberOfLines={1}
                  >
                    Plan, payment preferences
                  </Text>
                </View>
              </View>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <View style={{ width: "100%" }}>
            <Divider
              style={{
                height: 1,
                backgroundColor: "lightgray",
                marginVertical: 10,
              }}
            />
          </View>
          <TouchableOpacity onPress={() => router.replace('/auth/sign-in')}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="exit"
                  size={24}
                  color="red"
                  style={{ marginRight: 30 }}
                />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{ color: "red", fontSize: 15, fontWeight: 500 }}
                    numberOfLines={1}
                  >
                    Sign out
                  </Text>
                  <Text
                    style={{ color: "gray", fontWeight: 300 }}
                    numberOfLines={1}
                  >
                    Come back soon!
                  </Text>
                </View>
              </View>
              <Entypo name="chevron-right" size={24} color="red" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Help & Support</Text>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AntDesign
                  name="staro"
                  size={24}
                  color="black"
                  style={{ marginRight: 30 }}
                />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{ fontSize: 15, fontWeight: 500 }}
                    numberOfLines={1}
                  >
                    Give us a rating!
                  </Text>
                  <Text
                    style={{ color: "gray", fontWeight: 300 }}
                    numberOfLines={1}
                  >
                    Submit a review on the App Store
                  </Text>
                </View>
              </View>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <View style={{ width: "100%" }}>
            <Divider
              style={{
                height: 1,
                backgroundColor: "lightgray",
                marginVertical: 10,
              }}
            />
          </View>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo
                  name="mail"
                  size={24}
                  color="black"
                  style={{ marginRight: 30 }}
                />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{ fontSize: 15, fontWeight: 500 }}
                    numberOfLines={1}
                  >
                    Contact us
                  </Text>
                  <Text
                    style={{ color: "gray", fontWeight: 300 }}
                    numberOfLines={1}
                  >
                    Reach out with questions or suggestions
                  </Text>
                </View>
              </View>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <View style={{ width: "100%" }}>
            <Divider
              style={{
                height: 1,
                backgroundColor: "lightgray",
                marginVertical: 10,
              }}
            />
          </View>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="file-key-outline"
                  size={24}
                  color="black"
                  style={{ marginRight: 30 }}
                />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{ fontSize: 15, fontWeight: 500 }}
                    numberOfLines={1}
                  >
                    Privacy Policy
                  </Text>
                  <Text
                    style={{ color: "gray", fontWeight: 300 }}
                    numberOfLines={1}
                  >
                    How your information is handled
                  </Text>
                </View>
              </View>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <View style={{ width: "100%" }}>
            <Divider
              style={{
                height: 1,
                backgroundColor: "lightgray",
                marginVertical: 10,
              }}
            />
          </View>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name="scroll"
                  size={24}
                  color="black"
                  style={{ marginRight: 30 }}
                />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{ fontSize: 15, fontWeight: 500 }}
                    numberOfLines={1}
                  >
                    Terms of Service
                  </Text>
                  <Text
                    style={{ color: "gray", fontWeight: 300 }}
                    numberOfLines={1}
                  >
                    How we run things around here
                  </Text>
                </View>
              </View>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;