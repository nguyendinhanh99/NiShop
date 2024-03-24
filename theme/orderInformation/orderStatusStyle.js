import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assest/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const OrderStatuslStyle = StyleSheet.create({
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
        margin: 5
    },
    goBackIconStyle: {
        height: 30,
        width: 30
    },
    tabTitleStyle: {
        fontSize: 25,
        marginLeft: 20,
        fontWeight: "300",
        color: "#FFF",
        letterSpacing: 1
    },
    bodyView : {
        flex : 1,
        paddingHorizontal: 5
    }
});



export default OrderStatuslStyle;
