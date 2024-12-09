import React, { FC } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { screenHeight, screenWidth } from '../../utils/Scalling';
import Carousel from 'react-native-reanimated-carousel';
import ScalePress from '../ui/ScalePress';

const AdCarousal:FC<{adData:any}> = ({adData}) => {
  const progressValue = useSharedValue(0);
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenHeight * 0.27
  }
  return (
    <View style={{ marginVertical: 10, left: -20}}>
      <Carousel
      {...baseOptions}
      // style={{width:'100%'}}
      loop
      pagingEnabled
      snapEnabled
      autoPlay
      autoPlayInterval={3000}
      mode='parallax'
      data={adData}
      modeConfig={{parallaxScrollingOffset: 0, parallaxScrollingScale:0.94}}
      renderItem={({item}:any)=>{
        return (
          
              <ScalePress style={styles.imageContainer}>

            <Image source={item} style={styles.img}/>
              </ScalePress>
          
        )
      }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  img:{
    width: '100%',
    height: '100%',
    resizeMode:'stretch',
    borderRadius:30
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    
  }
})

export default AdCarousal;