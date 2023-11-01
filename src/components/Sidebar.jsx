import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaBell from "react-icons/fa";

export const Sidebar = [
    {
        title: "หน้าหลัก",
        path: "/",
        icons: <AiIcons.AiFillHome />,
        cName: "nav-text",
    },
    {
        title: "รถตู้บางเขน",
        path: "/bangkhen",
        icons: <AiIcons.AiFillCar />,
        cName: "nav-text",
    },
    {
        title: "รถตู้อนุสาวรีย์",
        path: "/monument",
        icons: <AiIcons.AiFillCar />,
        cName: "nav-text",
    },
    {
        title: "รถตู้หมอชิต 2",
        path: "/morchit",
        icons: <AiIcons.AiFillCar/>,
        cName: "nav-text",
    },
    {
        title: "รอยืนยันการจอง",
        path: "/booking",
        icons: <AiIcons.AiFillProfile />,
        cName: "nav-text",
    },
    {
        title: "จัดการผู้ใช้งาน",
        path: "/user",
        icons: <FaBell.FaUserAlt />,
        cName: "nav-text",
    },
    // {
    //     title: "การจองสาย 999",
    //     path: "/listBooking",
    //     icons: <FaBell.FaUserAlt />,
    //     cName: "nav-text",
    // },

]