import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomText from '../../components/ui/CustomText';
import { Colors, Fonts } from '../../utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
// import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons'


const ReportItem:
FC<{
  iconName: string; 
  underline?: boolean; 
  title: string; 
  price: number}>=({iconName, underline, title, price})=>{
    return(
      <View style={[styles.flexRowBetween, {marginBottom: 10}]}>
        <View style={styles.flexRow}>
          <Icon name={iconName} size={RFValue(12)} style={{opacity:0.7}} color={Colors.text}/>
          <CustomText style={{ textDecorationLine:underline ? 'underline' : 'none', textDecorationStyle:'dashed'}} varient='h8'>{title}</CustomText>
        </View>
          <CustomText varient='h8'>RS.{price}</CustomText>
      </View>
    )

}



const BillDetails:FC<{totalItemPrice: number}> = ({totalItemPrice}) => {
  return (
    <View style={styles.container }>
      <CustomText style={styles.text} fontFamily={Fonts.SemiBold}>
        Bill Details
      </CustomText>
      <View style={styles.billContainer}>
        <ReportItem iconName='article' title='Items total' price={totalItemPrice}/>
        <ReportItem iconName='pedal-bike' title='Delivery Charge' price={29}/>
        <ReportItem iconName='shopping-bag' title='Handling Charge' price={3}/>
        <ReportItem iconName='cloudy-snowing' title='Surge Charge' price={2}/>


      </View>
      <View style={[styles.flexRowBetween, {marginBottom:15}]}>
        <CustomText varient='h7' style={styles.text} fontFamily={Fonts.SemiBold}>Grand Total</CustomText>
        <CustomText  style={styles.text} fontFamily={Fonts.SemiBold}>Rs:{totalItemPrice + 34}</CustomText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        borderRadius:15,
        marginVertical:15
    },
    text:{
        marginHorizontal:10,
        marginTop:15,

    },
    billContainer:{
        padding: 10,
        paddingBottom:0,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.7
    },
    flexRowBetween:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
    },
    flexRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:5
    }
})

export default BillDetails;