import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Platform, TouchableOpacity, Alert } from 'react-native';
import CustomHeader from '../../components/ui/CustomHeader';
import { Colors, Fonts } from '../../utils/Constants';
import OrderList from './OrderList';
import { useCartStore } from '../../state/cartStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '../../components/ui/CustomText';
import BillDetails from './BillDetails';
import { hocStyles } from '../../styles/GlobalStyles';
import { useAuthStore } from '../../state/authStore';
import ArrowButton from '../../components/ui/ArrowButton';
import { navigate } from '../../utils/NavigationUtils';
import { createOrder } from '../../service/orderService';
// import { createOrder } from '../../service/OrderService';
// import { TouchableOpacity } from 'react-native-gesture-handler';
const ProductOrder:FC = () => {

  const {user, setCurrentOrder, currentOrder} = useAuthStore();
  // const user = useAuthStore((state)=>state.user);
  const {getTotalPrice, cart, clearCart}  = useCartStore();
  const totalItemPrice = getTotalPrice();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async() => {
    if(currentOrder !==null){
      Alert.alert("Let your first order to be delivered.");
      return
    }
    const formattedData = cart.map(item=>({
      id: item._id,
      item: item._id,
      count: item.count
    }))
    if(formattedData.length == 0){
      Alert.alert("Add any items to place order.");
      return
    }
    setLoading(true);
    const data = await createOrder(formattedData, totalItemPrice);
    if(data!=null){
      setCurrentOrder(data);
      clearCart();
      navigate("OrderSuccess", {...data})
    }else{
      Alert.alert("There was an error.");
      console.log("Formatted Data: ",formattedData)
      console.log("Data: ",data)
      // navigate("OrderSuccess", {...data})
    }
    setLoading(false);
  }


  return (
    <View style={styles.container}>
      <CustomHeader title='Checkout'/>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList/>
        <View style={styles.flexRowBetween}>
          <View style={styles.flexRow}>
            <Image source={require('@assets/icons/coupon.png')} style={{width: 25, height: 25}}/>
            <CustomText varient='h6' fontFamily={Fonts.SemiBold}>Use Coupons</CustomText>
          </View>
          <Icon name='chevron-right' size={RFValue(16)} color={Colors.text}/>
        </View>
        <BillDetails totalItemPrice={totalItemPrice} />
        
        <View style={styles.flexRowBetween}>
          <View>
            <CustomText varient='h8' fontFamily={Fonts.SemiBold}>
              Cancellation Policy
            </CustomText>
            <CustomText style={styles.cancelText} varient='h9' fontFamily={Fonts.SemiBold}>
              Order can't be cancelled once act for delivery. In case of unexpected delay, a refund will be provided, if applicable.
            </CustomText>
          </View>
        </View>
      </ScrollView>

      {/* Pay Now Section on Product Order Page */}
      <View style={hocStyles.cartContainer}>
        <View style={styles.absoluteContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.flexRow}>
              <Image source={require("@assets/icons/home.png")} style={{width:20, height:20}}/>
              <View style={{width:'75%'}}>
                <CustomText varient='h8' fontFamily={Fonts.Medium}>Delivering to home</CustomText>
                <CustomText varient='h9' fontFamily={Fonts.SemiBold}>{user?.address || "No address provided"}</CustomText>
              </View>
            </View>
            <TouchableOpacity>
              {/* <CustomText style={{color: Colors.secondary}}>Change</CustomText> */}
              <CustomText style={{color: Colors.secondary}} varient='h8' fontFamily={Fonts.Medium    }>Change</CustomText>
            </TouchableOpacity>
          </View>

          <View style={styles.paymentGateway}>
              <View style={{width:'30%'}}>
                <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Regular}>💵Pay Using</CustomText>
                <CustomText varient='h9' style={{marginTop: 2}} fontFamily={Fonts.Regular}>Cash on Delivery</CustomText>
              </View>
              <View style={{width:'70%'}}>
                <ArrowButton  loading={loading} price={totalItemPrice} title="Place Order" onPress={()=>{handlePlaceOrder()}}/>
              </View>
          </View>
           
        </View>
              {/* absoluteContainer */}
      </View>
              {/* hocContainer */}
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    scrollContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding:10,
        paddingBottom:250
    },
    flexRowBetween:{
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'space-between',
      padding: 10,
      borderRadius:15,
      flexDirection:'row'
    },
    flexRow:{
      alignItems:'center',
      flexDirection:'row',
      gap:10
    },
    cancelText:{
      marginTop:4,
      opacity:0.6
    },
    absoluteContainer:{
      // position:'absolute',
      marginVertical:15,
      marginBottom: Platform.OS? 30: 10,

    },
    addressContainer:{
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'row',
      paddingHorizontal:10,
      paddingBottom:10,
      borderBottomWidth: 0.7,
      borderColor: Colors.border,
    },
    paymentGateway:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingLeft:14
    }

})

export default ProductOrder;