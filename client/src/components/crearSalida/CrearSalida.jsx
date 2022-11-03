import React, { useEffect, useState } from 'react'
import {Input} from '../input/Input'
import axios from 'axios'
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Formulario,
    Boton,
    MensajeError,
    ContainerCreatePlaca
} from "../../styleComponent/styleComponents";
import { Factura } from '../factura/Factura';

export const CrearSalida = () => {

  const [placa, setPlaca] = useState({valor: '', valido: null});
  const [vehiculosIngresados, setVehiculosIngresados] = useState([]);
  const [vehiculoEncontrado, setVehiculoEncontrado] = useState({valor:null, mensaje:''});
  const [cobro, setCobro] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/registros')
    .then(res => {
      const vehiculosActuales = res.data.filter(elem => elem.estado === 'ingresado')
      setVehiculosIngresados(vehiculosActuales)
  })
  }, []);
  
  const onsubmitForm = (e) => {
    e.preventDefault()
  }

  const validate = (placa) => {
    console.log(placa)
    const validatePlaca = vehiculosIngresados.find(elem => elem.id_placa === placa.toUpperCase())
    console.log(validatePlaca);
    if(validatePlaca) setVehiculoEncontrado({...vehiculoEncontrado, valor: validatePlaca, mensaje:''});
    else setVehiculoEncontrado({...vehiculoEncontrado, valor: false, mensaje:'esta placa no ha ingresado al Parking'})
    console.log(vehiculoEncontrado);
  }

  const generarCobro = () => {
    setCobro(true)
  }

  const cancelar = () => {
    setVehiculoEncontrado({valor:null, mensaje:''})
    setCobro(false)
    axios.get('http://localhost:8000/api/registros')
    .then(res => {
      const vehiculosActuales = res.data.filter(elem => elem.estado === 'ingresado')
      setVehiculosIngresados(vehiculosActuales)
    })
  }

  return (
    !cobro?
    <div>
      {
        !vehiculoEncontrado.valor?<>
        <Formulario onSubmit={onsubmitForm}>
            <ContainerCreatePlaca>
                <Input estado={placa} cambiarEstado={setPlaca} tipo='text' campoLabel='Placa' placeholder='Ej: ABC123' name='placa' leyendaError={placa.valor.length>0?'solo se premiten numeros':'Este campo es obligatorio'} /> 
                <Boton onClick={()=>validate(placa.valor)}>Validar</Boton>
            </ContainerCreatePlaca>
            {vehiculoEncontrado.valor === false && <MensajeError><p><FontAwesomeIcon icon={faExclamationTriangle} /><b>Error:</b> {vehiculoEncontrado.mensaje}</p></MensajeError>}
        </Formulario>
        </>:<>
        <h2>Desea realizar la salida y el cobro?</h2>
            <br />
            <ContainerCreatePlaca>
                <Boton onClick={generarCobro}>Generar Cobro</Boton>
                <Boton onClick={cancelar}>Cancelar</Boton>
            </ContainerCreatePlaca>
        </>
      }
    </div>: <Factura vehiculo={vehiculoEncontrado.valor} cancelar={cancelar} />
  )
}
