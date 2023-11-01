import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../User.css";

function Management() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const getStatusColor = (acceptValue) => {
    return acceptValue === 0 ? "red" : "green";
  };


  useEffect(() => {
    axios
      .get("http://localhost:8081/auth/getUser")
      .then((res) => {
        if (res.data.status === "Success") {
          setData(res.data.result);
        } else {
          
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/auth/delete/user/" + id)
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
        <h4>รายการจองทั้งหมด</h4>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ชื่อผู้ใช้</th>
              <th>เบอร์โทร</th>
              <th>อีเมล</th>
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
                <td>
                    <button
                      onClick={() => handleDelete(cars.id)}
                      className="btn btn-sm btn-danger"
                    >
                      ลบผู้ใช้งาน
                    </button>
                  </td>
              </tr>
            ))}
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
          <image
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

export default Management;
