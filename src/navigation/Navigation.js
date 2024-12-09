import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '@features/auth/SplashScreen';
import { navigationRef } from '@utils/NavigationUtils';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import ProductDashboard  from '../features/dashboard/ProductDashboard';
import DeliveryDashboard from '../features/delivery/DeliveryDashboard';
import SplashScreenComponent from '../features/auth/SplashScreen';
import ProductCategories from '../features/category/ProductCategories';
import ProductOrder from '../features/order/ProductOrder';
import OrderSuccess from '../features/order/OrderSuccess';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='SplashScreenComponent' screenOptions={{headerShown:false}}>
            <Stack.Screen name='SplashScreenComponent' component={SplashScreenComponent} />
            <Stack.Screen name='ProductDashboard' component={ProductDashboard} />
            <Stack.Screen name='DeliveryLogin' component={DeliveryLogin} options={{animation: 'fade'}}/>
            <Stack.Screen name='CustomerLogin' component={CustomerLogin} options={{animation: 'fade'}}/>
            <Stack.Screen name='DeliveryDashboard' component={DeliveryDashboard} options={{animation: 'fade'}}/>
            <Stack.Screen name='ProductCategories' component={ProductCategories} options={{animation: 'fade'}}/>
            <Stack.Screen name='ProductOrder' component={ProductOrder} options={{animation: 'fade'}}/>
            <Stack.Screen name='OrderSuccess' component={OrderSuccess} options={{animation: 'fade'}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation