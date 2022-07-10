import {
  View, Text, Dimensions, StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoHeightImage from 'react-native-auto-height-image';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { clearInfoAbout, fndDetails } from '../store/actions/movies';
import { colors } from '../theme';
import AboutPostList from '../components/AboutPostList';

const windowsWidth = Dimensions.get('window').width;

function AboutPost({ route }) {
  const postId = route.params?.PostId ?? 0;
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [isShort, setIsShort] = useState(true);

  const infoAbout = useSelector((state) => state.movies.infoAbout) ?? false;

  useEffect(() => {
    dispatch(fndDetails(postId));
    return () => dispatch(clearInfoAbout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ ...styles.margins, marginBottom: Math.max(insets.bottom, 10) }}>
        <AutoHeightImage width={windowsWidth - 40} source={{ uri: infoAbout.Poster }} />
        <View style={{ marginTop: 20 }}>
          <AboutPostList infoAbout={infoAbout} isShort={isShort} />
        </View>
        {isShort ? (
          <Text style={styles.textLink} onPress={() => setIsShort(false)}>
            See more...
          </Text>
        ) : (
          <Text style={styles.textLink} onPress={() => setIsShort(true)}>
            See less...
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

export default AboutPost;

const styles = StyleSheet.create({
  textLink: {
    fontSize: 15,
    color: colors.linkColor,
  },
  margins: {
    margin: 20,
  },
  container: {
    flex: 1,
  },
});
