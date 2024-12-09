import { useEffect, useState } from "react";
import { Keyboard } from "react-native";


export default function useKeyboardOfsetHeight() {
    const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);
    useEffect(()=>{
        const KeyboardWillAndroidShowListner = Keyboard.addListener('keyboardDidShow' , e=>{
            setKeyboardOffsetHeight(e.endCoordinates.height)
        })
        const KeyboardWillAndroidHideListner = Keyboard.addListener('keyboardDidHide' , e=>{
            setKeyboardOffsetHeight(0)
        })
        const KeyboardWillShowListner = Keyboard.addListener('keyboardWillShow' , e=>{
            setKeyboardOffsetHeight(e.endCoordinates.height)
        })
        const KeyboardWillHideListner = Keyboard.addListener('keyboardWillHide' , e=>{
            setKeyboardOffsetHeight(0)
        })

        return ()=>{
            KeyboardWillAndroidShowListner.remove();
            KeyboardWillAndroidHideListner.remove();
            KeyboardWillShowListner.remove();
            KeyboardWillHideListner.remove();
            
        }
    },[])
    return keyboardOffsetHeight;
}