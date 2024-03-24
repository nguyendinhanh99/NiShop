import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const CartScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    cartInfoView: {
        minHeight: 150,
        backgroundColor: "#EDA6B0",
        marginTop: 50,
        margin: 10,
        borderRadius: 25,
        shadowColor: "blue",
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cartInfoTitle: {
        flex: 2.5,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    cartInfoText: {
        flex: 4.5,
        paddingHorizontal: 15,
    },
    cartInfoButtom: {
        flex: 3,
        alignItems: "flex-end",
        marginEnd: 15
    },
    cartInfoTitleStyle: {
        fontSize: 25,
        fontWeight: "400",
        color: "#383838",
        letterSpacing: 2,
    },
    cartInfoButtomStyle: {
        height: 35,
        width: 100,
        backgroundColor: "#FF9900",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    cartInfoButtomText: {
        fontSize: 15,
        color: "#FFF",
        fontWeight: "500"
    },
    cartInfoTextStyle: {
        fontSize: 30,
        color: "#FFF",
        fontWeight: "600",
        marginEnd: 10,
        letterSpacing:2
    },
    cartInfoTextTitle: {
        fontSize: 13,
        color: "#585858",
        letterSpacing:1
    },
    saveMoneyText: {
        fontSize: 15,
        color: "#FFF",
        fontWeight: "300",
    },
    formatPriceView: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    formatPriceSale: {
        textDecorationLine: "line-through",
        color: "#585858",
        fontSize: 24,
        fontWeight: "300",

    },
    cartItemView: {
        height: 100,
        backgroundColor: "#EBDDDF",
        margin: 5,
        borderRadius: 10,
        marginLeft: 10,
        marginEnd: 10,
        flexDirection: "row",
        
    },
    cartItemImageView: {
        flex: 2.5,
        justifyContent: "center",
        alignItems: "center"
    },
    cartItemImageStyle: {
        height: 90,
        width: 80,
        borderRadius: 5
    },
    cartItemInfoView: {
        flex: 7.5
    },
    cartItemInfoNameView: {
        flex: 3,
        justifyContent : "center"
    },
    cartItemInfoPriceView: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center"
    },
    cartItemInfoNameText: {
        fontSize: 20,
        paddingHorizontal: 2,
        color : "#333333",
        fontWeight: "400"
    },
    cartItemInfoPriceText : {
        textDecorationLine: "line-through",
        color: "#585858",
        fontSize: 15,
        fontWeight: "400",
        marginLeft: 10
    },
    cartItemInfoPriceSaleText : {
        color: "#DB7093",
        fontSize: 20,
        fontWeight: "600",
    },
    cartItemAddView: {
        flex: 4,
        flexDirection: "row"
    },
    cartItemClearView: {
        flex: 2,
        justifyContent : "center",
        alignItems: "center"
    },
    cartItemAddButtomView: {
        flex: 8,
        justifyContent : "flex-end",
        margin: 5
    },
    cartItemClearStyle : {
        height: 30,
        width:30
    },
    cartItemAddButtomViewStyle: {
        width: 150,
        flexDirection : "row",
        paddingLeft: 20
    },
    cartItemAddButtomAddStyle : {
        fontSize: 25,
        padding: 5,
        color:"#404040",
    },
    cartItemAddButtomAddTextStyle : {
        fontSize: 25,
        padding: 5,
        color:"#404040",
    },

});



export default CartScreenStyle;
