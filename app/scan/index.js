import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { Stack, useLocalSearchParams } from "expo-router";
import axios from "axios";

import styles from "./index.style.js";

import { API_URL } from '@env'
import TicketInfo from "../../components/camera/TicketInfo.jsx";
import ErrorMessage from "../../components/camera/ErrorMessage.jsx";
import { COLORS } from "../../constants/theme.js";
const apiUrl = API_URL;

export default function Scan() {

  const { eventName, eventId } = useLocalSearchParams();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);


  const isValidTicket = async (code) => {
    try {
      const response = await axios.patch(`${apiUrl}/api/events/${eventId}/tickets/${code}`);
      if (response.status === 200) {
        setError(null); // Clear any existing errors
        return true;
      } else {
        handleAPIError(response.status);
        return false;
      }
    } catch (err) {
      if (err.response) { // Check if the error has a response object
        handleAPIError(err.response.status);
      } else {
        setError('Network error, please try again.'); // Set error for network issues or other errors without a response
      }
      return false;
    }
  }


  const handleAPIError = (statusCode) => {
    switch (statusCode) {
      case 400:
        setError('You have already checked in.');
        break;
      case 404:
        setError('Ticket not found.');
        break;
      default:
        setError('An error occurred.');
        break;
    }
  };

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setIsLoading(true);
    let ticketData;
    try {
      ticketData = JSON.parse(data);
      let isValid = await isValidTicket(ticketData.CheckInCode);
      if (isValid) {
        setTicket(ticketData); // Set ticket info if valid
      } else {
        setTicket(null); // Ensure ticket info is cleared on error
      }
    } catch (error) {
      setError("Invalid Ticket Data.");
      setTicket(null); // Clear ticket data on error
    }
    setIsLoading(false);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  )
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Scan E-Ticket</Text>
        <Text style={styles.paragraph}>{eventName}</Text>

        {renderCamera()}

        {isLoading && <ActivityIndicator size="large" color={COLORS.primary} />}

        {
          error ? (
            <ErrorMessage error={error}
              onRetry={() => {
                // Clear all states (reinitialize the scan process, as if the user just opened the screen)
                setScanned(true);
                setError(null); // Clear error on re-scan
                setTicket(null); // Clear ticket info on re-scan
              }}
            />
          ) : ticket ? (
            <TicketInfo ticket={ticket} />
          ) : null
        }


        {!isLoading && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // set scanned to false to allow scanning again on button press
              setScanned(false);
              setError(null); // Clear error on re-scan
              setTicket(null); // Clear ticket info on re-scan
            }}
            disabled={!scanned}
          >
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        )}

      </View>
    </>

  );
}