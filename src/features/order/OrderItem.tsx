import React, { FC } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import CustomText from '../../components/ui/CustomText';
import UniversalAdd from '../../components/ui/UniversalAdd';

const OrderItem:FC<{item: any}> = ({item}) => {
  return (
    <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
            <Image source={{uri: item?.item?.image}} style={styles.img}/>
        </View>
        <View style={{width:'55%'}}>
            <CustomText numberOfLines={2} varient='h8' fontFamily={Fonts.Medium}>
                {item?.item?.name}
            </CustomText>
            <CustomText varient='h9'>
                {item?.item?.quantity}
            </CustomText>
        </View>
        <View style={{width:'20%', alignContent:'center'}}>
            <UniversalAdd item={item.item}/>
            <CustomText 
            varient='h8' 
            fontFamily={Fonts.Medium} 
            style={{alignSelf:'flex-end', marginTop: 4}}>
                Rs:{item.count * item.item.price}
            </CustomText>
        </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
     img:{
        // backgroundColor: Colors.backgroundSecondary,
        height: 40,
        width: 40,
     },
     imageContainer:{
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 15,
        width: '17%',
        // height: '100%',
        alignItems:'center'
     },
     flexRow:{
        alignItems: 'center',
        flexDirection:'row',
        gap: 12,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderTopWidth: 0.6,
        borderTopColor: Colors.border
     },

})
export default OrderItem;