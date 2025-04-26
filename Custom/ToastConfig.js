import React from 'react';
import { View, Text } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#00C851', backgroundColor: '#f0fff0',
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007E33',
      }}
      text2Style={{
        fontSize: 14,
        color: '#4CAF50',
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#ff4444', backgroundColor: '#fff5f5', width:300 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#CC0000',
      }}
      text2Style={{
        fontSize: 13,
        color: '#d32f2f',
      }}
    />
  ),
  // Bạn cũng có thể thêm custom type của riêng mình
  my_custom_toast: ({ text1, text2, ...rest }) => (
    <View style={{
      height: 80,
      width: '90%',
      backgroundColor: '#222',
      borderRadius: 90,
      padding: 15,
      justifyContent: 'center'
    }}>
      <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{text1}</Text>
      <Text style={{ color: '#aaa', fontSize: 14 }}>{text2}</Text>
    </View>
  )
};

