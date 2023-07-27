import axios from "axios";
import { useEffect, useState } from "react";
import { ApiUrl } from "../constants";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper/Paper'
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Principal() {
  const [employees, setEmployees] = useState();

  useEffect(() => {
    axios
      .get(`${ApiUrl}/all-employees`)
      .then((result) => {
        setEmployees(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate()

  function Eliminar(id){
    axios.delete(`${ApiUrl}/delete-employee/${id}`)
    window.location.reload()
  }

  function AgregarEmpleados() {
    navigate("/user")
  }

  function Editar(id){
    navigate(`/user/${id}`)
  }


  return (
    <div style={{padding: '3%'}}>
      <Button variant="contained" style={{marginBottom: '2%'}} onClick={AgregarEmpleados}>Agregar empleados</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Employee ID</StyledTableCell>
              <StyledTableCell>Employee Name</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Punch In</StyledTableCell>
              <StyledTableCell>Punch Out</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees?.map((employee) => (
              <StyledTableRow key={employee.id}>
                <StyledTableCell component="th" scope="row">
                  {employee.employeeId}
                </StyledTableCell>
                <StyledTableCell>{employee.employeeName}</StyledTableCell>
                <StyledTableCell>{employee.date}</StyledTableCell>
                <StyledTableCell>{employee.punchIn}</StyledTableCell>
                <StyledTableCell>{employee.punchOut}</StyledTableCell>
                <StyledTableCell>
                  <Button variant='contained' onClick={() => Editar(employee.id)}>Editar</Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button variant='contained' color='error' onClick={() => Eliminar(employee.id)}>Eliminar</Button>
                </StyledTableCell>
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Principal;
