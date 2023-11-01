import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../User.css";

function User() {
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);


  const getStatusColor = (acceptValue) => {
    return acceptValue === 0 ? "red" : "green";
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/booking/get/booking")
      .then((res) => {
        if (res.data.status === "Success") {
          const filteredData = res.data.data
            .filter(item => item.number === '997')
            .filter(item => new Date(item.date).toDateString() === new Date().toDateString());
          setData(filteredData);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const calculatedTotalAmount = data.reduce((total, cars) => {
      if (new Date(cars.date).toDateString() === new Date().toDateString()) {
        return total + 30;
      }
      return total;
    }, 0);
    setTotalAmount(calculatedTotalAmount);
  }, [data]);
  
  

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
        <h4>รายการจองรถตู้สาย "997" ของวันนี้</h4>
        <p>เงินมัดจำทั้งหมด: {totalAmount} บาท</p>
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
