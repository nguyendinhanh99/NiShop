import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppStyle from "../../../theme";
import Icons from "../../../assest";
import formatPrice from "../../../component/fomartPrice";

export default function OrderItemDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const orderDetail = route.params?.orderDetail;

    return (
        <View style={AppStyle.OrderItemDetailStyle}>
            <View style={AppStyle.OrderItemDetailStyle.tabView}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={AppStyle.OrderItemDetailStyle.goBackButtomView}>
                    <Image
                        source={Icons.ArrowIcon}
                        style={AppStyle.OrderItemDetailStyle.goBackIconStyle}
                    />
                </TouchableOpacity>
                <View style={AppStyle.OrderItemDetailStyle.tabTitleView}>
                    <Text style={AppStyle.OrderItemDetailStyle.tabTitleStyle}>
                        Thông tin đơn hàng
                    </Text>
                </View>
            </View>
            <View>
                <ScrollView>
                {orderDetail && (
                    <View style={AppStyle.OrderItemDetailStyle.bodyView}>
                        <View style={AppStyle.OrderItemDetailStyle.orderStatusView}>
                            <View style={AppStyle.OrderItemDetailStyle.orderStatusIconView}>
                                <Image
                                    source={Icons.ChecklistsIcon}
                                    style={[AppStyle.OrderItemDetailStyle.orderStatusIconStyle, { tintColor: orderDetail.orderStatus === 1 ? '#ff779f' : 'gray' }]}
                                />
                                <Text style={[AppStyle.OrderItemDetailStyle.orderStatusTextStyle, { color: orderDetail.orderStatus === 1 ? '#ff779f' : 'gray' }]}>
                                    Chờ xác nhận
                                </Text>
                            </View>
                            <View style={AppStyle.OrderItemDetailStyle.orderStatusIconArrowView}>
                                <View
                                    style={[AppStyle.OrderItemDetailStyle.righArrowStyle, { backgroundColor: orderDetail.orderStatus === 1 ? '#ff779f' : 'gray' }]}
                                />
                            </View>
                            <View style={AppStyle.OrderItemDetailStyle.orderStatusIconView}>
                                <Image
                                    source={Icons.GoodsIcon}
                                    style={[AppStyle.OrderItemDetailStyle.orderStatusIconStyle, { tintColor: orderDetail.orderStatus === 2 ? '#ff779f' : 'gray' }]}
                                />
                                <Text style={[AppStyle.OrderItemDetailStyle.orderStatusTextStyle, { color: orderDetail.orderStatus === 2 ? '#ff779f' : 'gray' }]}>
                                    Chờ lấy hàng
                                </Text>
                            </View>
                            <View style={AppStyle.OrderItemDetailStyle.orderStatusIconArrowView}>
                                <View
                                    style={[AppStyle.OrderItemDetailStyle.righArrowStyle, { backgroundColor: orderDetail.orderStatus === 2 ? '#ff779f' : 'gray' }]}
                                />
                            </View>
                            <View style={AppStyle.OrderItemDetailStyle.orderStatusIconView}>
                                <Image
                                    source={Icons.DeliveryCarIcon}
                                    style={[AppStyle.OrderItemDetailStyle.orderStatusIconStyle, { tintColor: orderDetail.orderStatus === 3 ? '#ff779f' : 'gray' }]}
                                />
                                <Text style={[AppStyle.OrderItemDetailStyle.orderStatusTextStyle, { color: orderDetail.orderStatus === 3 ? '#ff779f' : 'gray' }]}>
                                    Chờ giao hàng
                                </Text>
                            </View>
                            <View style={AppStyle.OrderItemDetailStyle.orderStatusIconArrowView}>
                                <View
                                    style={[AppStyle.OrderItemDetailStyle.righArrowStyle, { backgroundColor: orderDetail.orderStatus === 3 ? '#ff779f' : 'gray' }]}
                                />
                            </View>
                            <View style={AppStyle.OrderItemDetailStyle.orderStatusIconView}>
                                <Image
                                    source={Icons.Deliveredicon}
                                    style={[AppStyle.OrderItemDetailStyle.orderStatusIconStyle, { tintColor: orderDetail.orderStatus === 4 ? 'green' : 'gray' }]}
                                />
                                <Text style={[AppStyle.OrderItemDetailStyle.orderStatusTextStyle, { color: orderDetail.orderStatus === 4 ? 'green' : 'gray' }]}>
                                    Đã giao hàng
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text style={AppStyle.OrderItemDetailStyle.deliveryTime}>
                                Giao hàng dự kiến: {orderDetail.deliveryTime} {orderDetail.EstimatedDeliveryTime}
                            </Text>
                        </View>

                        <View style={AppStyle.OrderItemDetailStyle.cartItemTitleView}>
                            <Text style={AppStyle.OrderItemDetailStyle.cartItemTitleStyle}>
                                Thông tin sản phẩm
                            </Text>
                        </View>
                        {orderDetail.cartItems.map((item, index) => (
                            <View key={index}>
                                <Text
                                    style={AppStyle.OrderItemDetailStyle.cartItemText}
                                >Sản phẩm: {item.name}</Text>
                                <View style={AppStyle.OrderItemDetailStyle.priceInfoView}>
                                    <Text style={AppStyle.OrderItemDetailStyle.priceSaleInfoText}>Giá:{formatPrice(item.priceSale)}₫ (SL:{item.quantity})</Text>
                                    <Text style={AppStyle.OrderItemDetailStyle.priceInfoText}>{formatPrice(item.price)}₫</Text>
                                </View>
                            </View>
                        ))}
                        <Text style={AppStyle.OrderItemDetailStyle.attachContent}>
                            Lời chúc: {orderDetail.attachContent}
                        </Text>
                        <View style={AppStyle.OrderItemDetailStyle.totalPriceInfoView}>
                            <Text style={AppStyle.OrderItemDetailStyle.totalPriceSaleInfoText}>
                                Thanh toán: {formatPrice(orderDetail.totalPriceSale)}₫
                            </Text>
                            <Text style={AppStyle.OrderItemDetailStyle.totalPriceInfoText}>
                                {formatPrice(orderDetail.totalPrice)}₫
                            </Text>
                        </View>
                        <View>
                            {orderDetail.selectedPaymentMethod === 'cash' ? (
                                <Text
                                style = {AppStyle.OrderItemDetailStyle.selectedPaymentMethodText}
                                >Hình thức thanh toán: Thanh toán khi nhận hàng</Text>
                            ) : (
                                <Text>{orderDetail.selectedPaymentMethod}</Text>
                            )}
                        </View>


                        <View style={AppStyle.OrderItemDetailStyle.cartItemTitleView}>
                            <Text style={AppStyle.OrderItemDetailStyle.cartItemTitleStyle}>
                                Thông tin người nhận
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={AppStyle.OrderItemDetailStyle.cartItemText}
                            >
                                Tên: {orderDetail.userInfo.fullName}
                            </Text>
                            <Text
                                style={AppStyle.OrderItemDetailStyle.cartItemText}
                            >
                                Địa chỉ: {orderDetail.userInfo.address}
                            </Text>
                            <Text
                                style={AppStyle.OrderItemDetailStyle.cartItemText}
                            >
                                Số điện thoại: {orderDetail.userInfo.phoneNumber}
                            </Text>
                        </View>
                    </View>
                )}
            </ScrollView>
            </View>
        </View>
    );
}
