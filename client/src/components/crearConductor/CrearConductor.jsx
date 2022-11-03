import React, { useState } from 'react'
import {Input} from '../input/Input'
import axios from 'axios'
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError
} from "../../styleComponent/styleComponents";

export const CrearConductor = () => {
  const [documento, setDocumento] = useState({valor: '', valido: null});
  const [nombre, setNombre] = useState({valor: '', valido: null});
  const [apellido, setApellido] = useState({valor: '', valido: null});
  const [apellido2, setApellido2] = useState({valor: '', valido: null});
  const [telefono, setTelefono] = useState({valor: '', valido: null});
  const [correo, setCorreo] = useState({valor: '', valido: null});
  const [formulario, setFormulario] = useState(null)
	const [guardado, setGuardado] = useState({valor: 'null', mensaje: ''})

  const expresiones = {
		documento: /^\d{1,20}$/ ,
		telefono: /^\d{7,10}$/ ,
		nombreApellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
		password: /^.{4,12}$/, 
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	}


  const onsubmitForm = async e => {
    e.preventDefault();

    if(documento.valido === 'true' && nombre.valido === 'true' && apellido.valido === 'true' && apellido2.valido === 'true' && telefono.valido === 'true' && correo.valido === 'true'){
      const registrtoConductor = {id: documento.valor, nombre: nombre.valor.toLowerCase(), apellido: apellido.valor.toLowerCase(), apellido2: apellido2.valor.toLowerCase(), telefono: telefono.valor, correo: correo.valor}
      const resp = await axios.post('http://localhost:8000/api/conductor', registrtoConductor)
      resp.status == 200? setGuardado({...guardado, valor: true}):setGuardado({...guardado, valor: false})
      setFormulario(true)
      setGuardado({...guardado, valor: true})
    } else {
      setFormulario(false)
      setGuardado({...guardado, valor: false})
    }
  }
  return (
    <div>
      <Formulario onSubmit={onsubmitForm}>
			<Input estado={documento} cambiarEstado={setDocumento} tipo='text' campoLabel='Documento' placeholder='Ej: 123456' name='documento' leyendaError={documento.valor.length>0?'solo se premiten numeros':'Este campo es obligatorio'} expresionRegular={expresiones.documento}/> 
			<Input estado={nombre} cambiarEstado={setNombre} tipo='text' campoLabel='Nombre' placeholder='Ej: michael' name='nombre' leyendaError={nombre.valor.length>0?'Solo se permiten letras':'Este campo es obligatorio'} expresionRegular={expresiones.nombreApellido}/> 
			<Input estado={apellido} cambiarEstado={setApellido} tipo='text' campoLabel='Primer Apellido' placeholder='Ej: vasquez' name='apellido' leyendaError={apellido.valor.length>0?'No se permiten letras':'Este campo es obligatorio'} expresionRegular={expresiones.nombreApellido}/> 
			<Input estado={apellido2} cambiarEstado={setApellido2} tipo='text' campoLabel='Segundo Apellido' placeholder='Ej: vasquez' name='apellido' leyendaError={apellido.valor.length>0?'No se permiten letras':'Este campo es obligatorio'} expresionRegular={expresiones.nombreApellido}/> 
			<Input estado={telefono} cambiarEstado={setTelefono} tipo='text' campoLabel='Telefono' placeholder='Ej: 123 456 78 09' name='telefono' leyendaError={telefono.valor.length>0?'El rango de telefono debe ser entre 7 y 10 digitos':'Este campo es obligatorio'} expresionRegular={expresiones.telefono}/> 
			<Input estado={correo} cambiarEstado={setCorreo} tipo='text' campoLabel='Correo' placeholder='Ej: correo@correo.com' name='correo' leyendaError={correo.valor.length>0?'correo invalido, verificalo por favor':'Este campo es obligatorio'} expresionRegular={expresiones.correo}/> 
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
        {guardado.valor === false && <MensajeError><p><FontAwesomeIcon icon={faExclamationTriangle} /><b>Error:</b> {guardado.mensaje}</p></MensajeError>}
      </ContenedorBotonCentrado>
    </Formulario>
    </div>
  )
}
