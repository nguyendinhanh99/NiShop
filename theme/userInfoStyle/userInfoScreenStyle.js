import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assest/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const UserInfoScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.containerColor,
    },
    tabView: {
        height: 250,
        backgroundColor: colors.tabViewColor,
        borderBottomEndRadius: 50
    },
    oneFlex: {
        flex: 1
    },
    tabButtomView: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginEnd: 10
    },
    tabButtomIconStyle: {
        height: 25,
        width: 25,
        margin: 10
    },
    userInfoView: {
        flex: 6,
        flexDirection: "row"
    },
    userImageView: {
        flex: 2,
        justifyContent: "center"
    },
    userInfoTextView: {
        flex: 7,
        justifyContent: "center"
    },
    userImageStyle: {
        height: 60,
        width: 60,
        backgroundColor: "#FFF",
        borderRadius: 100,
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    userImageTextStyle: {
        fontSize: 30,
        fontWeight: "500"
    },
    userInfoNameTextStyle: {
        fontSize: 20,
        color: "#FFFF",
        fontWeight: "600"
    },
    userInfoEmailTextStyle: {
        fontSize: 15,
        color: "#FFFF",
        fontWeight: "300"
    },
    userRoleView: {
        height: 20,
        backgroundColor: "#FFF",
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginTop: 5
    },
    userInfoNullTextStyle: {
        fontSize: 17,
        color: "black",
        fontWeight: "300"
    },
    userInfoNullEmailTextStyle: {
        fontSize: 18,
        color: "#FFFF",
        fontWeight: "400"
    },
    bodyView: {
        backgroundColor: "#FFF",
        borderTopLeftRadius: 30,
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 7
    },
    tabBodyView: {
        height: 80,
        backgroundColor: "#ff779d",
        borderRadius: 30,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    tabBodyIconView: {
        height: 35,
        width: 35
    },
    tabBodyButtomView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    tabBodyButtomTextView: {
        fontSize: 10,
        color: "#dcdcdc",
        marginTop: 5
    },
    buyItemView: {
        backgroundColor: "#fde9f2",
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    buyItemInfoView: {
        
    },
    buyItemInfoTotalPriceView: {
        flexDirection: "row"
    },
    buyItemInfoDeliveryTimeView: {
    },
    buyItemOrderStatusView: {
        flexDirection: "row",
        marginTop: 5
    },
    DetailsItemButtom: {
        alignItems: "flex-end",
        flex: 1
    },
    buyItemInfoText: {
        fontSize: 13
    },
    buyItemInfoPriceSaleText: {
        fontSize: 13,
        color: colors.priceSaleColor
    },
    buyItemInfoPriceText: {
        fontSize: 13,
        color: colors.priceColor,
        textDecorationLine: "line-through",
        paddingLeft: 10
    },
    buyItemOrderStatusStyle : {
        fontSize: 15,
        fontWeight: "500"
    },
    DetailsItemButtomText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#708090"
    },
});



export default UserInfoScreenStyle;
