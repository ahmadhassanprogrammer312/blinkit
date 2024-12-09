import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { adData, categories } from '../../utils/dummyData';
import AdCarousal from './AdCarousal';
import CustomText from '../ui/CustomText';
import { Fonts } from '../../utils/Constants';
import CategoryContainer from './CategoryContainer';

const Content = () => {
  return (
    <View style={styles.container}>
      <AdCarousal adData={adData}/>
      <CustomText varient='h5' fontFamily={Fonts.SemiBold}>Groccery & Kitchen</CustomText>
      <CategoryContainer data={categories}/>
      <CustomText varient='h5' fontFamily={Fonts.SemiBold}>Best Sellers</CustomText>
      <CategoryContainer data={categories}/>
      <CustomText varient='h5' fontFamily={Fonts.SemiBold}>Research</CustomText>
      <CategoryContainer data={categories}/>
      <CustomText varient='h5' fontFamily={Fonts.SemiBold}>Comming Soon</CustomText>
      <CategoryContainer data={categories}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:20
  }
})

export default Content;