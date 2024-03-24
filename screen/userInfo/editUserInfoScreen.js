import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { query, where, limit, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import AppStyle from '../../theme';
import { useSelector } from 'react-redux';
import { UserInfoRef } from '../../config/firebase';
import Icons from '../../assest';
import Loading from '../../component/loading';

export default function EditUserInfoScreen({ route, navigation }) {
    const { user } = useSelector(state => state.user);
    const [userInfo, setUserInfo] = useState(null);
    const [newFullName, setNewFullName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false); // State để điều khiển việc hiển thị loading

    const fetchData = async () => {
        try {
            if (user) {
                const q = query(UserInfoRef(), where('userId', '==', user.uid), limit(1));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0].data();
                    const docId = querySnapshot.docs[0].id;
                    setUserInfo({ ...docData, docId });
                    setNewFullName(docData.fullName || '');
                    setNewAddress(docData.address || '');
                    setNewPhoneNumber(docData.phoneNumber || '');
                } else {
                    console.log('No documents found for the current user!');
                }
            } else {
                console.log('No user information available!');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async () => {
        try {
            setLoading(true); // Khi người dùng click vào nút "Save", hiển thị loading
            if (!userInfo || !userInfo.docId) {
                throw new Error('Invalid user data');
            }

            const userRef = doc(db, 'userInfo', userInfo.docId);
            await updateDoc(userRef, {
                fullName: newFullName,
                address: newAddress,
                phoneNumber: newPhoneNumber,
            });
            Alert.alert('Thông báo', 'Dữ liệu đã được cập nhật thành công!');
            navigation.goBack();
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật dữ liệu. Vui lòng thử lại sau.');
        } finally {
            setLoading(false); // Sau khi hoàn thành, ẩn loading
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <View style={AppStyle.EditUserInfoScreenStyle.container}>
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
            <View style={AppStyle.EditUserInfoScreenStyle.titleView}>
                <Text style={AppStyle.EditUserInfoScreenStyle.titleStyle}>
                    Thay đổi thông tin
                </Text>
            </View>

            <View style={AppStyle.EditUserInfoScreenStyle.bodyView}>
                <Text style = {AppStyle.EditUserInfoScreenStyle.bodyTitleStyle}>
                    Họ tên
                </Text>
                <TextInput
                    value={newFullName}
                    onChangeText={setNewFullName}
                    placeholder="Full Name"
                    style={AppStyle.EditUserInfoScreenStyle.textInputView}

                />
                <Text style = {AppStyle.EditUserInfoScreenStyle.bodyTitleStyle}>
                    Số điện thoại
                </Text>
                <TextInput
                    value={newPhoneNumber}
                    onChangeText={setNewPhoneNumber}
                    placeholder="PhoneNumber"
                    style={AppStyle.EditUserInfoScreenStyle.textInputView}
                />
                <Text style = {AppStyle.EditUserInfoScreenStyle.bodyTitleStyle}>
                    Địa chỉ
                </Text>
                <TextInput
                    value={newAddress}
                    onChangeText={setNewAddress}
                    placeholder="Address"
                    style={AppStyle.EditUserInfoScreenStyle.textInputAddressView}
                    multiline={true} // Cho phép nhập nhiều dòng
                />
            </View>
            <TouchableOpacity
            onPress={handleSave}
            style = {AppStyle.EditUserInfoScreenStyle.saveButtomView}
            >
                <Text 
                style = {AppStyle.EditUserInfoScreenStyle.saveButtomTextStyle}
                >
                    Lưu
                </Text>
            </TouchableOpacity>
        </View>
    );
}
