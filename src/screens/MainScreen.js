import React, { useCallback, useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  clearSearch, searchMovies, startLoading, startLoadingMore,
} from '../store/actions/movies';
import SimplePoster from '../components/SimplePoster';
import ListEmptyComponent from '../components/ListEmptyComponent';
import FooterIndicator from '../components/FooterIndicator';
import { debounce } from '../helper/debounce';
import SearchBar from '../components/SearchBar';

function MainScreen() {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);

  const MoviesList = useSelector((state) => state.movies.Movies) ?? false;
  const MoviesListToShow = text.length < 3 ? [] : MoviesList;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((entertext) => {
      if (entertext.length >= 3) {
        dispatch(searchMovies(entertext));
      }
    }, 1000),
    [],
  );

  const handleChange = (entertext) => {
    setPage(1);
    setText(entertext);
    dispatch(startLoading());
    if (entertext.length < 3) dispatch(clearSearch());
    return debouncedSave(entertext);
  };
  const onRefresh = useCallback(() => {
    if (text.length >= 3) {
      setIsRefreshing(true);
      setPage(1);
      dispatch(searchMovies(text));
      setIsRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const getMorePosts = () => {
    dispatch(startLoadingMore());
    dispatch(searchMovies(text, page + 1));
    return setPage(page + 1);
  };

  const renderitem = ({ item }) => (
    <SimplePoster
      posterURL={item.Poster}
      title={item.Title}
      type={item.Type}
      year={item.Year}
      id={item.imdbID}
    />
  );

  const memoizedValue = useMemo(() => renderitem, []);

  return (
    <View style={[styles.container, { marginTop: Math.max(insets.top, 16) }]}>
      <Text style={styles.h1}>Search a Movie Title</Text>
      <View style={styles.searchNarContainer}>
        <SearchBar setSearchPhrase={handleChange} searchPhrase={text} />
      </View>

      <FlatList
        removeClippedSubviews
        ListEmptyComponent={ListEmptyComponent}
        data={MoviesListToShow}
        initialNumToRender={5}
        contentContainerStyle={styles.flatlistContainer}
        renderItem={memoizedValue}
        keyExtractor={(item) => item.imdbID.toString()}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        onEndReached={getMorePosts}
        ListFooterComponent={FooterIndicator}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  searchNarContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default MainScreen;
