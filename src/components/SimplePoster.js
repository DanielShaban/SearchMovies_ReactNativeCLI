import {
 Dimensions, StyleSheet, Text, View, 
} from 'react-native';
import React from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const cardWidth = Dimensions.get('window').width * 0.8;
const NotPictureAvailable = require('../assets/images/No_picture_available.png');

function SimplePoster({ item }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <AutoHeightImage
          width={cardWidth}
          source={item.Poster === 'N/A' ? NotPictureAvailable : { uri: item.Poster }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.postDescriptionContainer}>
        <View style={styles.postDescription}>
          <Text
            style={styles.title}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
            maxFontSizeMultiplier={2}
          >
            {item.Title}
          </Text>
          <View style={styles.postDescriptioBottom}>
            <Text style={styles.TextType}>{item.Type}</Text>
            <Text>{item.Year}</Text>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('AboutPost', {
              PostId: item.imdbID,
            })}
          containerStyle={styles.touchableContainerStyle}
          style={styles.touchableStyle}
        >
          <Text style={styles.Link}>More info</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

export default SimplePoster;

const styles = StyleSheet.create({
  Link: {
    color: '#2089dc',
  },
  postDescriptionContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  touchableContainerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  touchableStyle: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#2089dc',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  TextType: {
    marginRight: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  container: {
    minWidth: cardWidth,
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
