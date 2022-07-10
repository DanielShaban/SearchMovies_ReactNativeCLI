import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

function FooterIndicator() {
  const isLoading = useSelector((state) => state.movies.isLoading) ?? false;
  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator animating size="large" />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
});
export default FooterIndicator;
