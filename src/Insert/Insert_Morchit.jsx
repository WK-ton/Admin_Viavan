import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function InsertMorchit() {
    const [data, setData] = useState({
        fromstation: '',
        tostation:'',
        number: '',
        road: '',
        time: '',
        image: ''
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append("fromstation", data.fromstation);
        formdata.append("tostation", data.tostation);
        formdata.append("number", data.number);
        formdata.append("road", data.road);
        formdata.append("image", data.image);
        formdata.append("time", data.time);
        axios.post('http://localhost:8081/carSaiTai/create/cars_SatTai', formdata)
        .then(res => {
            if(res.data.Status === 'Success') {
              navigate('/morchit');
            }
         })
        .catch(err=>console.log(err));
    }
    const navigate = useNavigate()
  return (
    <div className='d-flex flex-column align-items-center pt-15'>
        <h2 style={{marginBottom:'20px'}}>เพิ่มรถตู้หมอชิต 2</h2>
            <form className = "row g-3 w-50" onSubmit={handleSubmit}>
                <div className='col-12'>
                    <label  htmlFor ="inputName" className='form-label'> สถานีต้นทาง </label>
                        <input type='station' className='form-control' id='inputstation' placeholder='' autoComplete='off'
                        onChange={e=> setData({...data,fromstation: e.target.value})}/>
                </div> 
                <div className='col-12'>
                    <label  htmlFor ="inputName" className='form-label'> สถานีปลายทาง </label>
                        <input type='station' className='form-control' id='inputstation' placeholder='' autoComplete='off'
                        onChange={e=> setData({...data,tostation: e.target.value})}/>
                </div> 
                <div className='col-12'>
                    <label  htmlFor ="inputEmail" className='form-label'> สาย </label>
                        <input type='number' className='form-control' id='inputnumber' placeholder='' autoComplete='off'
                        onChange={e=> setData({...data,number: e.target.value})}/>
                </div>     
                <div className='col-12'>
                    <label htmlFor ="inputPassword" className='form-label'> เส้นทางที่ผ่าน </label>
                        <input type='road' className='form-control' id='inputroad' placeholder='' autoComplete='off'
                        onChange={e=> setData({...data,road: e.target.value})}/>
                </div>          
                <div className='col-12'>
                    <label htmlFor ="inputFile" className='form-label'> รูปเส้นทาง </label>
                        <input type='file' className='form-control' id='inputFile' 
                        onChange={e=> setData({...data,image: e.target.files[0]})}/>
                </div>  
                <div className='col-12'>
                    <label htmlFor ="inputPassword" className='form-label'> เวลารถออก </label>
                        <input type='time' className='form-control' id='inputroad' placeholder='' autoComplete='off'
                        value={data.time}
                        onChange={e=> setData({...data,time: e.target.value})}/>
                </div>  
                <div className="col-12">
                <button type= "submit"className='btn btn-primary '> ยืนยัน </button>
            </div> 
            </form>
            
    </div>
  )
}

export default InsertMorchit