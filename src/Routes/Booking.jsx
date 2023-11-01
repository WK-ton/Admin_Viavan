import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../User.css";

function User() {
  const [data, setData] = useState([]);
  const [enlargedId, setEnlargedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const isEnlarged = (id) => {
    return id === enlargedId;
  };

  const getStatusColor = (acceptValue) => {
    return acceptValue === 0 ? "red" : "green";
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/booking/get/user")
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

  const updateBoolean = (id) => {
    axios
      .put("http://localhost:8081/booking/update/booking/" + id)
      .then((res) => {
        if (res.data.status === "Success") {
          setData((prevData) => prevData.filter((cars) => cars.id !== id));
          setShowModal(false);
          alert("อนุมัติเรียบร้อย");
        } else {
          alert("Error updating accept value");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error updating accept value");
      });
  };

  return (
    <div>
      <div className="mt-4 px-4 pt-2 text-center ">
        <h4>รอยืนยันการจอง</h4>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>สถานีต้นทาง</th>
              <th>สถานีต้นปลายทาง</th>
              <th>ชื่อ,เบอร์โทร</th>
              <th>วันที่</th>
              <th>เวลารถออก</th>
              <th>มัดจำ</th>
              <th>รูป</th>
              <th>วันที่โอน</th>
              <th>เวลา</th>
              <th>ที่นั่ง</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cars, index) =>
              // Conditionally render based on accept value
              cars.accept === 0 ? (
                <tr
                  key={index}
                  className="text-center"
                  style={{ backgroundColor: getStatusColor(cars.accept) }}
                >
                  <td>{cars.id}</td>
                  <td>{cars.fromstation}</td>
                  <td>{cars.tostation}</td>
                  <td>
                    {cars.name}
                    <br />
                    {cars.phone}
                  </td>
                  <td>{cars.date}</td>
                  <td>{cars.time}</td>
                  <td>{cars.amount} บาท</td>
                  <td>
                    <img
                      src={`http://localhost:8081/images/${cars.image}`}
                      alt=""
                      className={`cars_images ${
                        isEnlarged(cars.id) ? "enlarged" : ""
                      }`}
                      onClick={() =>
                        openModal(`http://localhost:8081/images/${cars.image}`)
                      }
                    />
                  </td>
                  <td>{cars.date_image}</td>
                  <td>{cars.time_image}</td>
                  <td>{cars.seat}</td>
                  <td>
                    <button
                      onClick={() => updateBoolean(cars.id)}
                      className={`btn btn-sm me-1 ${
                        cars.accept === 0 ? "btn-warning" : "success-button"
                      }`}
                    >
                      {cars.accept === 0 ? "อนุมัติ" : "อนุมัติแล้ว"}
                    </button>
                    <button
                      onClick={() => handleDelete(cars.id)}
                      className="btn btn-sm btn-danger"
                    >
                      ยกเลิกการจอง
                    </button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="responsive-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Selected Image"
            style={{ width: "100%" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default User;
