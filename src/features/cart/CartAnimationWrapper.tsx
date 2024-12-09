import { FC, useEffect, useRef, useState } from "react"
import { Animated } from "react-native"
import { hocStyles } from "../../styles/GlobalStyles"
import { couldStartTrivia, transform } from "typescript"
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors"



interface CartAnimationWrapperProps {
    cartCount: number,
    children: React.ReactNode
}

const CartAnimationWrapper: FC<CartAnimationWrapperProps> = ({ cartCount, children }) => {

    const slideAnim = useRef(new Animated.Value(0)).current;
    const [hasAnimated, setHasAnimated] = useState(false);
 
    useEffect(() => {
        if (cartCount > 0 && !hasAnimated) {
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start(()=>{
                setHasAnimated(true);
            })
        } else if (cartCount === 0 && hasAnimated) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start(()=>{
                setHasAnimated(false);
            })
        }
    }, [cartCount, hasAnimated])

    const slidUpStyle = {
        transform: [
            {
                translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                })
            }
        ],
        opacity: slideAnim
    }


    return (
        <Animated.View style={[hocStyles.cartContainer, slidUpStyle]}>
            {children}
        </Animated.View>
    )
}

export default CartAnimationWrapper