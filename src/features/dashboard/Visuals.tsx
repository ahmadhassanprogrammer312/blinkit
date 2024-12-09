import React, { FC } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { darkWeatherColors } from '../../utils/Constants';
import LottieView from 'lottie-react-native';
import { NoticeHeight, screenHeight, screenWidth } from '../../utils/Scalling';
import { useCollapsibleContext } from '@r0b0t3d/react-native-collapsible';

const Visuals:FC = () => {
  const {scrollY} = useCollapsibleContext();
  const headerAnimatedStyle = useAnimatedStyle(()=>{
    const opacity = interpolate(scrollY.value, [0,120], [1,0]);
    return {opacity}
  })



  return (
    <View>
      <Animated.View style={[styles.container, headerAnimatedStyle]}>
        <LinearGradient colors={darkWeatherColors} style={styles.gradient}/>
        <Image source={require("@assets/images/cloud.png")} style={styles.cloud}/>
        <LottieView 
        autoPlay={true}
        enableMergePathsAndroidForKitKatAndAbove={true}
        loop={true}
        style={styles.lottie}
        source={require("@assets/animations/raining.json")}


        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        position: 'absolute'
    },
    gradient: {
        width: '100%',
        position: 'absolute',
        height: screenHeight * 0.4
    },
    cloud:{
        width: screenWidth,
        resizeMode: 'stretch',
        height: 100
    },
    lottie:{
        width: '100%',
        height: 150,
        position: 'absolute',
        transform: [{scaleX: -1}]
    }
})


export default Visuals;