const allProducts = [
    {
        id: 1,
        name: 'Hoa cưới cho cặp đôi ',
        price: 100000,
        priceSale: 90000,
        evaluate: 5.1,
        images: [
            require('../FlowerImages/1.jpg'),
            require('../FlowerImages/2.jpg'),
            require('../FlowerImages/3.jpg'),
        ],
        description: "Hoa hồng mang đến sự may mắn, tượng trưng cho sự thành công, phát tài, trong tình yêu nó đại diện cho tình yêu lãng mạn, mãnh liệt và sâu đậm Hoa baby đại diện cho tình yêu chân thành, ngây thơ, trong sáng, ngọt ngào, trong phong thủy nó đem đến may mắn, thành công.Và một số cành lá hoa mix khác.",
        promotionStatus : 1
    },
    { 
        id: 2, 
        name: 'Hoa cưới', 
        price: 300000, 
        priceSale: 290000, 
        evaluate: 4.8, 
        images: [
            require('../FlowerImages/2.jpg'),
            require('../FlowerImages/8.jpg'),
            require('../FlowerImages/9.jpg'),
        ],
        description: "",
        promotionStatus : 1
    },
    { id: 3, name: 'Hoa cưới', price: 500000, priceSale: 490000, evaluate: 3.9, images: [require('../FlowerImages/3.jpg')] },
    { id: 4, name: 'Hoa sinh nhật', price: 600000, priceSale: 590000, evaluate: 5.0, images: [require('../FlowerImages/4.jpg')] },
    { id: 5, name: 'Hoa sinh nhật', price: 200000, priceSale: 190000, evaluate: 4.2, images: [require('../FlowerImages/5.jpg')] },
    { id: 6, name: 'Hoa 8-3', price: 800000, priceSale: 790000, evaluate: 5.0, images: [require('../FlowerImages/6.jpg')] },
    { id: 7, name: 'Hoa 8-3', price: 300000, priceSale: 290000, evaluate: 3.8, images: [require('../FlowerImages/7.jpg')] },
    { id: 8, name: 'Hoa cưới', price: 1000000, priceSale: 990000, evaluate: 5.0, images: [require('../FlowerImages/8.jpg')] },
    { id: 9, name: 'Hoa sinh nhật', price: 200000, priceSale: 190000, evaluate: 4.0, images: [require('../FlowerImages/9.jpg')] },
    { id: 10, name: 'Hoa cúc', price: 120000, priceSale: 110000, evaluate: 3.7, images: [require('../FlowerImages/cuc1.jpg')] },
    { id: 11, name: 'Hoa cúc', price: 380000, priceSale: 290000, evaluate: 4.6, images: [require('../FlowerImages/cuc2.jpg')] },
    { id: 12, name: 'Hoa hồng', price: 290000, priceSale: 190000, evaluate: 4.9, images: [require('../FlowerImages/hong1.jpg')] },
    { id: 13, name: 'Hoa hồng', price: 1990000, priceSale: 909000, evaluate: 5.0, images: [require('../FlowerImages/hong2.jpg')] },
    // Thêm các sản phẩm khác tại đây
];

export default allProducts;
