import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = () => {
  return (
    <View style={styles.divider} />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0', // Color of the divider
    marginVertical: 10, // Adjust spacing as needed
  },
});

export default Divider;