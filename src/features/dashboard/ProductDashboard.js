import { Text, View, Animated as RNAnimated, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { useAuthStore } from "../../state/authStore"
import NoticeAnimation from "./NoticeAnimation";
import { NoticeHeight, screenHeight } from "../../utils/Scalling";
import React, { FC, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Visuals from "./Visuals";
import { CollapsibleContainer, CollapsibleHeaderContainer, CollapsibleScrollView, useCollapsibleContext, withCollapsibleContext } from "@r0b0t3d/react-native-collapsible";
import AnimatedHeader from "./AnimatedHeader";
import { StatusBar } from "expo-status-bar";
import StickySearchBar from "./StickySearchBar";
import Content from "../../components/dashboard/Content";
import CustomText from "../../components/ui/CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { Fonts } from "../../utils/Constants";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/Ionicons';
import { transform } from "typescript";
import withCart from "../cart/WithCart";
const NOTICE_HEIGHT = -(NoticeHeight + 25);

const ProductDashboard = () => {

    const {scrollY, expand} = useCollapsibleContext();
    const previousScroll = useRef(0);
    const backToTopStyle = useAnimatedStyle(()=>{
        const isScrollingUp = scrollY.value < previousScroll.current && scrollY.value > 180;
        const opacity = withTiming(isScrollingUp ? 1 : 0, {duration:300})
        const translateY = withTiming(isScrollingUp ? 0 : 10, {duration:300})
        previousScroll.current=scrollY.value
        return {opacity,
        transform: [{translateY}]}
    })




    const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

    const slideUp = () => {
        RNAnimated.timing(noticePosition, {
            toValue: NOTICE_HEIGHT,
            duration: 1200,
            useNativeDriver: false
        }).start()
        console.log("Notice Up")
    }
    const slideDown = () => {
        RNAnimated.timing(noticePosition, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: false
        }).start()
        console.log("Notice Down")
    }
    useEffect(() => {
        slideDown();
        const timeoutId = setTimeout(() => {
            slideUp();
        }, 3500);
        return () => clearTimeout(timeoutId)
    }, [])

    const { user } = useAuthStore();
    console.log(user);
    return (
        <NoticeAnimation noticePosition={noticePosition}>
            <>
                <Visuals />
                <SafeAreaView />
{/* ------Start ------------- Back to Top Button ----------------- Start --------------- */}
            <Animated.View style={[styles.backToTopButton,backToTopStyle]}>
                <TouchableOpacity
                    onPress={()=>{
                            scrollY.value=0
                            expand();
                    }}
                
                style={{flexDirection:'row', alignItems:'center', gap:6}}>
                    <Icon name='arrow-up-circle-outline' color='white' size={RFValue(14)} />
                    <CustomText varient="h6" fontFamily={Fonts.Itim} style={{color:'white'}}>Back to Top</CustomText>
                </TouchableOpacity>
            </Animated.View>


{/* ------End ------------- Back to Top Button ----------------- End --------------- */}

                <CollapsibleContainer style={styles.panelContainer}>

                    <CollapsibleHeaderContainer containerStyle={styles.transparent}>
                        <AnimatedHeader
                            showNotice={() => {
                                slideDown();
                                const settimeoutId = setTimeout(() => {
                                    slideUp();
                                }, 3500);
                                return () => clearTimeout(settimeoutId)
                            }}
                        />
                        <StickySearchBar />
                    </CollapsibleHeaderContainer>
                    {/* -----End--------Collapsible Header---------End---------------- */}

                    {/* ------Start---------Collapsible Scroll-View------Start------------ */}
                    <CollapsibleScrollView nestedScrollEnabled style={styles.panelContainer} showsVerticalScrollIndicator={false}>
                        <Content />

                        <View style={{ backgroundColor: '#F8F8F8', padding: 20 }}>
                            <CustomText 
                            fontSize={RFValue(32)} 
                            fontFamily={Fonts.Itim} 
                            style={{ opacity: 0.2 }}>
                                Pakistan's last minute app 🍽</CustomText>

                            <CustomText
                                fontFamily={Fonts.Itim}
                                style={{ opacity: 0.2, marginTop: 10, paddingBottom: 100 }}
                                >
                                    Developed By BlueFrost Tech
                                </CustomText>
                        </View>
                    </CollapsibleScrollView>
                    {/* ------End---------Collapsible Scroll-View------End------------ */}


                </CollapsibleContainer>
                <StatusBar style="auto" />
            </>
        </NoticeAnimation>

    )
}

const styles = StyleSheet.create({
    panelContainer: {
        flex: 1,
    },
    transparent: {
        backgroundColor: 'transparent'
    },
    backToTopButton:{
        position:'absolute',
        alignSelf:'center',
        top: Platform.OS == 'ios' ? screenHeight * 0.18 : 120,
        flexDirection: 'row',
        alignItems: 'center',
        gap:4,
        backgroundColor:'black',
        borderRadius:20,
        paddingHorizontal:10,
        paddingVertical:5,
        zIndex:999
    }
})

export default withCart(withCollapsibleContext(ProductDashboard))

// export default ProductDashboard
