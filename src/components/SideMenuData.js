import React from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
export const SideMenuData = [
    {
        title: "Sản phẩm yêu thích",
        icon: <FavoriteBorderIcon/>,
        link:"/likedproducts"
    },
    {
        title: "Quản lý sổ địa chỉ",
        icon: <i class="far fa-address-book fa-lg"></i>,
        link:"/addressbook"
    },
    {
        title: "Đơn mua",
        icon: <ListAltIcon/>,
        link:"/AllPurchase"
    },
    {
        title: "Thông báo",
        icon: <NotificationsNoneIcon/>,
        link:"/"
    },
    {
        title: "Kho Voucher",
        icon: <BookmarkBorderIcon/>,
        link:"/"
    },
];
    

    

