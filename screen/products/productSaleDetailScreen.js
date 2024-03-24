import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Linking,
    Alert
} from 'react-native';
import AppStyle from '../../theme';
import { useNavigation } from '@react-navigation/native';
import Icons from '../../assest';
import Swiper from 'react-native-swiper';
import shopInfo from '../../assest/data/shopInfo';
import { addItem } from '../../redux/slices/cart'; // Import addItem từ slice cart
import { useDispatch } from 'react-redux';
import hotProducts from '../../assest/data/hotProducts';

const ProductSaleDetailScreen = ({ route }) => {
    const { productId } = route.params;
    const product = hotProducts.find(item => item.id === productId);
    const navigation = useNavigation();
    const { linkFacebook, phoneNumber, address } = shopInfo[0]; 
    const dispatch = useDispatch(); // Sử dụng useDispatch để dispatch action

    const demo = () => {
        console.log(product);
    }
    const openFacebookPage = () => {
        Linking.openURL(linkFacebook); 
    };

    const callShop = () => {
        Linking.openURL(`tel:${phoneNumber}`); 
    };

    const openMap = () => {
        Linking.openURL(address)
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price);
    };

    const TabView = () => {
        return (
            <View style={AppStyle.ProducDetailScreenStyle.tabView}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={AppStyle.ProducDetailScreenStyle.goBackButtomStyle}
                >
                    <Image
                        source={Icons.ArrowIcon}
                        style={AppStyle.ProducDetailScreenStyle.goBackButtomIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const ImageView = ({ images }) => {
        return (
            <Swiper
                autoplay={true}
                horizontal={true}
                autoplayTimeout={3000}
                style={{
                    height: 350,
                    margin: 10
                }}
            >
                <Image
                    source={images}
                    style={AppStyle.ProducDetailScreenStyle.productImage}
                />
            </Swiper>
        );
    };
    


    const EvaluateView = () => {
        return (
            <View style={AppStyle.ProducDetailScreenStyle.evaluateView}>
                <View >
                    <Text
                        style={AppStyle.ProducDetailScreenStyle.evaluateTitle}
                    >Đánh giá</Text>
                </View>
                <View
                    style={AppStyle.ProducDetailScreenStyle.starIconView}
                >
                    <Image
                        source={Icons.StarIcon}
                        style={AppStyle.ProducDetailScreenStyle.starIconStyle}
                    />
                    <Text
                        style={AppStyle.ProducDetailScreenStyle.evaluateNumber}
                    >
                        {product.evaluate}
                    </Text>
                </View>
            </View>
        )
    }

    const ShopInfoView = () => {
        return (
            <View style={AppStyle.ProducDetailScreenStyle.shopInfoView}>
                <View style={AppStyle.ProducDetailScreenStyle.shopInfoNameView}>
                    <Text style = {AppStyle.ProducDetailScreenStyle.shopInfoNameText}>
                        NiShop
                    </Text>
                </View>
                <View style={AppStyle.ProducDetailScreenStyle.shopInfoButtomView}>
                    <TouchableOpacity
                    onPress={demo}
                    >
                        <Image
                            style={AppStyle.ProducDetailScreenStyle.shopInfoButtomIcon}
                            source={Icons.MessengerIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={callShop}
                    >
                        <Image
                            style={AppStyle.ProducDetailScreenStyle.shopInfoButtomIcon}
                            source={Icons.CallIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={openMap}
                    >
                        <Image
                            style={AppStyle.ProducDetailScreenStyle.shopInfoButtomIcon}
                            source={Icons.MapShopIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const handleBuyItem = () => {
        const itemToAdd = { ...product, quantity: 1 }; // Thêm trường quantity với giá trị là 1
        dispatch(addItem(itemToAdd)); // Dispatch action để thêm sản phẩm vào giỏ hàng
        Alert.alert('Sản phẩm được thêm vào giỏ hàng' ,[
            { text: 'Đóng' }
        ]);
        navigation.navigate('')
    };
    return (
        <View style={AppStyle.ProducDetailScreenStyle.container}>
            <StatusBar hidden />
            <TabView />
            <ScrollView>
                <ImageView images={product.images} />
                <View style={AppStyle.ProducDetailScreenStyle.productInfo}>
                    <Text style={AppStyle.ProducDetailScreenStyle.productName}>{product.name}</Text>
                    <Text style={AppStyle.ProducDetailScreenStyle.productInfoPriceSale}>
                        ₫{formatPrice(product.priceSale)}
                        <Text style={AppStyle.ProducDetailScreenStyle.productInfoPrice}>
                            ₫{formatPrice(product.price)}
                        </Text>
                    </Text>
                    <Text style={AppStyle.ProducDetailScreenStyle.productDescription}>Giới thiệu: {product.description}</Text>
                </View>

                <TouchableOpacity
                onPress={handleBuyItem}
                style = {AppStyle.ProducDetailScreenStyle.buyButtomView}
                >
                    <Text
                    style = {AppStyle.ProducDetailScreenStyle.buyButtomText}
                    >
                       Mua ngay
                    </Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    );
};


export default ProductSaleDetailScreen;
