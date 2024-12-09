import React, { FC } from 'react';
import { View, Text, StyleSheet, Animated as RNAnimated } from 'react-native';
import { NoticeHeight } from '../../utils/Scalling';
import Notice from '../../components/dashboard/Notice';
import { StatusBar } from 'expo-status-bar';

const NOTICE_HEIGHT = -(NoticeHeight+12);



const NoticeAnimation:FC<{noticePosition: any, children: React.ReactElement}> = ({noticePosition, children}) => {
  return (
    <View style={styles.container}>
        {/* <StatusBar style='dark'/> */}
        <RNAnimated.View style={[styles.noticeContainer, {transform: [{translateY: noticePosition}]}]}>
            <Notice/>
        </RNAnimated.View>
        <RNAnimated.View style={[styles.contentContainer, 
        {paddingTop: noticePosition.interpolate({
            inputRange:[NOTICE_HEIGHT+5,0], 
            outputRange: [0, NoticeHeight-17]
        })
        }
            
            ]}>
                {children}
        </RNAnimated.View>
    </View>
  );
};
const styles = StyleSheet.create({
    noticeContainer: {
        width:"100%",
        zIndex: 999,
        position: 'absolute'
    },
    contentContainer: {
        flex:1,
        width:'100%',
        // marginLeft: 30
    },
    container: {
        flex:1,
        backgroundColor: '#fff'
    }
})
export default NoticeAnimation;

