import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7f7"
    },
    tabView : {
        height: 95,
    },
    tabViewFlex : {
        backgroundColor: "#f0e5e7",
        flex: 1,
        justifyContent: "flex-end"
    },
    textInputView : {
        height: 40,
        marginBottom: 5,
        width: Width,
        flexDirection: "row",
        paddingLeft: 15,
        paddingEnd: 15,
        
    },
    searchIconStyle: {
        height: 35,
        width: 35,
    },
    textInputViewFlex : {
        flex: 8.3
    },
    searchIconView : {
        flex: 1.7,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffbed4",
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15
    },
    textInputStyle : {
        height: 40, 
        marginBottom: 10, 
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
        fontSize: 20,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        padding: 5
        
    },
    quickSelectionView : {
        height: 35,
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    sortButton: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginEnd: 10,
    },
    sortButtonTitle: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginEnd: 5,
    },
    selectedSortButton: {
        backgroundColor: '#e9d7dc',
        borderColor: '#e9d7dc',
    },
    bannerView : {
        margin: 10
    },
    bannerViewStyle :{
        width: Width
    },
    bannerList : {
        flexDirection: "row",
    },
    bannerProductImage : {
        height: 220,
        width: Width-20,
        borderRadius: 15
    },
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        margin: 5,
        marginBottom: 100
    },
    titleView : {
        height: 30,
        marginTop: 10,
        flexDirection: "row"
    },
    titleTextStyle : {
        fontSize: 22,
        fontWeight: "500",
        paddingLeft: 5
    },
    seeAllButtom : {
        flex:2,
        justifyContent : "flex-end"
    },
    titleTextView : {
        flex : 8,
        justifyContent : "flex-end"
    },
    seeAllButtomText : {
        fontSize: 15,
        fontWeight: "500",
        color: "#df7b95"
    },
    itemContainer: {
        width: '47%',
        marginVertical: 10,
        margin: 5,
        backgroundColor: "#f0e5e7",
        borderRadius: 10
    },
    productImage: {
        width: "100%",
        height: 180,
        borderTopLeftRadius: 10,
        borderTopEndRadius: 10
    },
    productInfoView : {
        height: 65
    },
    productInfoName : {
        fontSize: 15,
        fontWeight: "400",
        paddingLeft: 5,
        color: "#202020",
        marginTop: 2
    },
    productInfoPrice : {
        fontSize: 13,
        fontWeight: "500",
        textDecorationLine: "line-through",
        color: "#808080",
    },
    productInfoPriceSale : {
        fontSize: 13,
        fontWeight: "500",
        paddingLeft: 5,
        color: '#FF6600',
        marginTop: 2
    },
    productInfoNameView: {
        flexDirection: "row",
        height: 30
    },
    starIconStyle: {
        height: 15,
        width:15,
        marginEnd: 5
    },
    evaluateView : {
        flexDirection: "row",
        margin: 5,
        width: 50,
        backgroundColor: "#FFFFE0",
        justifyContent: "center",
        borderColor: "#FFFF00",
        borderWidth: 0.5,
        borderRadius: 20
    }
});



export default HomeScreenStyle;
