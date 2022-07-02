import {
  View, Text, Dimensions, StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoHeightImage from 'react-native-auto-height-image';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ClearInfoAbout, FindDetails } from '../store/actions/movies';
import { colors } from '../theme';

const windowsWidth = Dimensions.get('window').width;

function AboutPost({ route }) {
  const PostId = route.params?.PostId ?? 0;
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [isShort, setIsShort] = useState(true);

  const infoAbout = useSelector((state) => state.movies.infoAbout) ?? false;

  const InfoList = Object.keys(infoAbout)
    .map((key, index) => {
      if (index > 5 && isShort) {
        return '';
      }
      return infoAbout[key] === 'N/A' ? '' : `${key}:  ${infoAbout[key]} \n`;
    })
    .filter((el) => el !== '');

  useEffect(() => {
    dispatch(FindDetails(PostId));
    return () => dispatch(ClearInfoAbout());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{ ...styles.margins, marginBottom: Math.max(insets.bottom, 10) }}
      >
        <AutoHeightImage
          width={windowsWidth - 40}
          source={{ uri: infoAbout.Poster }}
        />
        <Text style={styles.InfoListStyle}>{InfoList}</Text>
        {isShort ? (
          <Text style={styles.TextLink} onPress={() => setIsShort(false)}>
            See more...
          </Text>
        ) : (
          <Text style={styles.TextLink} onPress={() => setIsShort(true)}>
            {' '}
            See less...
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

export default AboutPost;

const styles = StyleSheet.create({
  InfoListStyle: {
    fontSize: 15,
    marginTop: 40,
  },
  TextLink: {
    color: colors.linkColor,
  },
  margins: {
    margin: 20,
  },
  container: {
    flex: 1,
  },
});
