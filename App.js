import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'; 
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Okra-Regular': require('./assets/fonts/Okra-Regular.ttf'),
    'Okra-Medium': require('./assets/fonts/Okra-Medium.ttf'),
    'Okra-MediumLight': require('./assets/fonts/Okra-MediumLight.ttf'),
    'Okra-Bold': require('./assets/fonts/Okra-Bold.ttf'),
    'Okra-ExtraBold': require('./assets/fonts/Okra-ExtraBold.ttf'),
    'Itim-Regular': require('./assets/fonts/Itim-Regular.ttf'),
  });
  // const [ appIsReady, setAppIsReady ] = useState(false);

  // useEffect(()=>{
  //   async function prepare() {
  //     try {
  //       if (!fontsLoaded) {
  //         return <AppLoading />;
  //       }
  //     } catch (e) {
  //       console.warn(e)
  //     }finally{
  //       setAppIsReady(true);
  //     }
  //   }
  //     prepare();
  // },[]);

  const onLayoutRootView = useCallback(async()=>{
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  },[fontsLoaded]);
  if(!fontsLoaded){
    return null
    // <AppLoading />;
  }

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Navigation/>
      </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
