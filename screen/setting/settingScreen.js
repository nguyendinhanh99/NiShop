import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function SettingsScreen() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const addUserInformation = async () => {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        console.error('Người dùng chưa đăng nhập!');
        return;
      }

      const userId = auth.currentUser.uid;

      // Thêm thông tin người dùng vào Firestore và kèm theo ID của người dùng
      await addUserInfoToFirestore(userId, fullName, phoneNumber, address);
      console.log('Thông tin người dùng đã được thêm vào Firestore thành công!');
    } catch (error) {
      console.error('Lỗi khi thêm thông tin người dùng vào Firestore:', error);
    }
  };

  const addUserInfoToFirestore = async (userId, fullName, phoneNumber, address) => {
    try {
      const userInfoCollection = collection(db, 'userInfo');
  
      // Kiểm tra xem dữ liệu userInfo đã tồn tại cho người dùng này chưa
      const userQuery = query(userInfoCollection, where('userId', '==', userId));
      const userSnapshot = await getDocs(userQuery);
  
      if (!userSnapshot.empty) {
        console.error('Người dùng đã có thông tin userInfo trong cơ sở dữ liệu.');
        return; // Không thêm dữ liệu mới nếu đã tồn tại
      }
  
      // Thêm một tài liệu mới vào collection "userInfo" chỉ nếu không có dữ liệu cho người dùng này
      await addDoc(userInfoCollection, {
        userId: userId,
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address,
        createdAt: serverTimestamp(),
        userRole: 1 // Đặt userRole mặc định là 1
      });
  
      console.log('Đã thêm thông tin người dùng vào Firestore thành công!');
    } catch (error) {
      console.error('Lỗi khi thêm thông tin người dùng vào Firestore:', error);
      throw error;
    }
  };
  
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Họ và tên"
        onChangeText={text => setFullName(text)}
        value={fullName}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
      />
      <TextInput
        placeholder="Số điện thoại"
        onChangeText={text => setPhoneNumber(text)}
        value={phoneNumber}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
      />
      <TextInput
        placeholder="Địa chỉ"
        onChangeText={text => setAddress(text)}
        value={address}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
      />
      <Button
        title="Lưu thông tin"
        onPress={addUserInformation}
      />
    </View>
  );
}
