import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assest/color';
import { fontSizes } from '../../assest/fontSize';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const OrderSearchStyle  = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.containerColor,
    },
    tabView : {
        height: 50,

    },
    bodyView : {
        paddingHorizontal: 10,
        marginTop: 10
    },
    bodyTitleStyle: {
        fontSize: fontSizes.title,
        letterSpacing: 1,
        fontWeight: "500",
        color: colors.titleOrderColor,
        marginBottom: 20
    },
    shippingUnitContainer: {
        minHeight: 70,
        backgroundColor: "#fff1f5",
        marginBottom: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    shippingUnitName: {
        color: "#e66b8d",
        fontWeight: "600",
        fontSize: 20
    },
    shippingUnitWorkingTime : {
        color: colors.titleOrderColor,
    },
    shippingUnitHotline : {
        color: "#df9c59",
        fontSize: 18
    }
    
});



export default OrderSearchStyle;
