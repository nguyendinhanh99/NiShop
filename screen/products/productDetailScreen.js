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
//import allProducts from '../../assest/data/allProducts';
import { useNavigation } from '@react-navigation/native';
import Icons from '../../assest';
import Swiper from 'react-native-swiper';
import shopInfo from '../../assest/data/shopInfo';
import { addItem } from '../../redux/slices/cart'; // Import addItem từ slice cart
import { useDispatch } from 'react-redux';
import HorizontalOnly from '../../component/horizontalOnly';
import { useRoute } from '@react-navigation/native';


const ProductDetailScreen = () => {
    const route = useRoute();
    const { product } = route.params;
    const navigation = useNavigation();
    const { linkFacebook, phoneNumber, address } = shopInfo[0];
    const dispatch = useDispatch(); // Sử dụng useDispatch để dispatch action


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
                <AddToCartView />
            </View>
        );
    };

    const ImageView = ({ images }) => {
        // Kiểm tra nếu prop images không tồn tại
        if (!images) {
            return null; // Trả về null nếu không có hình ảnh
        }

        return (
            <Swiper
                autoplay={true}
                horizontal={true}
                autoplayTimeout={3000}
                style={{
                    height: 350,
                    margin: 10,
                }}
            >
                {images.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image }}
                        style={AppStyle.ProducDetailScreenStyle.productImage}
                    />
                ))}
            </Swiper>
        );
    };



    const AddToCartView = () => {
        const handleAddToCart = () => {
            const itemToAdd = { ...product, quantity: 1 }; // Thêm trường quantity với giá trị là 1
            dispatch(addItem(itemToAdd)); // Dispatch action để thêm sản phẩm vào giỏ hàng
            Alert.alert('Sản phẩm được thêm vào giỏ hàng', [
                { text: 'Đóng' }
            ]);
            console.log('______Data itemToAdd_____')


            console.log(itemToAdd)
        };

        return (
            <TouchableOpacity
                style={AppStyle.ProducDetailScreenStyle.addToCartButton}
                onPress={handleAddToCart} // Gọi hàm handleAddToCart khi người dùng nhấn vào nút
            >
                <Image
                    source={Icons.AddToCartIcon}
                    style={AppStyle.ProducDetailScreenStyle.addToCartIcon}
                />
            </TouchableOpacity>
        )
    }

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
                    <Text style={AppStyle.ProducDetailScreenStyle.shopInfoNameText}>
                        NiShop
                    </Text>
                </View>
                <View style={AppStyle.ProducDetailScreenStyle.shopInfoButtomView}>
                    <TouchableOpacity
                        onPress={openFacebookPage}
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
        const { productCode } = product; // Lấy productCode từ sản phẩm
        const itemToAdd = { ...product, quantity: 1, productCode }; // Thêm trường quantity và productCode
        dispatch(addItem(itemToAdd)); // Dispatch action để thêm sản phẩm vào giỏ hàng
        Alert.alert('Sản phẩm được thêm vào giỏ hàng', [
            { text: 'Đóng' }
        ]);
    };
    
    return (
        <View style={AppStyle.ProducDetailScreenStyle.container}>
            <StatusBar hidden />
            <TabView />
            <ScrollView>
                <ImageView images={product.images} />
                <HorizontalOnly />
                <EvaluateView />
                <ShopInfoView />
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
                    style={AppStyle.ProducDetailScreenStyle.buyButtomView}
                >
                    <Text
                        style={AppStyle.ProducDetailScreenStyle.buyButtomText}
                    >
                        Thêm vào giỏ hàng
                    </Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    );
};


export default ProductDetailScreen;
