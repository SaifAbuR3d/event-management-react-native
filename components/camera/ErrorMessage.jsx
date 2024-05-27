import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ErrorMessage = ({ error, onRetry }) => {
  if (!error) return null; // Don't render the component if there's no error

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorMessage}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#f8d7da',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f5c6cb',
    margin: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 40,

  },
  errorMessage: {
    color: '#721c24',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#f5c6cb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#721c24',
    fontSize: 16,
  },
});

export default ErrorMessage;
