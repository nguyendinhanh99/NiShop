import React from "react";
import { View, Text, Button, TouchableOpacity, ScrollView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../../redux/slices/cart"; // Import hàm clearCart
import AppStyle from "../../theme";
import allProducts from '../../assest/data/allProducts'; // Import data của bạn
import formatPrice from "../../component/fomartPrice";
import Icons from "../../assest";

const CartScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    // Hàm tính tổng số sản phẩm trong giỏ hàng
    const getTotalItems = () => {
        let totalItems = 0;
        cartItems.forEach((item) => {
            totalItems += item.quantity; // Số lượng của mỗi mặt hàng
        });
        return totalItems;
    };

    // Hàm tính tổng tiền trong giỏ hàng
    const getTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            const product = allProducts.find((p) => p.id === item.id);
            totalPrice += product.price * item.quantity; 
        });
        return totalPrice;
    };

    const getTotalPriceSale = () => {
        let totalPriceSale = 0;
        cartItems.forEach((item) => {
            const product = allProducts.find((p) => p.id === item.id);
            totalPriceSale += product.priceSale * item.quantity; // Giá sale của mỗi mặt hàng nhân với số lượng
        });
        return totalPriceSale;
    };

    const saveMoney = (totalPrice, totalPriceSale) => {
        return totalPrice - totalPriceSale; // Trả về số tiền được tiết kiệm
    }

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

    const DeleteEachItem = (productId) => {
        dispatch(removeItem({ id: productId }));
    }

    const SubtractionItem = (productId) => {
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem && existingItem.quantity > 1) {
            // Nếu sản phẩm tồn tại trong giỏ hàng và có số lượng lớn hơn 1
            dispatch(removeItem({ id: productId }));
        }
    }

    const AddItem = (productId) => {
        dispatch(addItem({ id: productId }));
    }

    return (
        <View style={AppStyle.CartScreenStyle.container}>
            <CartInfoView />
            <ScrollView>
                {cartItems.map((item) => (
                    <View key={item.id} style={AppStyle.CartScreenStyle.cartItemView}>
                        <View style={AppStyle.CartScreenStyle.cartItemImageView}>
                            <Image
                                source={item.images[0]}
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
                                        <TouchableOpacity onPress={() => SubtractionItem(item.id)}>
                                            <Text style={AppStyle.CartScreenStyle.cartItemAddButtomAddStyle}>
                                                -
                                            </Text>
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={AppStyle.CartScreenStyle.cartItemAddButtomAddTextStyle}>
                                                {item.quantity}
                                            </Text>
                                        </View>
                                        <TouchableOpacity onPress={() => AddItem(item.id)}>
                                            <Text style={AppStyle.CartScreenStyle.cartItemAddButtomAddStyle}>
                                                +
                                            </Text>
                                        </TouchableOpacity>


                                    </View>
                                </View>
                                <View style={AppStyle.CartScreenStyle.cartItemClearView}>
                                    <TouchableOpacity
                                        onPress={() => DeleteEachItem(item.id)}
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
                style ={{
                    marginBottom: 100
                }}
                />
            </ScrollView>
        </View>
    );
};

export default CartScreen;
