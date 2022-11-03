import React, { useEffect, useState } from 'react'
import {Input} from '../input/Input'
import axios from 'axios'
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError,
  ContainerCreatePlaca
} from "../../styleComponent/styleComponents";

export const CrearVehiculo = () => {

  const [placa, setPlaca] = useState({valor: '', valido: null});
  const [tipo, setTipo] = useState({valor: '', valido: null});
  const [documento, setDocumento] = useState({valor: '', valido: null});
  const [propietarios, setPropietarios] = useState([]);
  const [propietario, setPropietario] = useState(null);
  const [formulario, setFormulario] = useState(null)
	const [guardado, setGuardado] = useState({valor: 'null', mensaje: ''})

  useEffect(() => {
    axios.get('http://localhost:8000/api/conductores')
    .then(res => setPropietarios(res.data))
  }, [])
  

  
  const expresiones = {
		documento: /^\d{1,20}$/ ,
		telefono: /^\d{7,10}$/ ,
		nombreApellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
		password: /^.{4,12}$/, 
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	}

  const validate = (doc) => {
    const findPropitario = propietarios.find( elem => elem.id === Number(doc))
    if(findPropitario) setPropietario(true);
    else setPropietario(false)
  }

  const onsubmitForm = async e => {
    e.preventDefault();

    if(propietario){
      if(documento.valido === 'true' && placa.valido === 'true' && tipo.valido === 'true'){

        const registroVehiculo = {
          placa: placa.valor.toUpperCase(),
          tipo: tipo.valor.toLowerCase(),
          id_conductor:Number(documento.valor)
        }
        // console.log(registroVehiculo);
        const resp = await axios.post('http://localhost:8000/api/vehiculo', registroVehiculo)
        resp.status? setGuardado({...guardado, valor: true}):setGuardado({...guardado, valor: false})
        setFormulario(true)
      } else {
        setFormulario(false)
      }
    }
  }
  return (
    <div>
      <Formulario onSubmit={onsubmitForm}>
        {
          !propietario? <>
            <ContainerCreatePlaca>
              <Input estado={documento} cambiarEstado={setDocumento} tipo='text' campoLabel='Documento' placeholder='Ej: 123456' name='documento' leyendaError={documento.valor.length>0?'solo se premiten numeros':'Este campo es obligatorio'} expresionRegular={expresiones.documento}/>
              <Boton onClick={()=>validate(documento.valor)}>Validar</Boton>
            </ContainerCreatePlaca>
            {propietario === true && <MensajeExito>Se realizo el registro de manera correcta</MensajeExito>}
            {propietario === false && <MensajeError><p><FontAwesomeIcon icon={faExclamationTriangle} /><b>Error:</b> Documento no registrado</p></MensajeError>}
          </>:<>  
            <Input estado={placa} cambiarEstado={setPlaca} tipo='text' campoLabel='Placa' placeholder='Ej: AAA321' name='placa' leyendaError={placa.valor.length>0?'Coloca una placa correcta':'Este campo es obligatorio'}/> 
            <Input estado={tipo} cambiarEstado={setTipo} tipo='text' campoLabel='tipo' placeholder='Ej: Carro' name='tipo' leyendaError={placa.valor.length>0?'Coloca un vehiculo correcto':'Este campo es obligatorio'}/> 
            {formulario === false && (
              <MensajeError>
                <p>
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  <b>Error:</b> Por favor complete todos los campos.
                </p>
              </MensajeError>
            )}
            <ContenedorBotonCentrado>
              <Boton type="submit">Enviar</Boton>
              {guardado.valor === true && <MensajeExito>Se realizo el registro de manera correcta</MensajeExito>}
              {guardado.valor === false && <MensajeError><p><FontAwesomeIcon icon={faExclamationTriangle} /><b>Error:</b> no se registro</p></MensajeError>}
            </ContenedorBotonCentrado>
        </>
        }
      </Formulario>
    </div>
  )
}
