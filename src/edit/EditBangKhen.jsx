import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditCars_bangkhen() {
    const [data, setData] = useState({
        fromstation: '',
        tostation: '',
        number: '',
        road: '',
        time: '',
        // image:''
        
    })
    const {id} = useParams();
    useEffect(() => {
        axios.get('http://localhost:8081/carBangkhen/get/cars_bangkhen/'+id)
        .then(res => {
            setData({...data, fromstation: res.data.Result[0].fromstation,
                tostation: res.data.Result[0].tostation,
                number: res.data.Result[0].number,
                road: res.data.Result[0].road,
                time: res.data.Result[0].time,
                // image: res.data.Result[0].image
            })
        })
        .catch(err => console.log(err))
    },[])
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/carBangkhen/update/cars_bangkhen/'+id, data)
        .then(res => {
            if(res.data.Status === 'Success') {
              navigate('/bangkhen');
            }
         })
        .catch(err=>console.log(err));
    }
    const navigate = useNavigate()
  return (
    <div className='d-flex flex-column align-items-center pt-5'>
        <h2>แก้ไขรถตู้บางเขน</h2>
            <form className = "row g-3 w-50" onSubmit={handleSubmit}>
                <div className='col-12'>
                    <label  htmlFor ="inputstation" className='form-label'> สถานีต้นทาง </label>
                        <input type='text' className='form-control' id='inputName' placeholder='' autoComplete='off'
                        onChange={e=> setData({...data,fromstation: e.target.value})} value={data.fromstation}/>
                </div>
                <div className='col-12'>
                    <label  htmlFor ="inputstation" className='form-label'> สถานีปลายทาง </label>
                        <input type='text' className='form-control' id='inputName' placeholder='' autoComplete='off'
                        onChange={e=> setData({...data,tostation: e.target.value})} value={data.tostation}/>
                </div> 
                <div className='col-12'>
                    <label  htmlFor ="inputnumber" className='form-label'> เลขรถ </label>
                        <input type='number' className='form-control' id='inputEmail' placeholder='' autoComplete='off'
                        onChange={e=> setData({...data,number: e.target.value})} value={data.number}/>
                </div>        
                <div className='col-12'>
                    <label htmlFor ="inputPassword" className='form-label'> เส้นทางที่ผ่าน </label>
                        <input type='text' className='form-control' id='inputroad' placeholder='' 
                        onChange={e=> setData({...data,road: e.target.value})} value={data.road}/>
                </div> 
                <div className='col-12'>
                    <label htmlFor ="inputPassword" className='form-label'> เวลารถออก </label>
                        <input type='time' className='form-control' id='inputroad' placeholder='' 
                        onChange={e=> setData({...data,time: e.target.value})} value={data.time}/>
                </div>  
                <div className="col-12">
                <button type= "submit"className='btn btn-primary '> แก้ไข </button>
            </div> 
            </form>
            
    </div>
  )
}

export default EditCars_bangkhen