import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {ContainerRegistroItem,ContainerTodosLosRegistros} from '../../styleComponent/styleComponents'


export const VehiculosActuales = () => {
  const [vehiculosActuales, setVehiculosActuales] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/registros')
    .then(res => {
      const vehiculos = res.data.filter(elem => elem.estado === 'ingresado')
      setVehiculosActuales(vehiculos)
    })

    axios.get('http://localhost:8000/api/conductores').then(res => setConductores(res.data))
    axios.get('http://localhost:8000/api/vehiculos').then(res => setVehiculos(res.data))
  }, []);


  const prueba = () => {

  const datosMostrar = vehiculosActuales.map(registro => {

    const fechaIngreso = new Date(registro.ingreso)
    const horaIngreso = `${fechaIngreso.getDate()}/${fechaIngreso.getMonth()+1}/${fechaIngreso.getFullYear()} ${fechaIngreso.getHours()}:${fechaIngreso.getMinutes()}`
    const placa = vehiculos.find(e => e.placa === registro.id_placa)
    const propietario = conductores.find(e => e.id === placa.id_conductor)

    return {
      nombre: propietario.nombre,
      placa: placa.placa,
      ingreso: horaIngreso
    }
  })

  setDatos(datosMostrar)
} 

  return (
    <div>
      <button onClick={prueba}>cargar</button>
      <br /><br />
      <ContainerTodosLosRegistros>
      {
        datos?.map(e => {
          return (
            <ContainerRegistroItem key={e.placa}>
              <h3>{e.nombre}</h3>
              <h3>{e.placa}</h3>
              <h3>{e.ingreso}</h3>
            </ContainerRegistroItem>
          )
        })
      }
      </ContainerTodosLosRegistros>
      
    </div>
  )
}
