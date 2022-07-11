import {
  Dimensions, Pressable, StyleSheet, Text, View,
} from 'react-native';
import React from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import { useNavigation } from '@react-navigation/native';
import noPictureAvailable from '../assets/images/No_picture_available.png';

function SimplePoster({
  posterURL, title, type, year, id,
}) {
  const navigation = useNavigation();
  const cardWidth = Dimensions.get('window').width * 0.8;

  return (
    <View style={[styles.container, { minWidth: cardWidth }]}>
      <View style={styles.imageContainer}>
        <AutoHeightImage
          width={cardWidth}
          source={posterURL === 'N/A' ? noPictureAvailable : { uri: posterURL }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.postDescriptionContainer}>
        <View style={styles.postDescription}>
          <Text
            style={styles.titleStyle}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
            maxFontSizeMultiplier={2}
          >
            {title}
          </Text>
          <View style={styles.postDescriptioBottom}>
            <Text style={styles.textType}>{type}</Text>
            <Text>{year}</Text>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate('AboutPost', {
            PostId: id,
          })}
          style={styles.pressableStyle}
        >
          <Text style={styles.link}>More info</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    color: '#2089dc',
  },
  postDescriptionContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  pressableStyle: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#2089dc',
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  textType: {
    marginRight: 5,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  container: {
    marginBottom: 40,
  },
  postDescription: {
    width: '60%',
  },
  poster: {
    flex: 1,
    width: null,
    height: null,
  },
  imageContainer: {
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  postDescriptioBottom: {
    flexDirection: 'row',
  },
});

export default SimplePoster;
