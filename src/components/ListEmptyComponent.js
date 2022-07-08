import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

function ListEmptyComponent() {
  const areThereMatches = useSelector((state) => state.movies.areThereMatches) ?? false;
  const text = areThereMatches ? 'Enter at least 3 characters to search' : 'There are no matches';
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>{text}</Text>
    </View>
  );
}

export default ListEmptyComponent;
const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#bababa',
  },
  container: {
    width: '80%',
  },
});
