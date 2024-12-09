import React, { FC } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../ui/CustomText';
import { Fonts } from '../../utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAuthStore } from '../../state/authStore';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
const Header:FC<{showNotice:()=>{}}> = ({showNotice}) => {
  const { user, setUser} = useAuthStore();
  return (
    <View style={styles.subContainer}>
        <TouchableOpacity>
          <CustomText varient='h6' fontFamily={Fonts.Bold} style={styles.text}>
            Delivery in
          </CustomText>
          <View style={styles.flexRowGap}>
              <CustomText varient='h2' fontFamily={Fonts.Bold} style={styles.text}> 
                10 minutes
              </CustomText>
              <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
                <CustomText fontSize={RFValue(8)} fontFamily={Fonts.Bold} style={{color: '#3B4886'}}>
               ⛈️ Rain</CustomText>
              </TouchableOpacity>
          </View>
          <View style={styles.flexRow}>
            <CustomText varient='h6' fontFamily={Fonts.Bold} numberOfLines={1} style={styles.text2}>
                {user?.address || "Nowhere, Somewhere 😅 No Address"}
            </CustomText>
            <Icon name='menu-down' color='#fff' size={RFValue(20)} style={{bottom: -1}}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name='account-circle-outline' size={RFValue(36)} color='#fff'/>
        </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  text:{
    color: "#fff"
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS=='android'? 2: 10,
    justifyContent: 'space-between',
  },
  flexRowGap:{
    flexDirection: 'row',
    alignItems:'center',
    gap: 5
  },
  noticeBtn: {
    backgroundColor: '#E8EAF5',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    bottom: -2

  },
  flexRow:{
    justifyContent:'center',
    alignItems:"center",
    flexDirection:'row',
    // paddingHorizontal: 10,
    gap: 2,
    width: '70%'
  },
  text2: {
    color: "#fff",
    width: "90%",
    textAlign: 'center',
    
  },
})
export default Header