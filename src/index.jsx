import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import User from "./Routes/Booking";
import HomePage from "./Routes/Home";
import NavBar from "./components/Navbar";
import "./App.css";
import BangKhen from "./Routes/BangKhen";
import Monument from "./Routes/Monument";
import Morchit from "./Routes/Morchit";
import InsertBangkhen from "./Insert/Insert_Bangkhen";
import InsertMonument from "./Insert/Insert_Monument";
import InsertMorchit from "./Insert/Insert_Morchit";
import EditCarsBangkhen from "./edit/EditBangKhen";
import EditCarsMonument from "./edit/EditMonument";
import EditCarsSaiTai from "./edit/EditMorchit";
import Management from "./Routes/User";
import List_Booking_BangKhen from "./Routes/List_Booking_BangKhen";
import List_Booking_Monument from "./Routes/List_Booking_Monument";
import List_Booking_Morchit from "./Routes/List_Booking_Morchit";

const AppLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
  );
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
        {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "bangkhen",
            element: <BangKhen/>,
          },
          {
            path: "monument",
            element: <Monument/>,
          },
          {
            path: "morchit",
            element: <Morchit/>,
          },
          {
            path: "booking",
            element: <User />,
          },
          {
            path: "insertBangkhen",
            element: <InsertBangkhen/>,
          },
          {
            path: "insertMonument",
            element: <InsertMonument/>,
          },
          {
            path: "insertMorchit",
            element: <InsertMorchit/>,
          },
          {
            path: "editBangkhen/:id",
            element: <EditCarsBangkhen/>,
          },
          {
            path: "editMonument/:id",
            element: <EditCarsMonument/>,
          },
          {
            path: "editMorchit/:id",
            element: <EditCarsSaiTai/>,
          },
          {
            path: "user",
            element: <Management/>,
          },
          {
            path:"bookingBangkhen",
            element:<List_Booking_BangKhen/>
          },
          {
            path:"bookingMonument",
            element:<List_Booking_Monument/>
          },
          {
            path:"bookingMorchit",
            element:<List_Booking_Morchit/>
          }

    ]
  },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
