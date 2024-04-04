import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput
} from 'react-native';
import AppStyle from '../../theme';
//import allProducts from '../../assest/data/allProducts'
import hotProducts from '../../assest/data/hotProducts';
import Icons from '../../assest';
import Swiper from 'react-native-swiper';
import { AllProductionRef } from '../../config/firebase';
import { query, getDocs } from "firebase/firestore";
import Loading from '../../component/loading';


const HomeScreen = ({ navigation }) => {
    const [sortBy, setSortBy] = useState('price');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleProducts, setVisibleProducts] = useState(2);
    const [sortByPriceAsc, setSortByPriceAsc] = useState(false);
const [sortByPriceDesc, setSortByPriceDesc] = useState(false);





    const fetchAllDatas = async () => {
        try {
            const q = query(AllProductionRef());
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const data = querySnapshot.docs.map(doc => doc.data());
                setAllProducts(data);
            } else {
                console.log('Không tìm thấy dữ liệu sản phẩm!');
            }
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllDatas();
    }, []);

    const handleLoadMore = () => {
        const currentCount = visibleProducts;
        const totalCount = allProducts.length;
        const remainingCount = totalCount - currentCount;
        const loadCount = Math.min(20, remainingCount);
        if (remainingCount > 0) {
            setVisibleProducts(currentCount + loadCount);
        }
    };

    const formatPrice = (price) => {
        if (!price || isNaN(price)) {
            return "0";
        }
        return new Intl.NumberFormat("vi-VN").format(price);
    };
    const handleSearch = (text) => {
        setSearchKeyword(text);
    };

    const renderProduct = (product) => {
        if (searchKeyword && !product.name.toLowerCase().includes(searchKeyword.toLowerCase())) {
            return null; // Không hiển thị sản phẩm nếu không khớp từ khóa tìm kiếm
        }
    
        // Kiểm tra và sắp xếp sản phẩm dựa trên state sortBy
        if (sortBy === 'price') {
            // Sắp xếp giá tăng dần
            allProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === '-price') {
            // Sắp xếp giá giảm dần
            allProducts.sort((a, b) => b.price - a.price);
        }
        return (
            <TouchableOpacity
                key={product.id}
                style={AppStyle.HomeScreenStyle.itemContainer}
                onPress={() => navigation.navigate('ProductDetail', { product: product })}
            >
                <Image
                    source={{ uri: product.images[0] }}
                    style={AppStyle.HomeScreenStyle.productImage}
                    onError={(error) => console.log('Lỗi khi tải hình ảnh:', error)}//
                />

                <View style={AppStyle.HomeScreenStyle.productInfoView}>
                    <View style={AppStyle.productInfoNameView}>
                        <Text style={AppStyle.HomeScreenStyle.productInfoName}>
                            {product.name}
                        </Text>
                    </View>
                    <Text style={AppStyle.HomeScreenStyle.productInfoPriceSale}>
                        ₫{formatPrice(product.priceSale)}
                        <Text style={AppStyle.HomeScreenStyle.productInfoPrice}>
                            ₫{formatPrice(product.price)}
                        </Text>
                    </Text>

                    <View style={AppStyle.HomeScreenStyle.evaluateView}>
                        <Image
                            source={Icons.StarIcon}
                            style={AppStyle.HomeScreenStyle.starIconStyle}
                        />
                        <Text>
                            {product.evaluate}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };


    const renderHotProduct = (product) => (
        <View key={product.id} style={AppStyle.HomeScreenStyle.bannerViewStyle} onPress={() => navigation.navigate('ProductSaleDetail', { productId: product.id })}>
            <Image source={product.images} style={AppStyle.HomeScreenStyle.bannerProductImage} />
        </View>
    );

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    const handleSearchButton = () => {
        // Gọi lại hàm handleSearch với giá trị mới của searchKeyword
        handleSearch(searchKeyword);
    };

    const handleSortByPriceAsc = () => {
        setSortByPriceAsc(true);
        setSortByPriceDesc(false);
        setSortBy('price');
    };

    const handleSortByPriceDesc = () => {
        setSortByPriceAsc(false);
        setSortByPriceDesc(true);
        setSortBy('-price');
    };


    return (
        <View style={AppStyle.HomeScreenStyle.container}>
            {loading && <Loading />}

            <View style={AppStyle.HomeScreenStyle.tabView}>
                <View style={AppStyle.HomeScreenStyle.tabViewFlex}>
                    <View style={AppStyle.HomeScreenStyle.textInputView}>
                        <View style={AppStyle.HomeScreenStyle.textInputViewFlex}>
                            <TextInput
                                placeholder="Hoa tươi"
                                onChangeText={handleSearch}
                                value={searchKeyword}
                                multiline={false}
                                style={AppStyle.HomeScreenStyle.textInputStyle}
                            />
                        </View>
                        <TouchableOpacity
                            style={AppStyle.HomeScreenStyle.searchIconView}
                            onPress={handleSearchButton}
                        >
                            <Image
                                source={Icons.SearchIcon}
                                style={AppStyle.HomeScreenStyle.searchIconStyle}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={AppStyle.HomeScreenStyle.quickSelectionView}>
                <View
                    style={AppStyle.HomeScreenStyle.sortButtonTitle}
                >
                    <Text style={styles.sortButtonText}>Lọc theo</Text>
                </View>
                <ScrollView
                    horizontal={true}
                >
                    <TouchableOpacity
                        style={[AppStyle.HomeScreenStyle.sortButton, sortByPriceAsc && AppStyle.HomeScreenStyle.selectedSortButton]}
                        onPress={handleSortByPriceAsc}>
                        <Text style={styles.sortButtonText}>Giá tăng dần</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[AppStyle.HomeScreenStyle.sortButton, sortByPriceDesc && AppStyle.HomeScreenStyle.selectedSortButton]}
                        onPress={handleSortByPriceDesc}>
                        <Text style={styles.sortButtonText}>Giảm dần</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        handleLoadMore();
                    }
                }}
                scrollEventThrottle={400}
            >

                <View style={
                    AppStyle.HomeScreenStyle.titleView
                }>
                    <View
                        style={AppStyle.HomeScreenStyle.titleTextView}
                    >
                        <Text
                            style={AppStyle.HomeScreenStyle.titleTextStyle}
                        >
                            Ưu đãi đặc biệt
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={AppStyle.HomeScreenStyle.seeAllButtom}
                    >
                        <Text
                            style={AppStyle.HomeScreenStyle.seeAllButtomText}
                        >
                            Xem thêm
                        </Text>
                    </TouchableOpacity>
                </View>
                <Swiper
                    autoplay={true}
                    horizontal={true}
                    autoplayTimeout={3000} // Chuyển ảnh tự động sau mỗi 3 giây
                    style={{
                        height: 240
                    }}
                >
                    {hotProducts.map(product => (
                        <View key={product.id} style={AppStyle.HomeScreenStyle.bannerView}>
                            {renderHotProduct(product)}
                        </View>
                    ))}
                </Swiper>
                <View style={
                    AppStyle.HomeScreenStyle.titleView
                }>
                    <View
                        style={AppStyle.HomeScreenStyle.titleTextView}
                    >
                        <Text
                            style={AppStyle.HomeScreenStyle.titleTextStyle}
                        >
                            Sản phẩm mới
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={AppStyle.HomeScreenStyle.seeAllButtom}
                    >
                        <Text
                            style={AppStyle.HomeScreenStyle.seeAllButtomText}
                        >
                            Xem thêm
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.productList}>
                    {/* Render visible products */}
                    {allProducts.slice(0, visibleProducts).map(product => renderProduct(product))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    sortLabel: {
        marginRight: 10,
    },
    sortButtonText: {
        color: '#333',
        fontSize: 16,
    },
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    itemContainer: {
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: 'green',
    },
});

export default HomeScreen;
