import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState, FC, useRef, useEffect } from "react";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import ProductSlider from "../../components/login/ProductSlider";
import { navigate, resetAndNavigate } from "../../utils/NavigationUtils";
import CustomText from "../../components/ui/CustomText";
import { Colors, Fonts, lightColors } from "../../utils/Constants";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import CustomInput from "../../components/ui/CustomInput";
import CustomButton from "../../components/ui/CustomButton";
import useKeyboardOfsetHeight from "../../utils/useKeyboardOffsetHeight";
// import { Colors } from 'react-native/Libraries/NewAppScreen';

import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { customerLogin } from "../../service/authService";
// import LinearGradient from 'react-native-linear-gradient';
// import KeyboardOffsetHeight from useKeyboardOfsetHeight()
// import useKeyboardOfsetHeight from '../../utils/useKeyboardOffsetHeight';
const CustomerLogin: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);

  // Keyboard Animation Handling
  const keyboardOffsetHeight = useKeyboardOfsetHeight();
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  // importing Custotom Fonsts
  const [fontsLoaded] = useFonts({
    "Okra-Regular": require("../../../assets/fonts/Okra-Regular.ttf"),
    "Okra-Medium": require("../../../assets/fonts/Okra-Medium.ttf"),
    "Okra-MediumLight": require("../../../assets/fonts/Okra-MediumLight.ttf"),
    "Okra-Bold": require("../../../assets/fonts/Okra-Bold.ttf"),
    "Okra-ExtraBold": require("../../../assets/fonts/Okra-ExtraBold.ttf"),
    "Itim-Regular": require("../../../assets/fonts/Itim-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await customerLogin(phoneNumber);
      resetAndNavigate("ProductDashboard");
    } catch (error) {
      Alert.alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };
  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction = "";
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? "right" : "left";
      } else {
        direction = translationY > 0 ? "down" : "up";
      }
      console.log(translationX, translationY, direction);
      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);
      if (newSequence.join(" ") === "up up down left right") {
        setGestureSequence([]);
        resetAndNavigate("DeliveryLogin");
      }
    }
  };
  const bottomColors = [...lightColors].reverse();
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}
              style={{ transform: [{ translateY: animatedValue }] }}
            >
              {/*  */}
              <LinearGradient colors={bottomColors} style={styles.gradient} />
              <View style={styles.content}>
                <Image
                  source={require("@assets/images/logo.png")}
                  style={styles.logo}
                />
                <CustomText varient="h2" fontFamily={Fonts.Itim}>
                  Pakistan's last minute app.
                </CustomText>
                <CustomText
                  style={styles.text}
                  varient="h5"
                  fontFamily={Fonts.Itim}
                >
                  Login or Signup
                </CustomText>

                {/* Login Page Phone Number Input Field */}
                <CustomInput
                  onChangeText={(text) => {
                    setPhoneNumber(text.slice(0, 10));
                  }}
                  onClear={() => setPhoneNumber("")}
                  value={phoneNumber}
                  left={
                    <CustomText
                      style={styles.phoneText}
                      varient="h6"
                      fontFamily={Fonts.SemiBold}
                    >
                      +92
                    </CustomText>
                  }
                  placeholder="Enter Phone Number"
                  inputMode="numeric"
                />

                {/* Continue (Login) Button */}
                <CustomButton
                  title="Continue"
                  disabled={phoneNumber?.length != 10}
                  onPress={() => handleAuth()}
                  loading={loading}
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
        {/* <View style={styles.footer}>
            <CustomText fontSize={RFValue(6)}>
              By continuing, you agree to our Terms of Service & Privacy Policy.
            </CustomText>
          <SafeAreaView>
          </SafeAreaView>
        </View> */}
      </View>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  subContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  phoneText: {
    marginLeft: 10,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  footer: {
    // borderTopWidth: 0.8,
    // borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    backgroundColor: "#f8f9fc",
    width: "100%",
    marginTop: 30
  },
  gradient: {
    padding: 60,
    width: "100%",
  },
});
export default CustomerLogin;
