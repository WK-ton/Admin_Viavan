import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import "../App.css";
import { IconContext } from "react-icons";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../User.css";
import { FaBell } from "react-icons/fa";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [data, setData] = useState([]);

  const showSidebar = () => setSidebar(!sidebar);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/booking/get/user"
      );
      if (response.data.status === "Success") {
        setNotifications(response.data.data);
      } else {
        alert("Error fetching notifications");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching notifications");
    }
  };

  const handleNotificationClick = () => {
    fetchNotifications(); // Fetch notifications when the icon is clicked
    setShowNotifications(true); // Show the notification panel
  };
  
  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/booking/get/user");
      if (response.data.status === "Success") {
        // Filter out notifications with accept !== 0
        const newNotifications = response.data.data.filter(
          (notification) => notification.accept === 0
        );
  
        // Update the notifications state with the filtered notifications
        setNotifications(newNotifications);
      } else {
        
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchData();
    const pollingInterval = setInterval(fetchData); // เรียก fetchData ทุก 30 วินาที

    return () => {
      clearInterval(pollingInterval); // ยกเลิกการเรียก fetchData เมื่อคอมโพเนนต์ถูกยกเลิก
    };
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {Sidebar.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icons}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      <div className="notification-icon" onClick={handleNotificationClick}>
        <FaBell />
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </div>

      {showNotifications && (
        <Modal
          show={showNotifications}
          onHide={handleCloseNotifications}
          centered
          className="responsive-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Notifications</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {notifications.map((notification, index) => (
                notification.accept === 0 ? (
                <li key={index}>
                  <a href={`/booking`}>
                    {notification.name} : {notification.tostation} - {" "}
                    [{notification.time}]  [{notification.seat}]     ❗️ รอยืนยัน
                  </a>
                </li>
                ): null
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseNotifications}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default Navbar;
