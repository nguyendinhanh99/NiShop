import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assest/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const CartIsEmptyStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.containerColor,
        alignItems:"center"
    },
    titleStyle : {
        fontSize: 20,
        color: colors.titleOrderColor
    }
});



export default CartIsEmptyStyle;
