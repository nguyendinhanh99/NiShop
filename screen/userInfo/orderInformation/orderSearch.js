import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Linking
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icons from "../../../assest";
import AppStyle from "../../../theme";
import ListOfShippingUnits from "../../../assest/data/ListOfShippingUnits";

export default function OrderSearch() {
    
    const navigation = useNavigation();
    
    // Render một đơn vị vận chuyển
    const renderShippingUnit = (shippingUnit) => {
        return (
            <TouchableOpacity
                key={shippingUnit.id}
                style={AppStyle.OrderSearchStyle.shippingUnitContainer}
                onPress={() => {
                    // Mở URL của đơn vị vận chuyển khi được nhấn
                    Linking.openURL(shippingUnit.url);
                }}
            >
                <Text style={AppStyle.OrderSearchStyle.shippingUnitName}>
                    {shippingUnit.nameShiping}
                </Text>
                <Text style={AppStyle.OrderSearchStyle.shippingUnitWorkingTime}>
                    Thời gian làm việc: {shippingUnit.workingTime}
                </Text>
                {shippingUnit.hotLine && (
                    <Text style={AppStyle.OrderSearchStyle.shippingUnitHotline}>
                        Hotline: {shippingUnit.hotLine}
                    </Text>
                )}
            </TouchableOpacity>
        );
    };
    
    return (
        <View style={AppStyle.OrderSearchStyle.container}>
            <TouchableOpacity
                style={AppStyle.CreateUserInfoScreenStyle.tabView}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={Icons.ArrowIcon}
                    style={AppStyle.CreateUserInfoScreenStyle.arrowGoBackIcon}
                    tintColor={"#FFF"}
                />
            </TouchableOpacity>
            <View style={AppStyle.OrderSearchStyle.bodyView}>
                <Text style={AppStyle.OrderSearchStyle.bodyTitleStyle}>
                    Tra cứu đơn hàng nhanh
                </Text>
                {ListOfShippingUnits.map((shippingUnit) => renderShippingUnit(shippingUnit))}
            </View>
        </View>
    );
}
