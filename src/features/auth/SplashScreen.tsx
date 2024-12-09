import { View, Text, StyleSheet, Image, Alert } from "react-native";
import React, { useEffect } from "react";
// import { Colors } from '@utils/Constants.tsx'
// import LogoImage from "./assets/images/splash_logo.jpeg"
// import { screenHeight, screenWidth } from '@utils/Scalling';
// import GeoLocation from '@react-native-community/geolocation';
import * as Location from "expo-location";
// import { useAuthStore } from '@state/authStore';
// import { tokenStorage } from '@state/storage';
// import { resetAndNavigate } from '@utils/NavigationUtils';
import { jwtDecode } from "jwt-decode";
import { screenHeight, screenWidth } from "../../utils/Scalling";
import { resetAndNavigate } from "../../utils/NavigationUtils";
import { tokenStorage } from "../../state/storage";
import { useAuthStore } from "../../state/authStore";
import { Colors } from "../../utils/Constants";
import LogoImage from "../../assets/images/splash_logo.jpeg";
import { refetchUser, refresh_tokens } from "../../service/authService";
// import * as SplashScreen from 'expo-splash-screen';

// GeoLocation.setRNConfiguration({
//     skipPermissionRequests: false,
//     authorizationLevel: 'always',
//     enableBackgroundLocationUpdates: true,
//     locationProvider: 'auto'
// })

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();
interface DecodedToken {
  exp: number;
}
const SplashScreenComponent = () => {
  const { user, setUser } = useAuthStore();

  const tokenCheck = async () => {
    
    const accessTokenObj = (await tokenStorage.getItem("accessToken"));
    const accessToken = accessTokenObj;
    console.log(`A.Token: ${accessToken}`)
    console.log("Access Token is: ", accessToken)
    console.log("User ", user)
    console.log("set User ", setUser)
    
    const refreshTokenObj = (await tokenStorage.getItem("refreshToken"));
    const refreshToken = refreshTokenObj;
    console.log(`R.Token: ${refreshToken}`)
    console.log("Refresh Token is: ", refreshToken)
    
    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      console.log(`Decode A.Token: ${decodedAccessToken}`)
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
      console.log(`Decode R.Token: ${decodedRefreshToken}`)

      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate("CustomerLogin");
        Alert.alert("Session Expired", "Please Login again");
        return false;
      }
      if (decodedAccessToken?.exp < currentTime) {
        try {
          await refresh_tokens();
          await refetchUser(setUser);
          console.log(setUser)
        } catch (error) {
            console.log(error);
            Alert.alert("There was an error refreshing token.");
            return false;
        }
      }
      if(user?.role === 'Customer'){
        // await SplashScreen.hideAsync();
        resetAndNavigate("ProductDashboard");
      } else{
        // await SplashScreen.hideAsync();
        resetAndNavigate("DeliveryDashboard")
      }
      // if(accessToken === null){
      //   resetAndNavigate("CustomerLogin")
      // }
      return true;
    } if(accessToken === null){

      resetAndNavigate("CustomerLogin");
    }
    return false;
  //   // await SplashScreen.hideAsync();
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        // Request permission to access location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          // await SplashScreen.hideAsync();
          return;
        }

        // Get current location
        let location = await Location.getCurrentPositionAsync({});
        tokenCheck();
        console.log("User Location:", location);
      } catch (error) {
        Alert.alert(
          "Sorry we need location service to give you better shopping experience"
        );
        // await SplashScreen.hideAsync();
      }
    };
    const timeoutId = setTimeout(fetchUserLocation, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={LogoImage} style={styles.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: "contain",
  },
});

export default SplashScreenComponent;
