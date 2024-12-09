import { View, Text, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { deliveryLogin } from '../../service/authService';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { screenHeight } from '../../utils/Scalling';
import LottieView from 'lottie-react-native';
import CustomText from '../../components/ui/CustomText';
import { Fonts } from '../../utils/Constants';
import CustomInput from '../../components/ui/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '../../components/ui/CustomButton';
import { resetAndNavigate } from '../../utils/NavigationUtils';
const DeliveryLogin = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);

const hadleLogin = async () =>{
  setLoading(true);
  try {
    await deliveryLogin(email, password);
  } catch (error) {
    Alert.alert("Login Failed")
  } finally{
    setLoading(false);
    resetAndNavigate("DeliveryDashboard")
  }
}

  return (
    <GestureHandlerRootView>

    <CustomSafeAreaView>
      <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView autoPlay loop style={styles.lottie} source={require("@assets/animations/delivery_man.json")}/>
          </View>
          <CustomText varient='h3' fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText varient='h6' fontFamily={Fonts.Bold} style={styles.text}>
            Faster than Flash🎇
          </CustomText>

          {/* Email Input Field */}
          <CustomInput 
          placeholder='Email'
          onChangeText={setEmail}
          value={email}
          left= {
          <Icon 
            name='mail'
            color='#F8890E' 
            style={{marginLeft:20}} 
            size={RFValue(22)}
            inputMode='email'/>}
            right={false}
          />
          {/* Password Input Field */}
          <CustomInput 
          placeholder='Password'
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          left= {
          <Icon 
            name='key-sharp'
            color='#F8890E' 
            style={{marginLeft:20}} 
            size={RFValue(22)}
            inputMode='password'/>}
            right={false}
          />
          {/* Delivery Login Button */}
          <CustomButton
            disabled={email.length==0 || password.length<8}
            title='Login'
            onPress={hadleLogin}
            loading={loading}
          />

          
        </View>
      </ScrollView>
    </CustomSafeAreaView>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  lottie:{
    height: '100%',
    width: '100%'
  },
  lottieContainer:{
    height: screenHeight * 0.12,
    width: '100%'
  },
  text:{
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8
  }
})

export default DeliveryLogin