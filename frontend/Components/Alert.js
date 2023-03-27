import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalAlertContext } from '../Contexts/GlobalAlertContext';
import { Ionicons } from '@expo/vector-icons';

export default function Alert({duration}) {
  const { alertOpen, setAlertOpen, alertColor, setAlertColor, alertText, setAlertText } = useContext(GlobalAlertContext);
  const backgroundColor = alertColor === 'success' ? '#4CAF50' : alertColor === "error" ? '#B71C1C' : '#333';

  useEffect(() => {
    if (!alertOpen) {
      return;
    }
    if (alertText) {
      const timer = setTimeout(() => setAlertOpen(false), duration);
    }
  }, [alertOpen]);

  function handleDismiss() {
    setAlertOpen(false);
    setAlertText('');
  }

  if (!alertOpen) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.message}>{alertText}</Text>
      <TouchableOpacity onPress={handleDismiss}>
        <Ionicons name="ios-close" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 4,
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: "90%"
  }
});