import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TicketInfo = ({ ticket }) => {
  if (!ticket) return null; // If there's no ticket data, don't render the component

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Ticket Details</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Type:</Text>
        <Text numberOfLines={1} style={styles.value}>{ticket.TicketType}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>${ticket.Price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '80%',
    height: 130,
    marginBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
});

export default TicketInfo;
