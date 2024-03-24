import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const CheckoutScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe6ec"
    },
    tabView: {
        height: 90,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15
    },
    goBackButtomStyle: {
        height: 40,
        width: 40,
        borderRadius: 30,
        backgroundColor: "#FFF",
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    goBackButtomIcon: {
        height: 25,
        width: 25,
    },
    tabViewTitleView: {
        width: Width-100,
        justifyContent: "center",
        alignItems: "center",
    },
    cartInfoView: {
        paddingHorizontal: 10,
    },
    cartInfoTitle: {
        fontSize : 18,
        color : "#282828",
        letterSpacing: 1,
        fontWeight: "400"

    },
    cartInfoPriceSale: {
        fontSize : 30,
        color : "#FF9900",
        fontWeight: "600",
        letterSpacing: 2
    },
    cartInfoPrice: {
        fontSize : 15,
        color : "#696969",
        textDecorationLine: "line-through",
        letterSpacing: 1
    },
    paymentMethodsView: {
        paddingHorizontal: 10,
        marginTop:15
    },
    paymentMethodsButtomView : {
        flexDirection: "row",
        marginTop: 5
    },
    paymentMethodsButtomStyle : {
        height: 30,
        backgroundColor: "#FFF",
        borderRadius: 10,
        justifyContent : "center",
        alignItems: "center",
        marginEnd: 10
    },
    paymentMethodsButtomText : {
        fontSize: 15,
        paddingLeft: 20,
        paddingEnd: 20,
        color: "#303030"
    },
    userInfoNullView: {
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    userInfoNullTitle: {
        fontSize: 20,
        fontWeight: "500",
        letterSpacing: 1,
        color: "#FF4500",
        marginBottom: 5
    },
    enterInformationView : {
        paddingHorizontal: 10,
        marginTop: 5
    },
    textInputView : {
        height: 35, 
        borderColor: "gray", 
        borderWidth: 0.3, 
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 20,
        marginTop: 5,
        backgroundColor: "#FFF",
        marginBottom: 5
    },
    textInputContentView : {
        height: 90, 
        borderColor: "gray", 
        borderWidth: 0.3, 
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 18,
        marginTop: 5,
        backgroundColor: "#FFF",
        marginBottom: 5
    },
    userInfoView: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    userInfoName : {
        fontSize: 20,
        letterSpacing: 2,
        paddingTop: 5,
        color : "#FF9900",
        fontWeight: "500"
    },
    userInfoPhone : {
        fontSize: 15,
        letterSpacing: 2,
        paddingTop: 5
    },
    userInfoAddress : {
        fontSize: 15,
        letterSpacing: 2,
        paddingTop: 5
    },
    handleCheckoutButtom : {
        height: 45,
        backgroundColor: "#F08080",
        margin: 20,
        borderRadius: 30,
        justifyContent : "center",
        alignItems: "center"
    },
    handleCheckoutButtomText: {
        color : "#FFF",
        letterSpacing: 2,
        fontSize: 25,
        fontWeight: "500"
    },
    userInfoNullButtom : {
        height : 30,
        width: 200,
        backgroundColor: "#FF6633",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    userInfoNullButtomText : {
        fontSize: 20,
        color: "#FFF"
    },
    estimatedDeliveryDateText : {
        fontSize: 18,
        color : "#FF9900",
    }
});



export default CheckoutScreenStyle;
