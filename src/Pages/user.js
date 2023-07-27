import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiUrl } from "../constants";
import axios from 'axios'
import Button from '@mui/material/Button'
import * as XLSX from 'xlsx'
import moment from 'moment'
import './user.css'

function User() {
  const params = useParams();

  const [employee, setEmployee] = useState();
  console.log(employee)

  useEffect(() => {
    axios
      .get(`${ApiUrl}/employee/${params.id}`)
      .then((result) => {
        setEmployee(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleChange(e){
    let change = {
        ...employee,
        [e.target.name]: e.target.value
    }
    setEmployee(change)
  }

  const navigate = useNavigate()

  async function editarEmpleado(event){
    event.preventDefault()
    await axios.put(`${ApiUrl}/update-employee/${params.id}`, employee)
    .then((result) =>{
        console.log(result)
        navigate('/')
    })

    .catch((error) => {
        alert("Hubo un error al editar")
    })
  }

  async function agregarEmpelado(event){
    event.preventDefault()
    await axios.post(`${ApiUrl}/create-employee`, employee)
    .then((result) => {
        navigate('/')
    })
    .catch((error) => {
        alert('Hubo error al agregar empleado')
    })
  }

  const [fileData, setFileData] = useState()

  function handleFile(e){
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "array", cellDates: true });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet);


      const employeeData = [];
      rows.forEach((row) => {
        const employeeId = row['Employee ID'];
        const employeeName = row['Employee Name'];

  
        const getDate = new Date(row['Date'])
        const date= moment(getDate).format('YYYY-MM-DD')
  
        const punchIn = moment(row['Punch In']).format('LT')
        const punchOut = moment(row['Punch Out']).format('LT')

        employeeData.push({
          employeeId,
          employeeName,
          date,
          punchIn, 
          punchOut
        })

      });    

      setFileData(employeeData)

    }
    reader.readAsArrayBuffer(e.target.files[0]);
  }

  console.log(fileData)


  async function batchFile(e){
    e.preventDefault()
    try {
      await axios.post(`${ApiUrl}/bulk-create`, fileData)
      navigate('/')
    } catch (error) {
      console.log(error)
      alert('Hubo un error al procesar tu petición', error)
      
    }

  }

  return (
    <>
      {params.id ? (
        <div style={{padding: '3%'}}>
          <div className="form-container">
            <div>
              <h5>Ingresa los datos del empleado</h5>
            </div>

            <div className="form-row">
              <label>Id</label>
              <input
                type="text"
                name="employeeId"
                placeholder="Ingresa el Id"
                value={employee?.employeeId}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label>Nombre</label>
              <input
                type="text"
                name="employeeName"
                placeholder="Ingresa el Nombre"
                value={employee?.employeeName}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label>Fecha</label>
              <input
                type="date"
                name="date"
                value={employee?.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label>Punch In</label>
              <input
                type="time"
                name="punchIn"
                value={employee?.punchIn}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label>Punch Out</label>
              <input
                type="time"
                name="punchOut"
                value={employee?.punchOut}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <Button variant="contained" onClick={editarEmpleado}>
                Guardar
              </Button>
            </div>
          </div>
        </div>
      ) : 
      <div style={{padding: '3%'}}>
          <div className="form-container">
            <div>
              <h5>Ingresa los datos del empleado</h5>
            </div>

            <div className="form-row">
              <label>Id</label>
              <input
                type="text"
                name="employeeId"
                placeholder="Ingresa el Id"
                value={employee?.employeeId}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label>Nombre</label>
              <input
                type="text"
                name="employeeName"
                placeholder="Ingresa el Nombre"
                value={employee?.employeeName}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label>Fecha</label>
              <input
                type="date"
                name="date"
                value={employee?.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label>Punch In</label>
              <input
                type="time"
                name="punchIn"
                value={employee?.punchIn}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label>Punch Out</label>
              <input
                type="time"
                name="punchOut"
                value={employee?.punchOut}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <Button variant="contained" onClick={agregarEmpelado}>
                Guardar
              </Button>
            </div>
          </div>

          <div className="form-container-second">
            <div>
                <h5>
                    Agrega mediante archivo de excel
                </h5>
            </div>
            
          <div className="form-row">
            <input type="file" placeholder="Ingresa el id" onChange={handleFile}/>
          </div>
          
          <div className="form-row">
            <Button variant="contained" onClick={batchFile}>Guardar empleados</Button>
          </div>
        </div>

        </div>
      
      
      }
    </>
  );
}

export default User;
