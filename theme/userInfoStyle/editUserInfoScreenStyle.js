import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const EditUserInfoScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5ebf6",
    },
    titleView : {
        justifyContent : "center",
        alignItems: "center"
    },
    titleStyle : {
        fontSize: 25,
        letterSpacing: 1,
        padding: 10
    },
    bodyView : {
        paddingHorizontal: 5
    },
    textInputView : {
        height: 40, 
        borderColor: "gray", 
        borderWidth: 0.2, 
        borderRadius: 10,
        fontSize: 20,
        marginTop: 5,
        backgroundColor: "#FFF",
        marginBottom: 5,
        padding: 10,
        color: "#202020",
        letterSpacing: 2
    },
    textInputAddressView : {
        height: 100, 
        borderColor: "gray", 
        borderWidth: 0.3, 
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 18,
        marginTop: 5,
        backgroundColor: "#FFF",
        marginBottom: 5,
        color: "#202020",
        letterSpacing: 1
    },
    bodyTitleStyle : {
        fontSize:15,
        marginTop: 5,
        color : "#303030"
    },
    saveButtomView : {
        height: 40,
        backgroundColor: "#FFB6C1",
        marginLeft: 20,
        marginEnd: 20,
        marginTop: 10,
        justifyContent : "center",
        alignItems: "center",
        borderRadius: 20
    },
    saveButtomTextStyle: {
        fontSize: 25,
        letterSpacing: 2,
        fontWeight: "600",
        color: "#FFF"
    }
});



export default EditUserInfoScreenStyle;
