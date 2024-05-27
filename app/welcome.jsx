import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { Buffer } from "buffer"
import axios from 'axios'
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn.jsx'
import EventCard from '../components/home/EventCard.jsx'

import {
  COLORS,
  FONT,
  SIZES
} from '../constants';

import styles from '../styles/welcome.style.js'


import { API_URL } from '@env'
const apiUrl = API_URL;

const decode = (token) => {
  const parts = token.split('.').map((part) => {
    return Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
  });
  const payload = JSON.parse(parts[1].toString());
  return payload;
}

export default function welcome() {

  const { token } = useLocalSearchParams();

  const [organizer, setOrganizer] = useState('');
  const [isLoadingOrg, setIsLoadingOrg] = useState(false);
  const [isLoadingEv, setIsLoadingEv] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);


  const getUserData = async () => {
    const tokenData = decode(token);

    setIsLoadingOrg(true);
    try {
      const response = await axios.get(`${apiUrl}/api/organizers/${tokenData["id"]}`);
      setOrganizer(response.data);
    } catch (err) {
      alert('There is an error fetching data');
      setError(true);
    } finally {
      setIsLoadingOrg(false);
    }
  }

  const getNearEvents = async () => {
    const tokenData = decode(token);

    setIsLoadingEv(true);
    try {
      const response = await axios.get(`${apiUrl}/api/events?pageSize=10&organizer_id=${tokenData["id"]}&sortColumn=startDate&sortOrder=desc`);
      setEvents(response.data);
    } catch (err) {
      alert('There is an error fetching data');
      setError(true);
    } finally {
      setIsLoadingEv(false);
    }
  }

  useEffect(() => {
    getUserData();
    getNearEvents();
  }, []);

  const renderWelcomeMessage = () => (
    <View style={styles.welcomeMessageContainer}>
      {
        isLoadingOrg ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <>
            <Text style={styles.userName}>Hello {organizer?.displayName}</Text>
            <Text style={styles.welcomeMessage}>Choose an Event to start scanning Tickets!</Text>
          </>
        )
      }
    </View>
  );

  const renderEvents = () => (
    <View style={styles.eventsContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Your Events
        </Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>
            Show All
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {
          isLoadingEv ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            events?.map((event) => (
              <EventCard
                event={event}
                key={`event-${event?.id}`}
                handleNavigate={() => router.push({
                  pathname: `/scan`,
                  params: { eventName: event.name, eventId: event.id }
                })}
              />
            ))
          )
        }
      </View>
    </View>
  );


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.lightWhite,
    }}>
      <Stack.Screen options={{
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerShadowVisible: false,
        headerRight: () => (
          <>
            <Text style={{
              marginRight: 10,
              fontFamily: FONT.bold,
              fontSize: SIZES.medium,
              color: COLORS.secondary,
            }}>
              {organizer.userName}
            </Text>
            <ScreenHeaderBtn iconUrl={`${apiUrl}/${organizer.imageUrl}`} dimension="100%" />
          </>
        ),
        headerTitle: ""
      }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          flex: 1,
          padding: SIZES.medium,
        }}>

          {renderWelcomeMessage()}

          {renderEvents()}


        </View>
      </ScrollView>
    </SafeAreaView>
  )
}