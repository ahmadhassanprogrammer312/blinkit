import { TextStyle, View, Text, StyleSheet } from "react-native";
import { Colors, Fonts } from "../../utils/Constants";
import { FC, ReactNode } from "react";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
    varient?: 
    "h1" |
    "h2" |
    "h3" |
    "h4" |
    "h5" |
    "h6" |
    "h7" |
    "h8" |
    "h9" |
    "body";
    fontFamily?: Fonts;
    fontSize?: number;
    style?: TextStyle | TextStyle[];
    children?: ReactNode;
    numberOfLines?:number;
    onLayout?: (event: object) => void;
    
}

const CustomText:FC<Props> = ({
    varient="body", 
    fontFamily=Fonts.Regular, 
    fontSize, 
    style, 
    children, 
    numberOfLines, 
    onLayout,
    ...props
}) => {
    let computeFontSize:number;
    switch(varient){
        case 'h1':
            computeFontSize = RFValue(fontSize || 22)
            break;
        case 'h2':
            computeFontSize = RFValue(fontSize || 20)
            break;
        case 'h3':
            computeFontSize = RFValue(fontSize || 18)
            break;
        case 'h4':
            computeFontSize = RFValue(fontSize || 16)
            break;
        case 'h5':
            computeFontSize = RFValue(fontSize || 14)
            break;
        case 'h6':
            computeFontSize = RFValue(fontSize || 12)
            break;
        case 'h7':
            computeFontSize = RFValue(fontSize || 12)
            break;
        case 'h8':
            computeFontSize = RFValue(fontSize || 10)
            break;
        case 'h9':
            computeFontSize = RFValue(fontSize || 9)
            break;
        case 'body':
            computeFontSize = RFValue(fontSize || 12)
            break;
    }
    const fontFamilyStyle = { fontFamily };

    return(
        <Text onLayout={onLayout} style={[
            styles.text, 
            {color: Colors.text, fontSize: computeFontSize}, 
            fontFamilyStyle, 
            style
            ]}
            numberOfLines={numberOfLines !== undefined ? numberOfLines:undefined}
            {...props}
            >
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'left'
    }
});

export default CustomText;