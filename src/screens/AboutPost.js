import {
  View, Text, Dimensions, StyleSheet, Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoHeightImage from 'react-native-auto-height-image';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { clearInfoAbout, fndDetails } from '../store/actions/movies';
import { colors } from '../theme';
import AboutPostList from '../components/AboutPostList';

function AboutPost() {
  const dispatch = useDispatch();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const windowsWidth = Dimensions.get('window').width;
  const [isShort, setIsShort] = useState(true);
  const postId = route.params?.PostId ?? 0;
  const infoAbout = useSelector((state) => state.movies.infoAbout) ?? false;

  useEffect(() => {
    dispatch(fndDetails(postId));
    return () => dispatch(clearInfoAbout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.margins, { marginBottom: Math.max(insets.bottom, 10) }]}>
        <AutoHeightImage width={windowsWidth - 40} source={{ uri: infoAbout.Poster }} />
        <View style={styles.AboutPostListContainer}>
          <AboutPostList infoAbout={infoAbout} isShort={isShort} />
        </View>
        {isShort ? (
          <Pressable onPress={() => setIsShort(false)}>
            <Text style={styles.textLink} onPress={() => setIsShort(false)}>
              See more...
            </Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => setIsShort(true)}>
            <Text style={styles.textLink}>See less...</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  AboutPostListContainer: {
    marginTop: 20,
  },
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

export default AboutPost;
