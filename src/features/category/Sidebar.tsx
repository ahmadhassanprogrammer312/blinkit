import React, { FC, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { screenHeight } from '../../utils/Scalling';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../../components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../utils/Constants';
import { transform } from 'typescript';

interface SidebarProps{
    selectedCategory: any;
    categories: any;
    onCategoryPress: (category:any)=>void
}


const Sidebar:FC<SidebarProps> = ({selectedCategory, categories, onCategoryPress}) => {

    const scrollViewRef = useRef<ScrollView>(null);

    const indicatorPosition = useSharedValue(0);
    const animatedValues = categories?.map(()=>useSharedValue(0));

    useEffect(()=>{
        let targetIndex = -1
        categories?.forEach((category: any, index: number) => {
            const isSelected= selectedCategory?._id === category?._id
            animatedValues[index].value = withTiming(isSelected ? 2 : -15, {duration: 500})
            if(isSelected){
                targetIndex=index 
            }
            
        });


        if(targetIndex!==-1){
            indicatorPosition.value = withTiming(targetIndex*100, {duration: 500})
            runOnJS(()=>{
                scrollViewRef.current?.scrollTo({
                    y: targetIndex*100,
                    animated: true
                })
            })
        }
        console.log(indicatorStyle)
    },[selectedCategory])

    const indicatorStyle = useAnimatedStyle(()=>({
        transform: [{translateY: indicatorPosition.value}]
    }))
    


  return (
    <View style={styles.sidebar}>
      <ScrollView 
      ref={scrollViewRef} 
      contentContainerStyle={{paddingBottom:50}} 
      showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.indicator, indicatorStyle]}/>
        <Animated.View>
            {categories?.map((category:any, index:number)=>{
                const animatedStyle = useAnimatedStyle(()=>({
                    bottom: animatedValues[index].value
                }))


                return (
                    <TouchableOpacity 
                    key={index}
                    onPress={()=>onCategoryPress(category)}
                    activeOpacity={1}
                    style={styles.categoryButton}>
                    
                    <View style={[styles.imageContainer,
                        selectedCategory?.id === category?.id && styles.selectedImageContainer
                    ]}>
                        <Animated.Image 
                        source={{uri:category.image}}
                        style={[styles.image, animatedStyle]}
                        />
                    </View>
                    <CustomText fontSize={RFValue(7)} style={{textAlign:'center'}}>
                        {category?.name}
                    </CustomText>
                    </TouchableOpacity>
                )
            })}
        </Animated.View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    sidebar:{
        width: '24%',
        backgroundColor:'#fff',
        borderRightWidth: 0.8,
        borderRightColor:'#eee',
        position: 'relative',
        // height: screenHeight
        // height:'100%'
    },
    categoryButton:{
        padding:10,
        paddingVertical:0,
        height:100,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
    },
    imageContainer:{
        borderRadius:100,
        height:'50%',
        marginBottom:10,
        width:'75%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F3F4F7',
        overflow:'hidden'
    },
    image:{
        width:'80%',
        height:'80%',
        resizeMode:'contain',
    },
    selectedImageContainer:{
        backgroundColor:'#CFFFDB',
    },
    indicator:{
        position:'absolute',
        right:0,
        width:4,
        height:80,
        top:10,
        alignSelf:'center',
        backgroundColor:Colors.secondary,
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15, 
    }

})

export default Sidebar