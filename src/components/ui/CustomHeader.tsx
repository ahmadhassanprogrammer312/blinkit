import React, { FC } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '../../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from './CustomText';
const CustomHeader:FC<{title: string; search?: boolean}> = ({title, search}) => {
  return (
    <SafeAreaView>
      <View style={styles.flexRow}>
        <Pressable>
            <Icon name='chevron-back' color={Colors.text} size={RFValue(16)}/>
        </Pressable>
        <CustomText style={styles.text} varient='h5' fontFamily={Fonts.SemiBold}>{title || "Title"}</CustomText>
        <View>{search && <Icon name="search" color={Colors.text} size={RFValue(16)}/>}</View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    flexRow: {
        justifyContent:'space-between',
        alignItems:'center',
        height:60,
        padding: 10,
        flexDirection:'row',
        backgroundColor:'white',
        borderBottomWidth:0.6,
        borderColor:Colors.border
    },
    text:{
        textAlign: 'center',
    }
})

export default CustomHeader;