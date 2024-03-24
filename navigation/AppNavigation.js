import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screen/home/homeScreen';
import WelcomeScreen from '../screen/wellcome/wellcomeApp';
import SignUpScreen from '../screen/wellcome/signUpScreen';
import SignInScreen from '../screen/wellcome/SignInScreen';
import UserInfoScreen from '../screen/userInfo/userInfoScreen';
import ProductDetailScreen from '../screen/products/productDetailScreen';
import CartScreen from '../screen/cart/cartScreen';
import CheckoutScreen from '../screen/cart/checkoutScreen';
import ProductSaleDetailScreen from '../screen/products/productSaleDetailScreen';
import OrderSearch from '../screen/userInfo/orderInformation/orderSearch';
import OrderItemDetailScreen from '../screen/userInfo/orderInformation/orderItemDetailScreen';
import WaitConfirmationScreen from '../screen/userInfo/orderInformation/waitConfirmation';
import WaitDeliveryScreen from '../screen/userInfo/orderInformation/WaitDeliveryScreen';
import WaitPickupScreen from '../screen/userInfo/orderInformation/waitPickupScreen';

import { auth } from '../config/firebase';
import { setUser } from '../redux/slices/user';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import EditUserInfoScreen from '../screen/userInfo/editUserInfoScreen';
import CreateUserInfoScreen from '../screen/userInfo/createUserInfoScreen';
import Icons from '../assest';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const getTabIcon = (route, focused) => {
    let iconName;

    if (route.name === 'Home') {
        iconName = focused ? Icons.HomeIcon : Icons.HomeIcon;
    } else if (route.name === 'Tôi') {
        iconName = focused ? Icons.MeIcon : Icons.MeIcon;
    } else if (route.name === 'Giỏ hàng') {
        iconName = focused ? Icons.CartIcon : Icons.CartIcon;
    }
    return <Image source={iconName} 
    style={{ 
        width: 20, 
        height: 20, 
        tintColor: focused ? '#65aea6' : 'gray' 
    }} />;
};

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProductSaleDetail" component={ProductSaleDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
function CartStack() {
    return (
        <Stack.Navigator initialRouteName="cart">
            <Stack.Screen name="cart" component={CartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreateUserInfo" component={CreateUserInfoScreen} options={{ headerShown: false , presentation: "modal"}} />
        </Stack.Navigator>
    );
}

function UserInfoStack() {
    return (
        <Stack.Navigator initialRouteName="tôi">
            <Stack.Screen name="tôi" component={UserInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditUser" component={EditUserInfoScreen} options={{ headerShown: false , presentation: "modal"}} />
            <Stack.Screen name="CreateUserInfo" component={CreateUserInfoScreen} options={{ headerShown: false , presentation: "modal"}} />
            <Stack.Screen name="OrderSearch" component={OrderSearch} options={{ headerShown: false , presentation: "modal"}} />
            <Stack.Screen name="OrderItemDetail" component={OrderItemDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WaitConfirmation" component={WaitConfirmationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WaitPickup" component={WaitPickupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WaitDelivery" component={WaitDeliveryScreen} options={{ headerShown: false }} />


        </Stack.Navigator>
    );
}

const MainAppComponent = () => {
    const cartItems = useSelector(state => state.cart.items); // Lấy danh sách sản phẩm trong giỏ hàng

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => getTabIcon(route, focused),
                tabBarActiveTintColor: '#65aea6',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    position: 'absolute',
                    borderRadius: 40,
                    borderTopWidth: 0,
                    backgroundColor: "rgba(240, 227, 245, 0.8)",
                },
                // Sử dụng tabBarBadge để hiển thị số lượng sản phẩm trong giỏ hàng
                tabBarBadge: route.name === 'Giỏ hàng' ? cartItems.length : null,
            })}
        >
            <Tab.Screen options={{ headerShown: false }} name='Giỏ hàng' component={CartStack} />
            <Tab.Screen options={{ headerShown: false }} name='Home' component={HomeStack} />
            <Tab.Screen options={{ headerShown: false }} name='Tôi' component={UserInfoStack} />
        </Tab.Navigator>
    );
};


function AppNavigation() {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    onAuthStateChanged(auth, (u) => {
      console.log('got user: ', u);
      dispatch(setUser(u));
    });
    if (user) {
        return (
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="MainApp" component={MainAppComponent} />
            </Stack.Navigator>
        );
    } else {
        return (
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="HelloApp" component={WelcomeScreen} />
                <Stack.Screen options={{ headerShown: false, presentation: "modal" }} name="SignIn" component={SignInScreen} />
                <Stack.Screen options={{ headerShown: false, presentation: "modal" }} name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
        );
    }
}



export default AppNavigation
