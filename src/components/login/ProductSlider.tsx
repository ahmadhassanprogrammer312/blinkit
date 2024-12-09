import React, { useMemo, FC, memo } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { imageData } from '../../utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll'
import { screenHeight, screenWidth } from '../../utils/Scalling';
import { transform } from 'typescript';
const ProductSlider = () => {

    const rows = useMemo(()=>{
        const result = [];
        for(let i=0; i<imageData.length; i+=4){
            result.push(imageData.slice(i, i + 4));
        }
        return result;
    },[])
  return (
    <View pointerEvents='none'>
        <AutoScroll style={styles.autoScroll} endPaddingWidth={0} duration={10000}>
            <View style={styles.gridContainer}>
                {rows?.map((row,rowIndex)=>{
                    return( 
                        <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex}/>
                    )
                })}
            </View>
        </AutoScroll>
    </View>
  );
};


// type ImageDataType = {uri: string};
const Row:FC<{ row: ImageSourcePropType[]; rowIndex: number}>=({row, rowIndex})=>{
    return(
        <View style={styles.row}>
            {row.map((image, imageIndex)=>{
                const horizontalShift = rowIndex%2 === 0 ? -18:18;
                return(
                    <View key={imageIndex} style={[styles.itemContainer, {transform: [{translateX: horizontalShift}]}] } >
                        <Image source={image} style={styles.image}/>
                    </View>
                )
            })}
        </View>
    )
}

const MemoizedRow = memo(Row);
const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 10,
        marginHorizontal: 12,
        width: screenWidth * 0.2,
        height: screenHeight * 0.1,
        backgroundColor: '#e9f7f8',
        justifyContent: 'center',
        borderRadius: 25,
        alignItems: 'center',
        paddingBottom: 0
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    autoScroll: {
        position: 'absolute',
        zIndex: -2
    },
    gridContainer: {
        justifyContent: 'center',
        overflow: 'visible',
        alignItems: 'center',

    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})
export default ProductSlider;