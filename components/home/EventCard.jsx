import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import styles from '../../styles/eventCard.style.js';


import { API_URL } from '@env'
const apiUrl = API_URL;

export default function EventCard({ event, handleNavigate }) {
  return (
    <TouchableOpacity style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={{ uri: `${apiUrl}/${event.thumbnailUrl}` }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.mainText} numberOfLines={1}>
          {event?.name}
        </Text>
        <Text style={styles.secondaryText} numberOfLines={1}>
          {event?.hasStarted ? "Event has started" : `Event starts at ${event.startDate} `}
        </Text>
      </View>

    </TouchableOpacity>
  )
}