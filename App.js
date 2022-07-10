// import {StatusBar} from 'expo-status-bar';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
// import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/store';
import Navigation from './src/navigation/Navigation';

export default function App() {
  const appIsReady = true;
  // const [appIsReady, setAppIsReady] = useState(false);
  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //     } catch (e) {
  //     } finally {
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}>
          <Navigation />
          {/* <StatusBar style="auto" /> */}
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
