import { query, getDocs } from "firebase/firestore";
import { AllProductionRef } from "./firebase"; // Import your Firestore reference here

// Hàm để lấy tất cả dữ liệu sản phẩm
export const allProducts = async () => {
    try {
        const q = query(
            AllProductionRef(),
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs.map(doc => doc.data());
        } else {
            console.log('Không tìm thấy dữ liệu sản phẩm!');
            return [];
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm: ', error);
        return [];
    }
};
