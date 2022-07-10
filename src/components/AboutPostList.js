import React from 'react';
import { StyleSheet, Text } from 'react-native';

function AboutPostList({ infoAbout, isShort }) {
  return Object.keys(infoAbout)
    .map((key, index) => {
      if ((index > 5 && isShort) || infoAbout[key] === 'N/A' || key === 'Poster') {
        return false;
      }
      if (key === 'Ratings') {
        return (
          <Text key={key} style={styles.infoListStyle}>
            <Text style={styles.boldText}>
              {key}
              :
            </Text>
            <Text>{infoAbout[key].map((e) => ` ${e.Source}: ${e.Value}, `)}</Text>
          </Text>
        );
      }
      return (
        <Text key={key} style={styles.infoListStyle}>
          <Text style={styles.boldText}>
            {key}
            :
          </Text>
          <Text>{` ${infoAbout[key]}`}</Text>
        </Text>
      );
    })
    .filter((el) => el !== '');
}

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
  infoListStyle: {
    fontSize: 15,
  },
});

export default AboutPostList;
