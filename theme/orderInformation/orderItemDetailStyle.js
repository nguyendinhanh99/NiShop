import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assest/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const OrderItemDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.containerColor,
    },
    tabView: {
        height: 90,
        backgroundColor: colors.tabViewColor,
        flexDirection: "row",
        alignItems: "flex-end"
    },
    goBackButtomView: {
        backgroundColor: "#FFF",
        borderRadius: 30,
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        margin: 5
    },
    tabTitleView: {
        flex: 1,
        margin: 5
    },
    goBackIconStyle: {
        height: 30,
        width: 30
    },
    tabTitleStyle: {
        fontSize: 25,
        marginLeft: 40,
        fontWeight: "300",
        color: "#FFF",
        letterSpacing: 1
    },
    bodyView: {
        paddingHorizontal: 5,
        marginTop: 10,
        flex:1
    },
    orderStatusView: {
        height: 50,
        margin: 5,
        flexDirection: "row"
    },
    orderStatusIconView: {
        flex: 2,
        justifyContent : "center",
        alignItems: "center"
    },
    orderStatusIconArrowView: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    righArrowStyle: {
        height: 1,
        width: 50,
    },
    orderStatusIconStyle : {
        height: 30,
        width: 30
    },
    orderStatusTextStyle : {
        fontSize: 7,
        marginTop: 3
    },
    cartItemTitleView : {
        height: 30,
        marginTop: 15,
        justifyContent : "center",
        backgroundColor: colors.tabViewColor,
        marginBottom: 5,
        borderTopLeftRadius: 10,
        borderTopEndRadius:10,
    },
    deliveryTime: {
        color: "#FF6600"
    },
    cartItemTitleStyle : {
        fontSize: 18,
        color : "#FFF",
        paddingLeft: 5,
        letterSpacing: 1
    },
    priceInfoView : {
        flexDirection: "row"
    },
    priceSaleInfoText : {
        fontSize: 16,
        color: colors.priceSaleColor,
        letterSpacing: 1,
        fontWeight: "500"
    },
    priceInfoText : {
        fontSize: 16,
        textDecorationLine: "line-through",
        marginLeft: 16,
        color: colors.priceColor,
        letterSpacing: 1
    },
    totalPriceInfoView : {
        flexDirection: "row"
    },
    totalPriceSaleInfoText : {
        fontSize: 18,
        color: colors.priceSaleColor,
        letterSpacing: 1,
        fontWeight: "500"
    },
    totalPriceInfoText : {
        fontSize: 18,
        textDecorationLine: "line-through",
        marginLeft: 15,
        color: colors.priceColor,
        letterSpacing: 1,
        fontWeight: "500"
    },
    cartItemText: {
        fontSize: 16,
        color: colors.titleOrderColor,
        letterSpacing: 1
    },
    attachContent: {
        fontSize: 15,
        fontWeight: "600",
        letterSpacing:1,
        paddingVertical: 3,
        color: colors.tabViewColor,
        marginTop: 5,
        marginBottom: 5
    },
    selectedPaymentMethodText : {
        fontSize: 15,
        fontWeight: "400",
        color: "#D2691E",
        marginTop: 5
    }
});



export default OrderItemDetailStyle;
