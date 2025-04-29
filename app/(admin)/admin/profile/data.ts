import { Images } from "@/constant/images";

export const profileData = {
  name: "Admin User",
  role: "Quản trị viên",
  avatar: Images.profileAvatar,
  bgProfile: Images.bgProfile,
  bio: "Xin chào! Tôi là Admin quản lý hệ thống Book Store. Nếu bạn không thể quyết định, câu trả lời là không. Nếu có hai con đường khó khăn như nhau, hãy chọn con đường đau đớn hơn trong thời gian ngắn.",
  fullName: "Admin BookStore",
  mobile: "(+84) 123 456 789",
  email: "admin@bookstore.com",
  location: "Việt Nam",
  social: {
    twitter: "#",
    facebook: "#",
    instagram: "#",
  },
};

export const platformSettings = [
  { type: 'header', label: 'TÀI KHOẢN' },
  { type: 'switch', label: 'Email cho tôi khi có người theo dõi', checked: true },
  { type: 'switch', label: 'Email cho tôi khi có người trả lời', checked: false },
  { type: 'switch', label: 'Email cho tôi khi có người nhắc đến', checked: true },
  { type: 'header', label: 'ỨNG DỤNG' },
  { type: 'switch', label: 'Thông báo ra mắt & dự án mới', checked: true },
  { type: 'switch', label: 'Cập nhật sản phẩm hàng tháng', checked: true },
  { type: 'switch', label: 'Đăng ký nhận bản tin', checked: false },
]

export const conversationsData = [
  {
    title: "Sophie B.",
    avatar: Images.Face3,
    description: "Chào! Tôi cần thêm thông tin...",
  },
  {
    title: "Anne Marie",
    avatar: Images.Face4,
    description: "Làm tốt lắm, bạn có thể...",
  },
  {
    title: "Ivan",
    avatar: Images.Face5,
    description: "Về các tập tin tôi có thể...",
  },
  {
    title: "Peterson",
    avatar: Images.Face6,
    description: "Chúc bạn một buổi chiều tốt lành...",
  },
  {
    title: "Nick Daniel",
    avatar: Images.Face2,
    description: "Hi! Tôi cần thêm thông tin...",
  },
];

export const projectsData = [
  {
    img: Images.HomeDecor1,
    titlesub: "Dự án #1",
    title: "Hiện đại",
    description:
      "Khi Uber đang giải quyết rất nhiều bất ổn quản lý nội bộ.",
    members: [Images.Face1, Images.Face2, Images.Face3]
  },
  {
    img: Images.HomeDecor2,
    titlesub: "Dự án #2",
    title: "Bắc Âu",
    description:
      "Âm nhạc là thứ mà mỗi người đều có quan điểm riêng biệt.",
    members: [Images.Face5, Images.Face6]
  },
  {
    img: Images.HomeDecor3,
    titlesub: "Dự án #3",
    title: "Tối giản",
    description:
      "Mỗi người có gu thẩm mỹ khác nhau, và nhiều loại âm nhạc khác nhau, Zimbali Resort",
    members: [Images.Face1, Images.Face4, Images.Face2, Images.Face3]

  },
];
