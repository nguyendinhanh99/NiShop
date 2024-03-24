import React from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";
import Icons from "../../../assest";
import { useNavigation } from '@react-navigation/native';
import AppStyle from "../../../theme";
import formatPrice from "../../../component/fomartPrice";

export default function WaitPickupScreen({ route }) {
    const { buyDataWithStatus2 } = route.params;
    const navigation = useNavigation();


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
    return (
        <View style={AppStyle.OrderStatuslStyle.container}>
            <View style={AppStyle.OrderStatuslStyle.tabView}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={AppStyle.OrderStatuslStyle.goBackButtomView}>
                    <Image
                        source={Icons.ArrowIcon}
                        style={AppStyle.OrderStatuslStyle.goBackIconStyle}
                    />
                </TouchableOpacity>
                <View style={AppStyle.OrderStatuslStyle.tabTitleView}>
                    <Text style={AppStyle.OrderStatuslStyle.tabTitleStyle}>
                        Đơn hàng chờ lấy hàng
                    </Text>
                </View>
            </View>
            <View style={AppStyle.OrderStatuslStyle.bodyView}>
                <ScrollView>
                    <View style={{ height: 20 }} />
                    {buyDataWithStatus2.length > 0 ? (
                        buyDataWithStatus2.map((order, index) => (
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
                </ScrollView>
            </View>
        </View>
    );
}
