import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { BuyDataRef } from "../../config/firebase";
import { addDoc, serverTimestamp, query, where, getDocs, } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { UserInfoRef } from "../../config/firebase";
import { limit } from "firebase/firestore";
import AppStyle from "../../theme";
import Icons from "../../assest";
import formatPrice from "../../component/fomartPrice";
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/slices/cart';
import { addDays, format } from "date-fns";

const CheckoutScreen = ({ route }) => {
    const { cartItems, getTotalPriceSale, getTotalPrice } = route.params;
    const { user } = useSelector(state => state.user);
    const [userInfo, setUserInfo] = useState(null);
    const navigation = useNavigation();
    const [hasUserInfo, setHasUserInfo] = useState(false);
    const [deliveryTime, setDeliveryTime] = useState("");
    const [attachContent, setAttachContent] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const dispatch = useDispatch(); 
    const estimatedDeliveryDate = addDays(new Date(), 2);

    const formattedEstimatedDeliveryDate = format(estimatedDeliveryDate, " 'Ngày' dd 'tháng' MM 'năm' yyyy");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    const q = query(UserInfoRef(), where('userId', '==', user.uid), limit(1));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const data = querySnapshot.docs[0].data();
                        setUserInfo(data);
                        setHasUserInfo(true); // Đánh dấu là đã có thông tin cá nhân
                        console.log(data);
                    } else {
                        console.log('No documents found for the current user!');
                    }
                } else {
                    console.log('No user information available!');
                    navigation.navigate('CreateUserInfo'); // Chuyển hướng đến màn hình CreateUserInfo
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
            }
        };

        fetchData();
    }, [user]); // Chạy lại effect khi user thay đổi

    // Kiểm tra nếu không có thông tin cá nhân, hiển thị thông báo và không cho phép thanh toán
    const handleCheckout = async () => {
        if (!hasUserInfo) {
            Alert.alert('Thông báo', 'Bạn phải thiết lập thông tin cá nhân trước khi thanh toán!', [
                { text: 'Đóng', onPress: () => console.log('OK Pressed') }
            ]);
            return;
        }

        if (!selectedPaymentMethod) {
            Alert.alert('Thông báo', 'Bạn phải chọn hình thức thanh toán', [
                { text: 'Đóng', onPress: () => console.log('OK Pressed') }
            ]);
            return;
        }

        try {
            const docRef = await addDoc(BuyDataRef(), {
                totalPriceSale: getTotalPriceSale(),
                totalPrice: getTotalPrice(),
                cartItems: cartItems,
                orderStatus: 1,
                EstimatedDeliveryTime: formattedEstimatedDeliveryDate, // Sử dụng ngày giao hàng dự kiến đã tính toán
                userInfo: userInfo,
                timestamp: serverTimestamp(),
                deliveryTime: deliveryTime,
                attachContent: attachContent,
                selectedPaymentMethod: selectedPaymentMethod,
            });
            Alert.alert('Đặt hàng thành công', 'Nhân viên sẽ gọi xác nhận thông tin khách hàng', [
                { text: 'Đóng', onPress: () => dispatch(clearCart()) } // Sử dụng dispatch để gọi hàm clearCart
            ]);


            setTimeout(() => {
                navigation.goBack(); // Quay về màn hình trước đó sau 10 giây
            }, 10); // 10000 milliseconds = 10 giây
            // Thông báo thành công hoặc chuyển người dùng đến màn hình khác
            console.log("Thanh toán thành công! Document ID: ", docRef.id);
        } catch (error) {
            console.error("Lỗi khi thanh toán:", error);
        }
    };


    const CartInfoView = () => {
        return (
            <View style={AppStyle.CheckoutScreenStyle.cartInfoView}>
                <Text style={AppStyle.CheckoutScreenStyle.cartInfoTitle}>
                    Tổng giá trị đơn hàng</Text>
                <Text style={AppStyle.CheckoutScreenStyle.cartInfoPriceSale}>
                    {formatPrice(getTotalPriceSale())}₫
                </Text>
                <Text style={AppStyle.CheckoutScreenStyle.cartInfoPrice}>
                    giá gốc: {formatPrice(getTotalPrice())}₫
                </Text>
            </View>
        )
    }

    const PaymentByCard = () => {
        setSelectedPaymentMethod('card');
        Alert.alert('Tính năng chưa được hỗ trợ');
    };

    const PaymentIncash = () => {
        setSelectedPaymentMethod('cash');
    };

    const PaymentMethodsView = () => {
        return (
            <View style={AppStyle.CheckoutScreenStyle.paymentMethodsView}>
                <Text style={AppStyle.CheckoutScreenStyle.cartInfoTitle}>
                    Hình thức thanh toán
                </Text>
                <View style={AppStyle.CheckoutScreenStyle.paymentMethodsButtomView}>
                    <TouchableOpacity
                        onPress={PaymentIncash}
                        style={[
                            AppStyle.CheckoutScreenStyle.paymentMethodsButtomStyle,
                            { backgroundColor: selectedPaymentMethod === 'cash' ? '#FF9966' : '#FFF' }
                        ]}
                    >
                        <Text style={AppStyle.CheckoutScreenStyle.paymentMethodsButtomText}>
                            Thanh toán khi nhận hàng
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={PaymentByCard}
                        style={[
                            AppStyle.CheckoutScreenStyle.paymentMethodsButtomStyle,
                            { backgroundColor: selectedPaymentMethod === 'card' ? '#FF9966' : '#FFF' }
                        ]}
                    >
                        <Text style={AppStyle.CheckoutScreenStyle.paymentMethodsButtomText}>
                            Pay
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            AppStyle.CheckoutScreenStyle.paymentMethodsButtomStyle,
                            { backgroundColor: selectedPaymentMethod === 'other' ? '#FF9966' : '#FFF' }
                        ]}
                    >
                        <Text style={AppStyle.CheckoutScreenStyle.paymentMethodsButtomText}>
                            ...
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }



    return (
        <View style={AppStyle.CheckoutScreenStyle.container}>
            <View style={AppStyle.CheckoutScreenStyle.tabView}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={AppStyle.CheckoutScreenStyle.goBackButtomStyle}
                >
                    <Image
                        source={Icons.ArrowIcon}
                        style={AppStyle.CheckoutScreenStyle.goBackButtomIcon}
                    />
                </TouchableOpacity>
                <View
                    style={AppStyle.CheckoutScreenStyle.tabViewTitleView}
                >
                    <Text
                        style={{
                            fontSize: 23,
                            fontWeight: "300",
                            letterSpacing: 1
                        }}
                    >
                        Thông tin thanh toán
                    </Text>
                </View>
            </View>
            <CartInfoView />
            <PaymentMethodsView />

            <View style={AppStyle.CheckoutScreenStyle.enterInformationView}>
                <Text style={AppStyle.CheckoutScreenStyle.cartInfoTitle}>
                    Nội dung thiệp đính kèm
                </Text>
                <TextInput
                    placeholder="Chúc mừng sinh nhật"
                    onChangeText={text => setAttachContent(text)}
                    value={attachContent}
                    multiline={true} // Cho phép nhập nhiều dòng
                    style={[AppStyle.CheckoutScreenStyle.textInputContentView]} // Sử dụng flex để TextInput tự động mở rộng chiều rộng
                />
                <Text
                style = {AppStyle.CheckoutScreenStyle.estimatedDeliveryDateText}
                >
                   Giao hàng dự kiến: {formattedEstimatedDeliveryDate}
                </Text>
                <Text style={AppStyle.CheckoutScreenStyle.cartInfoTitle}>
                  Giờ nhận hàng 
                </Text>
                <TextInput
                    placeholder="Thời gian cụ thể"
                    onChangeText={text => setDeliveryTime(text)}
                    value={deliveryTime}
                    style={AppStyle.CheckoutScreenStyle.textInputView}
                />
            </View>

            <View style={AppStyle.CheckoutScreenStyle.userInfoView}>
                <Text style={AppStyle.CheckoutScreenStyle.cartInfoTitle}>
                    Thông tin người nhận
                </Text>
                {userInfo ? (
                    <View>
                        <Text
                            style={AppStyle.CheckoutScreenStyle.userInfoName}
                        >
                            {userInfo.fullName}
                        </Text>
                        <Text
                            style={AppStyle.CheckoutScreenStyle.userInfoPhone}
                        >
                            Điện thoại: {userInfo.phoneNumber}
                        </Text>
                        <Text
                            style={AppStyle.CheckoutScreenStyle.userInfoAddress}
                        >
                            Địa chỉ: {userInfo.address}
                        </Text>
                    </View>
                ) : (
                    <View style={AppStyle.CheckoutScreenStyle.userInfoNullView}>
                        <Text style={AppStyle.CheckoutScreenStyle.userInfoNullTitle}>
                            Bạn chưa tạo thông tin người dùng
                        </Text>
                        <Text>Vui lòng tạo thông tin để có thể đặt hàng</Text>

                        <TouchableOpacity
                            style={AppStyle.CheckoutScreenStyle.userInfoNullButtom}
                            onPress={() => navigation.navigate('CreateUserInfo')}
                        >
                            <Text
                                style={AppStyle.CheckoutScreenStyle.userInfoNullButtomText}
                            >
                                Tạo ngay
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <TouchableOpacity
                onPress={handleCheckout}
                style={AppStyle.CheckoutScreenStyle.handleCheckoutButtom}
            >
                <Text
                    style={AppStyle.CheckoutScreenStyle.handleCheckoutButtomText}
                >
                    Đặt hàng
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default CheckoutScreen;
