import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const ProducDetailScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabView: {
        height: 85,
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: "#ffe6ec"
    },
    goBackButtomStyle: {
        height: 40,
        width: 40,
        borderRadius: 30,
        backgroundColor: "#FFF",
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    goBackButtomIcon: {
        height: 25,
        width: 25,
    },
    productImage: {
        width: Width - 20,
        height: 350,
        marginBottom: 10,
        borderRadius: 10
    },
    addToCartButton: {
        flex: 8,
        alignItems: "flex-end",
    },
    addToCartIcon: {
        height: 45,
        width: 45,
        marginEnd: 10

    },
    evaluateView: {
        height: 30,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5
    },
    starIconView: {
        justifyContent: "flex-end",
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    starIconStyle: {
        height: 20,
        width: 20,
        marginEnd: 5
    },
    evaluateNumber: {
        fontSize: 20,
        fontWeight: "700",
        color: "#696969",
        marginEnd: 30
    },
    evaluateTitle: {
        fontSize: 18,
        fontWeight: "300",
        color: "#696969",
        marginLeft: 10
    },
    productInfoPrice: {
        fontSize: 20,
        textDecorationLine: "line-through",
        color: "#808080",
    },
    productInfoPriceSale: {
        fontSize: 20,
        color: '#FF6600',
        marginBottom: 5
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    shopInfoView: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10
    },
    shopInfoNameView: {
        flex: 5,
        justifyContent: "center",

    },
    shopInfoButtomView: {
        flex: 5,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    shopInfoButtomIcon: {
        height: 30,
        width: 30,
        marginEnd: 20
    },
    shopInfoNameText: {
        fontSize: 23,
        fontWeight: "600",
        paddingLeft: 10
    },
    productDescription: {
        fontSize: 16,
    },
    productInfo: {
        paddingHorizontal: 10,
        marginBottom: 20
    },
    buyButtomView: {
        height: 45,
        backgroundColor: "#F08080",
        marginBottom: 100,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40
    },
    buyButtomText: {
        fontSize: 25,
        color: "#FFF",
        letterSpacing: 2,
        fontWeight: "500"
    },
});



export default ProducDetailScreenStyle;
