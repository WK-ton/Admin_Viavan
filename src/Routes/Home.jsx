import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../User.css";

function User() {
  const [data, setData] = useState([]);

  const getStatusColor = (acceptValue) => {
    return acceptValue === 0 ? "red" : "green";
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/booking/get/booking")
      .then((res) => {
        if (res.data.status === "Success") {
          setData(res.data.data);
        } else {
       
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/booking/delete/booking/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
         
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="mt-4 px-4 pt-2 text-center ">
        <h4>ประวัติการจองทั้งหมด</h4>
        <a href="/bookingBangkhen">
          <button
            style={{
              width: "100px",
              height: "50px",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white",
              fontSize: "16px",
              margin: "10px",
            }}
          >
            สาย 999
          </button>
        </a>
        <a href="/bookingMonument">
          <button
            style={{
              width: "100px",
              height: "50px",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white",
              fontSize: "16px",
              margin: "10px",
            }}
          >
            สาย 997
          </button>
        </a>
        <a href="/bookingMorchit">
          <button
            style={{
              width: "100px",
              height: "50px",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white",
              fontSize: "16px",
              margin: "10px",
            }}
          >
            สาย 966
          </button>
        </a>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ชื่อผู้ใช้</th>
              <th>เบอร์โทร</th>
              <th>อีเมล</th>
              <th>สถานีต้นทาง</th>
              <th>สถานีต้นปลายทาง</th>
              <th>สาย</th>
              
              <th>วันที่</th>
              <th>เวลารถออก</th>
              {/* <th>มัดจำ</th> */}
              {/* <th>รูป</th> */}
              {/* <th>วันที่โอน</th>
              <th>เวลา</th> */}
              <th>ที่นั่ง</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data
            .sort((a,b) => b.id - a.id)
            .map((cars, index) => (
              <tr
                key={index}
                className="text-center"
                style={{ backgroundColor: getStatusColor(cars.accept) }}
              >
                <td>{cars.id}</td>
                <td>{cars.name}</td>
                <td>{cars.phone}</td>
                <td>{cars.email}</td>
                <td>{cars.fromstation}</td>
                <td>{cars.tostation}</td>
                <td>{cars.number}</td>  
                <td>{cars.date}</td>
                <td>{cars.time}</td>
                <td>{cars.seat}</td>
                <td>
                    <button
                      onClick={() => handleDelete(cars.id)}
                      className="btn btn-sm btn-danger"
                    >
                      ยกเลิกการจอง
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
   </div>
  );
}

export default User;
