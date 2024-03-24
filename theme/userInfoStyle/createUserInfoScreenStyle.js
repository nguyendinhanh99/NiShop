import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const CreateUserInfoScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#efeff1"
    },
    tabView : {
        height: 55,
        backgroundColor: "#eb7a96",
        justifyContent: "center",
    },
    arrowGoBackIcon : {
        height: 30,
        width: 30,
        marginLeft: 10
    },
    bodyView : {
        height: 700,
        padding:10,
    },
    textInputView : {
        height: 43, 
        borderColor: "gray", 
        borderWidth: 1, 
        marginBottom: 30, 
        paddingHorizontal: 10,
        borderRadius: 15,
        fontSize: 20,
    },
    titleView : {
        height: 40,
        justifyContent : "center",
        alignItems: "center",
        marginBottom: 20
    },
    titleTextSryle : {
        fontSize: 25,
        fontWeight: "500",
        color: "#222222"
    },
    createButtomView : {
        height: 45,
        backgroundColor: '#eb7a96',
        borderRadius: 20,
        justifyContent : "center",
        alignItems: "center"
    },
    createButtomText : {
        fontSize: 25,
        color: "#FFF",
        fontWeight: "500"
    }
});



export default CreateUserInfoScreenStyle;
