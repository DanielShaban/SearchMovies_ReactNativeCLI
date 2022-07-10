import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

function ListEmptyComponent() {
  const isThereMatche = useSelector((state) => state.movies.isThereMatche) ?? false;
  const text = isThereMatche ? 'Enter at least 3 characters to search' : 'There are no matches';
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#bababa',
  },
  container: {
    width: '80%',
  },
});

export default ListEmptyComponent;
