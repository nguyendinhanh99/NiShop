import React from "react";
import { View, Text, Button, TouchableOpacity, ScrollView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, } from "../../redux/slices/cart"; // Import hàm clearCart
import AppStyle from "../../theme";
import formatPrice from "../../component/fomartPrice";
import Icons from "../../assest";

const CartScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    console.log("______cartItems______")
    console.log(cartItems)
    const getTotalItems = () => {
        let totalItems = 0;
        cartItems.forEach((item) => {
            totalItems += item.quantity;
        });
        return totalItems;
    };

    const getTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });
        return totalPrice;
    };

    const getTotalPriceSale = () => {
        let totalPriceSale = 0;
        cartItems.forEach((item) => {
            totalPriceSale += item.priceSale * item.quantity;
        });
        return totalPriceSale;
    };

    const saveMoney = (totalPrice, totalPriceSale) => {
        return totalPrice - totalPriceSale;
    };

    const totalPrice = getTotalPrice(); // Tính tổng tiền
    const totalPriceSale = getTotalPriceSale(); // Tính tổng tiền sale

    const CartInfoView = () => {
        return (
            <View style={AppStyle.CartScreenStyle.cartInfoView}>
                <View style={AppStyle.CartScreenStyle.cartInfoTitle}>
                    <Text style={AppStyle.CartScreenStyle.cartInfoTitleStyle}>
                        Thông tin giỏ hàng
                    </Text>
                </View>

                <View style={AppStyle.CartScreenStyle.cartInfoText}>

                    <Text
                        style={AppStyle.CartScreenStyle.cartInfoTextTitle}
                    >
                        Tổng thanh toán
                    </Text>

                    <View style={AppStyle.CartScreenStyle.formatPriceView}>
                        <Text style={AppStyle.CartScreenStyle.cartInfoTextStyle}>
                            {formatPrice(totalPriceSale)}đ

                        </Text>
                        <Text
                            style={AppStyle.CartScreenStyle.formatPriceSale}
                        >
                            {formatPrice(totalPrice)}đ
                        </Text>
                    </View>


                    <Text style={AppStyle.CartScreenStyle.saveMoneyText}>
                        Tiết kiệm được: {formatPrice(saveMoney(totalPrice, totalPriceSale))}đ
                    </Text>
                    <Text
                        style={AppStyle.CartScreenStyle.cartInfoTextTitle}
                    >
                        Có {getTotalItems()} sản phẩm
                    </Text>
                </View>

                <View style={AppStyle.CartScreenStyle.cartInfoButtom}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CheckoutScreen', {
                            cartItems: cartItems,
                            getTotalPriceSale: getTotalPriceSale,
                            getTotalPrice: getTotalPrice,
                            getTotalItems: getTotalItems
                        })}
                        style={AppStyle.CartScreenStyle.cartInfoButtomStyle}>
                        <Text
                            style={AppStyle.CartScreenStyle.cartInfoButtomText}
                        >
                            Thanh toán
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    const DeleteEachItem = (productCode) => {
        // Dispatch action để xoá sản phẩm khỏi giỏ hàng với mã productCode
        dispatch(removeItem({ productCode }));
        console.log("Sản phẩm bạn xoá có productCode: " + productCode);
    };

    const SubtractionItem = (productCode) => {
        // Dispatch action để giảm số lượng sản phẩm trong giỏ hàng với mã productCode
        console.log("Sản phẩm bớt có productCode: " + productCode);
    };

    const AddItem = (productCode) => {
        // Dispatch action để thêm sản phẩm vào giỏ hàng với mã productCode
        dispatch(addItem({ productCode }));
        console.log("Sản phẩm thêm có productCode: " + productCode);
    };
    return (
        <View style={AppStyle.CartScreenStyle.container}>
            <CartInfoView />
            <ScrollView>
                {cartItems.map((item) => (
                    <View  key={item.productCode} style={AppStyle.CartScreenStyle.cartItemView}>
                        <View style={AppStyle.CartScreenStyle.cartItemImageView}>
                            <Image
                                source={{ uri: item.images[0] }}
                                style={AppStyle.CartScreenStyle.cartItemImageStyle}
                            />
                        </View>
                        <View style={AppStyle.CartScreenStyle.cartItemInfoView}>
                            <View style={AppStyle.CartScreenStyle.cartItemInfoNameView}>
                                <Text
                                    style={AppStyle.CartScreenStyle.cartItemInfoNameText}
                                >{item.name}</Text>
                            </View>
                            <View style={AppStyle.CartScreenStyle.cartItemInfoPriceView}>
                                <Text
                                    style={AppStyle.CartScreenStyle.cartItemInfoPriceSaleText}

                                >
                                    {item.priceSale}₫
                                </Text>
                                <Text
                                    style={AppStyle.CartScreenStyle.cartItemInfoPriceText}
                                >
                                    {item.price} ₫
                                </Text>
                            </View>
                            <View style={AppStyle.CartScreenStyle.cartItemAddView}>
                                <View style={AppStyle.CartScreenStyle.cartItemAddButtomView}>
                                    <View style={AppStyle.CartScreenStyle.cartItemAddButtomViewStyle}>
                                        <TouchableOpacity onPress={() => SubtractionItem(item.productCode)}>
                                            <Text style={AppStyle.CartScreenStyle.cartItemAddButtomAddStyle}>
                                                -
                                            </Text>
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={AppStyle.CartScreenStyle.cartItemAddButtomAddTextStyle}>
                                                {item.quantity}
                                            </Text>
                                        </View>
                                        <TouchableOpacity onPress={() => AddItem(item.productCode)}>
                                            <Text style={AppStyle.CartScreenStyle.cartItemAddButtomAddStyle}>
                                                +
                                            </Text>
                                        </TouchableOpacity>


                                    </View>
                                </View>
                                <View style={AppStyle.CartScreenStyle.cartItemClearView}>
                                    <TouchableOpacity
                                        onPress={() => DeleteEachItem(item.productCode)}
                                    >
                                        <Image
                                            source={Icons.ClearItemIcon}
                                            style={AppStyle.CartScreenStyle.cartItemClearStyle}
                                            tintColor={"#585858"}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
                <View
                    style={{
                        marginBottom: 100
                    }}
                />
            </ScrollView>
        </View>
    );
};

export default CartScreen;
