import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

function SearchBar({ searchPhrase, setSearchPhrase }) {
  const isTexted = Boolean(searchPhrase);
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {/* search Icon */}
        <Entypo
          name="magnifying-glass"
          size={20}
          color="black"
          onPress={() => {
            setSearchPhrase('');
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Type Here..."
          value={searchPhrase}
          onChangeText={setSearchPhrase}
        />
        {isTexted && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            onPress={() => {
              setSearchPhrase('');
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  searchBar: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 10,
    alignItems: 'center',
    height: 55,
  },
  input: {
    flex: 1,
    fontSize: 20,
    marginLeft: 10,
  },
});

export default SearchBar;
