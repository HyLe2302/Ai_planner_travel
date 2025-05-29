import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from './../constants/Colors'
// import AiAgent from '@/app/(tabs)/aiagent';


const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Nếu bàn phím đang mở thì không render tab bar
  if (keyboardVisible) return null;

  const labelMap = {
    mytrip: 'My Trip',
    discover: 'Discover',
    aiAgent: 'AI Agent',
    profile: 'Profile',
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        // const label = options.tabBarLabel || route.name;
        const label = labelMap[route.name] || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icons = {
          mytrip: 'compass-outline',
          discover: 'map-outline',
          aiAgent: 'chatbox-ellipses-outline',
          profile: 'person-outline',
        };

        const activeIcons = {
          mytrip: 'compass-outline',
          discover: 'map-outline',
          aiAgent: 'chatbox-ellipses-outline',
          profile: 'person-outline',
        };

        const iconName = isFocused ? activeIcons[route.name] : icons[route.name];

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tab}
          >
            <View style={isFocused ? styles.activeTab : styles.iconWrapper}>
              <Ionicons name={iconName} size={23} color={isFocused ? '#000' : '#fff'} />
              {isFocused && <Text style={styles.activeLabel}>{label}</Text>}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.MAIN,
    marginHorizontal: 20,
    borderRadius: 50,
    height: 65,
    alignItems: 'center', 
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  tab: {
    flexGrow: 1,
    alignItems: 'center',
  },
  iconWrapper: {
    padding: 10,
    color: 'rgba(255, 255, 255, 0.8)'
  },
  activeTab: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  activeLabel: {
    marginLeft: 8,
    color: '#000',
    fontFamily: 'outfit-medium',
    fontSize: 15
  },
});

export default CustomTabBar;


