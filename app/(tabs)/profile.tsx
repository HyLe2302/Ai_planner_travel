import { Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Divider, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { auth } from "@/configs/FireBaseConfig";
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import Toast from "react-native-toast-message";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
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
  body: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  description: {
    color: "gray",
    fontWeight: 300,
    marginBottom: 5,
  },
  form: {
    marginTop: 10,
    paddingHorizontal: 20,
  },

  form_input_icon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },

  form_input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    height:45,
    backgroundColor:Colors.WHITE
  },

  control: {
    marginTop: 16,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
    width: "100%",
  },

  button_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  name: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 2,
    color: "#222",
  },
});

const Profile = () => {

  const router = useRouter();
  const user = auth.currentUser;
  const db = getFirestore()

  const [fName, setfName] = useState("");
  const [currentfName, setCurrentfName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // useEffect(() => {
  //   const getUserName = async () => {
  //     if (user) {
  //       const userEmail = user?.email;
  //       const usersRef = collection(db, "UserAccount");
  //       const q = query(usersRef, where("email", "==", userEmail));
  //       const querySnapshot = await getDocs(q);

  //       if (!querySnapshot.empty) {
  //         const userData = querySnapshot.docs[0].data();
  //         console.log("sas",userData)
  //         setfName(userData.name || "");
  //         setCurrentfName(userData.name || "");
  //       } else {
  //         console.log("No matching user found in Firestore.");
  //       }
  //     } else {
  //       console.log("No user is logged in.");
  //     }
  //   };

  //   getUserName();
  // }, []);

  useEffect(() => {
  const getUserName = async () => {
    try {
      if (user && user.email) {
        const userEmail = user?.email;
        const usersRef = collection(db, "UserAccount");
        const q = query(usersRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const userData = doc.data();
          
          setfName(userData.name || "");
          setCurrentfName(userData.name || "");
        } else {
          console.log("❌ Không tìm thấy user với email:", userEmail);
        }
      } else {
        console.log("❌ Chưa đăng nhập hoặc thiếu email.");
      }
    } catch (error) {
      console.error("🔥 Lỗi khi lấy dữ liệu user từ Firestore:", error);
    }
  };

  getUserName();
}, [user]);

  const updateFName = async () => {
    Keyboard.dismiss();

    if (!fName) {
      Toast.show({
              type: 'error', 
              text1: 'Wrong',
              text2: 'Please enter your full name',
              visibilityTime: 3000,
            });
      return;
    }

    try {
      const userRef = collection(db, "UserAccount");
      const q = query(userRef, where("email", "==", user?.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Toast.show({
              type: 'error', 
              text1: 'Wrong',
              text2: 'User not found',
              visibilityTime: 3000,
            });
        return;
      }

      querySnapshot.forEach(async (userDoc) => {
        await updateDoc(doc(db, "UserAccount", userDoc.id), {
          name: fName
        });
        setCurrentfName(fName);
        Toast.show({
        type: 'success',
        text1: 'Congratualte',
        text2: 'Full Name has been successfully updated! ',
        visibilityTime: 1000,
      });
      });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <AntDesign
          name="user"
          size={28}
          color="black"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <AntDesign name="user" size={36} color="black" />
          <Text style={styles.name } onPress={() => setIsEditing(true)}>{currentfName}</Text>
          <Text style={styles.description}>{user?.email}</Text>
        </View>

        {isEditing && (
          <>
            <View style={styles.form}>
              <View style={styles.form_input_icon}>
                <AntDesign name="user" size={24} color="black" />
                <TextInput
                  style={styles.form_input}
                  value={fName}
                  onChangeText={(value) => setfName(value)}
                  placeholder="Enter Your Full Name"
                />
                {!!fName && (
                  <AntDesign
                    name="close"
                    size={24}
                    color="black"
                    onPress={() => setfName("")}
                  />
                )}
              </View>
            </View>

            <View style={styles.control}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#333" }]}
                onPress={async () => {
                  await updateFName();
                  setIsEditing(false);
                }}
              >
                <Text style={[styles.button_text, { color: "#fff" }]}>
                  Save changes
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

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