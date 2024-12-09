import React, { FC } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ScalePress from '../ui/ScalePress';
import { navigate } from '../../utils/NavigationUtils';
import CustomText from '../ui/CustomText';
import { Fonts } from '../../utils/Constants';

const CategoryContainer:FC<{data:any}> = ({data}) => {

    const renderItems = (items:any[]) => {
        return (
            <>
            {items.map((item, index)=>{
            return(
                <ScalePress onPress={()=>navigate("ProductCategories")} key={index} style={styles.item}>
                    <View style={styles.imageContainer}>
                        <Image source={item.image} style={styles.image}/>
                    </View>
                    <CustomText style={styles.text} varient='h8' fontFamily={Fonts.Medium}>{item.name}</CustomText>
                </ScalePress>
            )
        })}</>
    )
    }


  return (
    <View style={styles.container}>
      <View style={styles.row}>
            {renderItems(data?.slice(0,4))}
      </View>
      <View style={styles.row}>
      {renderItems(data?.slice(4))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        marginVertical:15,
    },
    row: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'baseline',
        marginBottom:25,
    },
    item:{
        width: "22%",
        justifyContent: 'center',
        alignItems:'center',
    },
    imageContainer:{
        width: '100%',
        height: 80,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        padding: 6,
        backgroundColor:'#E5F3F3',
        marginBottom:8
    },
    image:{
        width: '100%',
        height: "100%",
        resizeMode:'contain',
    },
    text:{
        textAlign:'center'
    },

})

export default CategoryContainer;