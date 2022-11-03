import React from 'react'
import axios from 'axios'
import {
  ContainerFactura,
  Boton,
  ContainerCreatePlaca
} from "../../styleComponent/styleComponents";

export const Factura = ({vehiculo,cancelar}) => {


  const fechaIngreso = new Date(vehiculo.ingreso)
  const fechaSalida=  new Date()
  const reportSalida = Date(fechaSalida)

  const horaIngreso = `${fechaIngreso.getDate()}/${fechaIngreso.getMonth()+1}/${fechaIngreso.getFullYear()} ${fechaIngreso.getHours()}:${fechaIngreso.getMinutes()}`
  const horaSalida = `${fechaSalida.getDate()}/${fechaSalida.getMonth()+1}/${fechaSalida.getFullYear()} ${fechaSalida.getHours()}:${fechaSalida.getMinutes()}`

  const valorHora = 1.00/60
  const diferenciaminutos = (fechaSalida.getTime() - fechaIngreso.getTime())/1000/60
  const total = valorHora * diferenciaminutos;

  const generarCobro = (id) => {

    const cobroTotal = {
      salida: reportSalida,
      estado: 'no ingresado',
      total: total
    }

    console.log(cobroTotal);
    axios.put(`http://localhost:8000/api/registro/${id}`, cobroTotal)
    .then(resp => {
      console.log(resp);
      if(resp.status){
        cancelar()
      }
    })
  }


  return (
    <>
      <h1>Factura</h1>
      <ContainerFactura>
        <h3>Vehiculo:</h3>
        <h3>{vehiculo.id_placa}</h3>

        <h3>ingreso:</h3>
        <h3>{horaIngreso}</h3>

        <h3>salida:</h3>
        <h3>{horaSalida}</h3>
        
        <h3>valor a pagar:</h3>
        <h3>{total} $</h3>
      </ContainerFactura>
      <br /><br /><br />
      <ContainerCreatePlaca>
        <Boton onClick={()=>generarCobro(vehiculo.id)}>Generar Pago</Boton>
        <Boton onClick={cancelar}>Cancelar</Boton>
      </ContainerCreatePlaca>
    </>    
  )
}
