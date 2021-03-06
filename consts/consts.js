/*
* COMMON CONSTS
*/
export const DAY_OF_MONTH = Array.from({length: 31}, (v, k) => k+1)
export const HOUR_OF_DAY = Array.from({length: 25}, (v, k) => ({ hour: k, name: `${k} giờ` }))
export const CITIES = [ 
    { id: "1", name: 'Hà Nội' }
]
export const HANOI_DISTRICTS = [
    { id: "1", name: "Hoàn Kiếm"}, 
    { id: "2", name: "Đống Đa" }, 
    { id: "3", name: "Ba Đình" }, 
    { id: "4", name: "Hai Bà Trưng" }, 
    { id: "5", name: "Hoàng Mai" }, 
    { id: "6", name: "Thanh Xuân"}, 
    { id: "7", name: "Long Biên"}, 
    { id: "8", name: "Nam Từ Liêm"}, 
    { id: "9", name: "Bắc Từ Liêm"}, 
    { id: "10", name: "Tây Hồ"}, 
    { id: "11", name: "Cầu Giấy"}, 
    { id: "12", name: "Hà Đông"}
]
export const HANOI_WARDS = [
    { id: "1", district: "1", name: "Chương Dương" },
    { id: "2", district: "1", name: "Cửa Đông" },
    { id: "3", district: "1", name: "Cửa Nam" },
    { id: "4", district: "1", name: "Đồng Xuân" },
    { id: 5, district: 1, name: "Hàng Bạc" },
    { id: 6, district: 1, name: "Hàng Bài" },
    { id: 7, district: 1, name: "Hàng Bồ" },
    { id: 8, district: 1, name: "Hàng Bông" },
    { id: 9, district: 1, name: "Hàng Buồm" },
    { id: 10, district: 1, name: "Hàng Đào" },
    { id: 11, district: 1, name: "Hàng Gai" },
    { id: 12, district: 1, name: "Hàng Mã" },
    { id: 13, district: 1, name: "Hàng Trống" },
    { id: 14, district: 1, name: "Lý Thái Tổ" },
    { id: 15, district: 1, name: "Phan Chu Trinh" },
    { id: 16, district: 1, name: "Phúc Tân" },
    { id: 17, district: 1, name: "Tràng Tiền" },
    { id: 18, district: 1, name: "Trần Hưng Đạo" },
    { id: 19, district: 2, name: "Cát Linh" },
    { id: 20, district: 2, name: "Hàng Bột" },
    { id: 21, district: 2, name: "Khâm Thiên" },
    { id: 22, district: 2, name: "Khương Thượng" },
    { id: 23, district: 2, name: "Kim Liên" },
    { id: 24, district: 2, name: "Láng Hạ" },
    { id: 25, district: 2, name: "Láng Thượng" },
    { id: 26, district: 2, name: "Nam Đồng" },
    { id: 27, district: 2, name: "Ngã Tư Sở" },
    { id: 28, district: 2, name: "Ô Chợ Dừa" },
    { id: 29, district: 2, name: "Phương Liên" },
    { id: 30, district: 2, name: "Phương Mai" },
    { id: 31, district: 2, name: "Quang Trung" },
    { id: 32, district: 2, name: "Quốc Tử Giám" },
    { id: 33, district: 2, name: "Thịnh Quang" },
    { id: 34, district: 2, name: "Thổ Quan" },
    { id: 35, district: 2, name: "Trung Liệt" },
    { id: 36, district: 2, name: "Trung Phụng" },
    { id: 37, district: 2, name: "Trung Tự" },
    { id: 38, district: 2, name: "Văn Chương" },
    { id: 39, district: 2, name: "Văn Miếu" },
    { id: 40, district: 3, name: "Ba Đình" },
    { id: 41, district: 3, name: "Cống Vị" },
    { id: 42, district: 3, name: "Điện Biên" },
    { id: 43, district: 3, name: "Đội Cấn" },
    { id: 44, district: 3, name: "Giảng Võ" },
    { id: 45, district: 3, name: "Kim Mã" },
    { id: 46, district: 3, name: "Liễu Giai" },
    { id: 47, district: 3, name: "Ngọc Hà" },
    { id: 48, district: 3, name: "Ngọc Khánh" },
    { id: 49, district: 3, name: "Nguyễn Trung Trực" },
    { id: 50, district: 3, name: "Phúc Xá" },
    { id: 51, district: 3, name: "Quán Thánh" },
    { id: 52, district: 3, name: "Thành Công" },
    { id: 53, district: 3, name: "Trúc Bạch" },
    { id: 54, district: 3, name: "Vĩnh Phúc" },
    { id: 55, district: 4, name: "Bạch Đằng" },
    { id: 56, district: 4, name: "Bách Khoa" },
    { id: 57, district: 4, name: "Bạch Mai" },
    { id: 58, district: 4, name: "Cầu Dền" },
    { id: 59, district: 4, name: "Đống Mác" },
    { id: 60, district: 4, name: "Đồng Nhân" },
    { id: 61, district: 4, name: "Đồng Tâm" },
    { id: 62, district: 4, name: "Lê Đại Hành" },
    { id: 63, district: 4, name: "Minh Khai" },
    { id: 64, district: 4, name: "Nguyễn Du" },
    { id: 65, district: 4, name: "Phạm Đình Hổ" },
    { id: 66, district: 4, name: "Phố Huế" },
    { id: 67, district: 4, name: "Quỳnh Lôi" },
    { id: 68, district: 4, name: "Quỳnh Mai" },
    { id: 69, district: 4, name: "Thanh Lương" },
    { id: 70, district: 4, name: "Thanh Nhàn" },
    { id: 71, district: 4, name: "Trương Định" },
    { id: 72, district: 4, name: "Vĩnh Tuy" },
    { id: 73, district: 5, name: "Đại Kim" },
    { id: 74, district: 5, name: "Định Công" },
    { id: 75, district: 5, name: "Giáp Bát" },
    { id: 76, district: 5, name: "Hoàng Liệt" },
    { id: 77, district: 5, name: "Hoàng Văn Thụ" },
    { id: 97, district: 5, name: "Lĩnh Nam" },
    { id: 78, district: 5, name: "Mai Động" },
    { id: 79, district: 5, name: "Tân Mai" },
    { id: 80, district: 5, name: "Thanh Trì" },
    { id: 81, district: 5, name: "Thịnh Liệt" },
    { id: 82, district: 5, name: "Trần Phú" },
    { id: 83, district: 5, name: "Tương Mai" },
    { id: 84, district: 5, name: "Vĩnh Hưng" },
    { id: 85, district: 5, name: "Yên Sở" },
    { id: 86, district: 6, name: "Hạ Đình" },
    { id: 87, district: 6, name: "Khương Đình" },
    { id: 88, district: 6, name: "Khương Mai" },
    { id: 89, district: 6, name: "Khương Trung" },
    { id: 90, district: 6, name: "Kim Giang" },
    { id: 91, district: 6, name: "Nhân Chính" },
    { id: 92, district: 6, name: "Phương Liệt" },
    { id: 93, district: 6, name: "Thanh Xuân Bắc" },
    { id: 94, district: 6, name: "Thanh Xuân Nam" },
    { id: 95, district: 6, name: "Thanh Xuân Trung" },
    { id: 96, district: 6, name: "Thượng Đình" },

]

/*
*   ROOM CONSTS
*/
export const ROOM_PRICE_RANGE = [ 500, 4500 ]
export const ROOM_TYPES = [
    { name: 'Phòng trọ', id: "1"}, 
    { name: 'Chung cư mini', id: "2"},
    { name: 'Nhà nguyên căn', id: "3"}, 
    { name: 'Chung cư nguyên căn', id: "4"} 
]
export const ROOM_SQUARE_RANGE = [ 0, 200 ]
export const ROOM_FACILITIES = [ 
    { name: 'Phòng tắm khép kín', id: "1"}, 
    { name: 'Có nóng lạnh', id: "2"}, 
    { name: 'Khu bếp riêng', id: "3" }, 
    { name: 'Khu bếp chung', id: "4" }, 
    { name: 'Có điều hòa', id: "5"}, 
    { name: 'Có ban công', id: "6" }, 
    { name: 'Điện nước giá dân', id: "7" }, 
    { name: 'Có tủ lạnh', id: "8" }, 
    { name: 'Có máy giặt', id: "9" }, 
    { name: 'Có giường tủ', id: "10" },
    { name: 'Chung chủ', id: "11"},
    { name: 'Không chung chủ', id: "12"},  
    { name: 'Phòng tắm chung', id: "13"}, 
    { name: 'Điện nước giá thuê', id: "14" },
    { name: 'Không có bình nóng lạnh', id: "15" }, 
    { name: 'Không nấu ăn', id: "16" }, 
    { name: 'Không điều hòa', id: "17" }, 
    { name: 'Không ban công', id: "18" }, 
]
export const ROOM_FACILITIES_BY_GROUP = {
    'shareHouse': [
        { label: 'Chung chủ', value: "11"},
        { label: 'Không chung chủ', value: "12"}, 
    ],
    'bathroom': [
        { label: 'Phòng tắm khép kín', value: "1"}, 
        { label: 'Phòng tắm chung', value: "13"}, 
    ],
    'heater': [
        { label: 'Có nóng lạnh', value: "2"}, 
        { label: 'Không có bình nóng lạnh', value: "15" }, 
    ],
    'kitchen': [
        { label: 'Khu bếp riêng', value: "3" }, 
        { label: 'Khu bếp chung', value: "4" }, 
        { label: 'Không nấu ăn', value: "16" },
    ],
    'aircond': [
        { label: 'Có điều hòa', value: "5"}, 
        { label: 'Không điều hòa', value: "17" }, 
    ],
    'balcony': [
        { label: 'Có ban công', value: "6" }, 
        { label: 'Không ban công', value: "18" }, 
    ],
    'bill': [
        { label: 'Điện nước giá dân', value: "7" }, 
        { label: 'Điện nước giá thuê', value: "14" },
    ],
    'others': [
        { name: 'Có tủ lạnh', id: "8" }, 
        { name: 'Có máy giặt', id: "9" }, 
        { name: 'Có giường tủ', id: "10" },
    ]
}
export const ROOM_VIOLATIONS = [
    { id: "1", text: 'Thông tin không chính xác' },
    { id: "2", text: 'Phòng không tồn tại' },
    { id: "3", text: 'Chủ trọ có thái độ không đúng mực' },
    { id: "4", text: 'Khác' }
]
export const SERVICE_BY_NAME = {
    "1": "bathroom",
    "2": "heater",
    "3": "kitchen",
    "4": "kitchen",
    "5": "aircond",
    "6": "velanda",
    "7": "elecPrice",
    "8": "other",
    "9": "other",
    "10": "other",
    "11": "withOwner",
    "12": "withOwner",
    "13": "bathroom",
    "14": "elecPrice"
}

export const DEFAULT_TIME_FRAME = [
    { id: 1, name: '1 tuần', days: 7 },
    { id: 2, name: '2 tuần', days: 14 },
    { id: 3, name: '1 tháng', days: 30 },
    { id: 4, name: '2 tháng', days: 60 },
    { id: 5, name: '3 tháng', days: 90 },
    { id: 6, name: '6 tháng', days: 180 },
    { id: 7, name: '1 năm', days: 365 },
]

export const DEFAULT_POST_PRICE = [
    { priceValue: 50, price: '50.000', days: 7, multiples: 1000, currency: 'VNĐ' },
    { priceValue: 100, price: '100.000', days: 14, multiples: 1000, currency: 'VNĐ' },
    { priceValue: 300, price: '300.000', days: 30, multiples: 1000, currency: 'VNĐ' },
    { priceValue: 500, price: '500.000', days: 60, multiples: 1000, currency: 'VNĐ' },
    { priceValue: 800, price: '800.000', days: 90, multiples: 1000, currency: 'VNĐ' },
    { priceValue: 1000, price: '1.000.000', days: 180, multiples: 1000, currency: 'VNĐ' },
    { priceValue: 1500, price: '1.500.000', days: 365, multiples: 1000, currency: 'VNĐ' },
]