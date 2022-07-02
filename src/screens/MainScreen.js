import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '@rneui/base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ClearSearch, SearchMovies, StartLoading, StartLoadingMore } from '../store/actions/movies';
import SimplePoster from '../components/SimplePoster';
import ListEmptyComponent from '../components/ListEmptyComponent';
import FooterIndicator from '../components/FooterIndicator';

function MainScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [text, onChangeText] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const MoviesList = useSelector((state) => state.movies.Movies) ?? false;
  const MoviesListToShow = text.length < 3 ? [] : MoviesList;
  const doSearchMovies = (entertext) => {
    setPage(1);
    onChangeText(entertext);
    if (entertext.length < 3) return dispatch(ClearSearch());
    dispatch(StartLoading());
    return dispatch(SearchMovies(entertext));
  };
  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    dispatch(SearchMovies(text));
    setRefreshing(false);
  };
  const getMorePosts = () => {
    dispatch(StartLoadingMore());
    dispatch(SearchMovies(text, page + 1));
    return setPage(page + 1);
  };
  const renderitem = ({ item }) => <SimplePoster item={item} />;
  const memoizedValue = useMemo(() => renderitem, []);

  return (
    <View style={{ ...styles.container, marginTop: Math.max(insets.top, 16) }}>
      <Text style={styles.h1}>Search a Movie Title</Text>
      <View style={styles.SearchNarContainer}>
        <SearchBar
          lightTheme
          placeholder="Type Here..."
          onChangeText={doSearchMovies}
          containerStyle={styles.SearchBar}
          value={text}
        />
      </View>

      <FlatList
        removeClippedSubviews
        ListEmptyComponent={ListEmptyComponent}
        data={MoviesListToShow}
        initialNumToRender={5}
        contentContainerStyle={styles.FlarlistContainerStyle}
        renderItem={memoizedValue}
        keyExtractor={(item) => item.imdbID.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReached={getMorePosts}
        ListFooterComponent={FooterIndicator}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  SearchBar: {
    width: '80%',
  },
  SearchNarContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlarlistContainerStyle: {
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
