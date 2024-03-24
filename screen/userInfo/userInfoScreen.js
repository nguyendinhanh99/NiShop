import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView, Image, Text, RefreshControl, Alert, } from 'react-native';
import { useSelector } from 'react-redux';
import { query, limit, getDocs, where, orderBy } from 'firebase/firestore';
import AppStyle from '../../theme';
import Icons from '../../assest';
import { UserInfoRef, auth } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../assest/color';
import { BuyDataRef } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import NetInfo from "@react-native-community/netinfo";
export default function UserInfoScreen() {
    const { user } = useSelector(state => state.user);
    const [userInfo, setUserInfo] = useState(null);
    const [buyData, setBuyData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const [isConnected, setIsConnected] = useState(true);

    const NetInfoNew = NetInfo;

    const handleLogOut = async () => {
        // Hiển thị hộp thoại xác nhận trước khi đăng xuất
        Alert.alert(
            'Xác nhận đăng xuất',
            'Bạn có muốn đăng xuất không?',
            [
                {
                    text: 'Hủy',
                    onPress: () => console.log('Hủy đăng xuất'),
                    style: 'cancel',
                },
                {
                    text: 'Đăng xuất',
                    onPress: async () => {
                        // Thực hiện đăng xuất nếu người dùng chọn đăng xuất
                        await signOut(auth);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const fetchData = async () => {
        try {
            if (user && isConnected) {
                const q = query(UserInfoRef(), where('userId', '==', user.uid), limit(1));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data();
                    setUserInfo(data);
                    console.log(data);
                } else {
                    console.log('No documents found for the current user!');
                }
            } else {
                console.log('No user information available!');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setRefreshing(false);
        }
    };
    const fetchBuyDatas = async () => {
        try {
            if (user && isConnected) {
                const q = query(
                    BuyDataRef(),
                    where('userInfo.userId', '==', user.uid),
                    orderBy('timestamp', 'desc') // Sắp xếp theo thời gian mới nhất đến cũ nhất
                );
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    setBuyData(data);
                    console.log(data)
                } else {
                    console.log('No buy data found for the current user!');
                }
            } else {
                console.log('No user information available!');
            }
        } catch (error) {
            console.error('Error fetching buy data: ', error);
        } finally {
            setRefreshing(false);
        }
    };

    const showNoInternetAlert = () => {
        Alert.alert(
            'Không có kết nối mạng',
            'Vui lòng kiểm tra kết nối mạng của bạn và thử lại sau.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
        );
    };
    useEffect(() => {
        if (!isConnected) {
            showNoInternetAlert();
        }
    }, [isConnected]);
    useEffect(() => {
        const unsubscribe = NetInfoNew.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        fetchData();
        fetchBuyDatas();
        return () => unsubscribe();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
        fetchBuyDatas();
    };

    const getInitials = (name) => {
        const words = name.split(' ');
        const firstInitial = words[2]?.charAt(0).toUpperCase() || '';
        const secondInitial = words[3]?.charAt(0).toUpperCase() || '';
        return firstInitial + secondInitial;
    };

    const renderOrderStatus = (orderStatus) => {
        let statusText;
        let statusColor;

        switch (orderStatus) {
            case 1:
                statusText = 'Chờ xác nhận...';
                statusColor = '#FF7F50';
                break;
            case 2:
                statusText = 'Chờ lấy hàng...';
                statusColor = '#0000FF';
                break;
            case 3:
                statusText = 'Chờ giao hàng...';
                statusColor = '#F00000';
                break;
            case 4:
                statusText = 'Giao hàng thành công';
                statusColor = 'green';
                break;
            default:
                statusText = 'Trạng thái không xác định';
                statusColor = 'black';
                break;
        }

        return (
            <Text style={[{ color: statusColor }, AppStyle.UserInfoScreenStyle.buyItemOrderStatusStyle]}>{statusText}</Text>
        );
    };
    const handleWaitConfirmationPress = () => {
        if (buyData) {
            const buyDataWithStatus1 = buyData.filter(order => order.orderStatus === 1);
            navigation.navigate('WaitConfirmation', { buyDataWithStatus1 });
        } else {
            Alert.alert('Không có đơn hàng nào ...');
        }
    };
    // Xử lý sự kiện khi người dùng chọn "Chờ lấy hàng"
    const handleWaitPickupPress = () => {
        if (buyData) {
            const buyDataWithStatus2 = buyData.filter(order => order.orderStatus === 2);
            navigation.navigate('WaitPickup', { buyDataWithStatus2 });
        } else {
            Alert.alert('Không có đơn hàng nào ...');
        }
    };

    // Xử lý sự kiện khi người dùng chọn "Chờ giao hàng"
    const handleWaitDeliveryPress = () => {
        if (buyData) {
            const buyDataWithStatus3 = buyData.filter(order => order.orderStatus === 3);
            navigation.navigate('WaitDelivery', { buyDataWithStatus3 });
        } else {
            Alert.alert('Không có đơn hàng nào ...');
        }
    };
    return (
        <View style={AppStyle.UserInfoScreenStyle.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>

                <View style={AppStyle.UserInfoScreenStyle.tabView}>
                    <View style={AppStyle.UserInfoScreenStyle.oneFlex}>
                        <View style={AppStyle.UserInfoScreenStyle.tabButtomView}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("EditUser", { userInfo: userInfo })}
                            >
                                <Image
                                    source={Icons.EditIcon}
                                    style={AppStyle.UserInfoScreenStyle.tabButtomIconStyle}
                                    tintColor={"#FFF"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleLogOut}
                            >
                                <Image
                                    source={Icons.LogOutIcon}
                                    style={AppStyle.UserInfoScreenStyle.tabButtomIconStyle}
                                    tintColor={"#FFF"}
                                />
                            </TouchableOpacity>
                        </View>

                        {userInfo ? (
                            <View style={AppStyle.UserInfoScreenStyle.userInfoView}>
                                <View style={AppStyle.UserInfoScreenStyle.userImageView}>
                                    <TouchableOpacity style={AppStyle.UserInfoScreenStyle.userImageStyle}>
                                        <Text style={AppStyle.UserInfoScreenStyle.userImageTextStyle}>
                                            {userInfo.fullName && getInitials(userInfo.fullName)}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate("EditUser", { userInfo: userInfo })}
                                    style={AppStyle.UserInfoScreenStyle.userInfoTextView}>
                                    <Text style={AppStyle.UserInfoScreenStyle.userInfoNameTextStyle}>
                                        {userInfo.fullName}
                                    </Text>
                                    <Text style={AppStyle.UserInfoScreenStyle.userInfoEmailTextStyle}>
                                        {userInfo.address}
                                    </Text>
                                    <View style={AppStyle.UserInfoScreenStyle.userRoleView}>
                                        <Text>
                                            {userInfo.userRole === 1 ? 'Khách hàng' : userInfo.userRole === 2 ? 'Người bán' : 'Không xác định'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={AppStyle.UserInfoScreenStyle.userInfoView}>
                                <View style={AppStyle.UserInfoScreenStyle.userImageView}>
                                    <TouchableOpacity style={AppStyle.UserInfoScreenStyle.userImageStyle}>
                                        <Image
                                            source={Icons.UserIcon}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={AppStyle.UserInfoScreenStyle.userInfoTextView}
                                    onPress={() => navigation.navigate("CreateUserInfo")}>
                                    <Text style={AppStyle.UserInfoScreenStyle.userInfoNameTextStyle}>
                                        NiShop xin chào !
                                    </Text>
                                    <Text style={AppStyle.UserInfoScreenStyle.userInfoNullEmailTextStyle}>
                                        {user.email}
                                    </Text>
                                    <Text style={AppStyle.UserInfoScreenStyle.userInfoNullTextStyle}>
                                        Chưa thiết lập thông tin cá nhân
                                    </Text>
                                    <View style={AppStyle.UserInfoScreenStyle.userRoleView}>
                                        <Text>
                                            tạo thông tin
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}


                    </View>
                </View>

                <View style={{
                    backgroundColor: colors.tabViewColor,
                    marginBottom: 100
                }}>
                    <View style={AppStyle.UserInfoScreenStyle.bodyView}>
                        <View style={AppStyle.UserInfoScreenStyle.tabBodyView}>
                            <TouchableOpacity
                                onPress={handleWaitConfirmationPress}
                                style={AppStyle.UserInfoScreenStyle.tabBodyButtomView}>
                                <Image
                                    source={Icons.ChecklistsIcon}
                                    style={AppStyle.UserInfoScreenStyle.tabBodyIconView}
                                    tintColor={"#FFF"}
                                />
                                <Text
                                    style={AppStyle.UserInfoScreenStyle.tabBodyButtomTextView}

                                >
                                    Chờ xác nhận
                                    <Text style={{
                                        color: "#00FF00",
                                        fontWeight: "800"
                                    }}>
                                        ({buyData ? buyData.filter(order => order.orderStatus === 1).length : 0})
                                    </Text>
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={AppStyle.UserInfoScreenStyle.tabBodyButtomView}
                                onPress={handleWaitPickupPress}
                            >
                                <Image
                                    source={Icons.GoodsIcon}
                                    style={AppStyle.UserInfoScreenStyle.tabBodyIconView}
                                    tintColor={"#FFF"}
                                />
                                <Text
                                    style={AppStyle.UserInfoScreenStyle.tabBodyButtomTextView}
                                >
                                    Chờ lấy hàng
                                    <Text style={{
                                        color: "#00FF00",
                                        fontWeight: "800"
                                    }}>
                                        ({buyData ? buyData.filter(order => order.orderStatus === 2).length : 0})
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleWaitDeliveryPress}
                                style={AppStyle.UserInfoScreenStyle.tabBodyButtomView}
                            >
                                <Image
                                    source={Icons.DeliveryCarIcon}
                                    style={AppStyle.UserInfoScreenStyle.tabBodyIconView}
                                    tintColor={"#FFF"}
                                />
                                <Text
                                    style={AppStyle.UserInfoScreenStyle.tabBodyButtomTextView}
                                >
                                    Chờ giao hàng
                                    <Text style={{
                                        color: "#00FF00",
                                        fontWeight: "800"
                                    }}>
                                        ({buyData ? buyData.filter(order => order.orderStatus === 3).length : 0})
                                    </Text>
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={AppStyle.UserInfoScreenStyle.tabBodyButtomView}
                                onPress={() => navigation.navigate('OrderSearch')}
                            >
                                <Image
                                    source={Icons.OrderDeliveryIcon}
                                    style={AppStyle.UserInfoScreenStyle.tabBodyIconView}
                                    tintColor={"#FFF"}
                                />
                                <Text
                                    style={AppStyle.UserInfoScreenStyle.tabBodyButtomTextView}
                                >
                                    Tra đơn hàng
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {buyData ? (
                            buyData.map((order, index) => (
                                <View key={index} style={AppStyle.UserInfoScreenStyle.buyItemView}>
                                    {order.cartItems.map((item, idx) => (
                                        <View key={idx} style={AppStyle.UserInfoScreenStyle.buyItemInfoView}>
                                            <Text style={AppStyle.UserInfoScreenStyle.buyItemInfoText}>Sản phẩm: {item.name}</Text>
                                            <View style={{
                                                flexDirection: "row"
                                            }}>
                                                <Text style={AppStyle.UserInfoScreenStyle.buyItemInfoPriceSaleText}>Giá: {item.priceSale}₫</Text>
                                                <Text style={AppStyle.UserInfoScreenStyle.buyItemInfoPriceText}>
                                                    {item.price}₫
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                    <View style={AppStyle.UserInfoScreenStyle.buyItemInfoTotalPriceView}>
                                        <Text style={AppStyle.UserInfoScreenStyle.buyItemInfoPriceSaleText}>Tổng thanh toán: {order.totalPriceSale}₫</Text>
                                        <Text style={AppStyle.UserInfoScreenStyle.buyItemInfoPriceText}>{order.totalPrice}₫</Text>
                                    </View>
                                    <View style={AppStyle.UserInfoScreenStyle.buyItemInfoDeliveryTimeView}>
                                        <Text style={AppStyle.UserInfoScreenStyle.buyItemInfoText}>Giao hàng dự kiến: {order.deliveryTime}h {order.EstimatedDeliveryTime}</Text>
                                    </View>
                                    <View style={AppStyle.UserInfoScreenStyle.buyItemOrderStatusView}>
                                        <Text>{renderOrderStatus(order.orderStatus)}</Text>
                                        <TouchableOpacity
                                            style={AppStyle.UserInfoScreenStyle.DetailsItemButtom}
                                            onPress={() => navigation.navigate('OrderItemDetail', { orderDetail: order })}
                                        >
                                            <Text style={AppStyle.UserInfoScreenStyle.DetailsItemButtomText}>
                                                Xem chi tiết
                                            </Text>
                                        </TouchableOpacity>



                                    </View>
                                </View>
                            ))
                        ) : (
                            <View style={AppStyle.CartIsEmptyStyle.container}>
                                <Text
                                    style={AppStyle.CartIsEmptyStyle.titleStyle}
                                >Không có đơn hàng nào gần đây...</Text>
                            </View>
                        )}


                    </View>

                </View>



            </ScrollView>
        </View>

    )
}
