import "../Bangkhen.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CarMorchit() {
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8081/carSaiTai/getCars/cars_SatTai")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Result);
          setData(res.data.Result);
        } else {
          
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete('http://localhost:8081/carSaiTai/delete/cars_SatTai/'+id)
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
      <div style={{ margin: "20px" }}>
        <h4
          style={{
            textAlign: "center",
            fontSize: "20px",
            marginBottom: "10px",
          }}
        >
          รถตู้หมอชิต 2
        </h4>
        <a href="/insertMorchit">
          <button
            style={{
              width: "100px",
              height: "50px",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white",
              fontSize: "16px",
            }}
          >
            เพิ่มรถตู้
          </button>
        </a>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>สถานีต้นทาง</th>
              <th>สถานีต้นปลายทาง</th>
              <th>สาย</th>
              <th>เส้นทางที่ผ่าน</th>
              <th>เวลารถออก</th>
              {/* <th>รูป</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((cars, index) => {
                return (
                  <tr key={index}>
                    <td>{cars.id}</td>
                    <td>{cars.fromstation}</td>
                    <td>{cars.tostation}</td>
                    <td>{cars.number}</td>
                    <td>{cars.road}</td>
                    <td>{cars.time}</td>
                    {/* <td>{<img 
                            src={`http://localhost:8081/images/`+ cars.image} 
                            alt="" 
                            className='cars_images' 
                            style={{width:'100px', height:'100px'}}
                            
                          
                            />}</td> */}
                    <td>
                      <Link
                        to={`/editMorchit/` + cars.id}
                        className="btn btn-primary btn-sm "
                      >
                        edit
                      </Link>
                      <button
                        onClick={() => handleDelete(cars.id)}
                        className="btn btn-sm btn-danger "
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CarMorchit;
