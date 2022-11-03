import React, { useEffect, useState } from 'react'
import {Input} from '../input/Input'
import axios from 'axios'
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Formulario,
    Boton,
    MensajeExito,
    MensajeError,
    ContainerCreatePlaca
} from "../../styleComponent/styleComponents";


export const CrearIngreso = () => {

    const [placa, setPlaca] = useState({valor: '', valido: null});
    const [placas, setPlacas] = useState([]);
    const [findPlaca, setFindPlaca] = useState({valor:null, mensaje:''});
    const [vehiculosIngresados, setVehiculosIngresados] = useState([]);
    const [ingresado, setingresado] = useState(null);
    const [guardado, setGuardado] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8000/api/vehiculos')
        .then(res => setPlacas(res.data))
        axios.get('http://localhost:8000/api/registros')
        .then(res => {
            const vehiculosActuales = res.data.filter(elem => elem.estado === 'ingresado')
            setVehiculosIngresados(vehiculosActuales)
        })
    }, []);

    const validate = (placa) => {
        const validatePlaca = vehiculosIngresados.find(elem => elem.id_placa === placa.toUpperCase())
        if(!validatePlaca){
            const placaEncontrada = placas.find( elem => elem.placa === placa.toUpperCase())
            if(placaEncontrada) setFindPlaca({...findPlaca, valor: placaEncontrada});
            else setFindPlaca({...findPlaca, valor: false, mensaje:'No se encontro esta placa'})
        }
        else setFindPlaca({...findPlaca,valor: false, mensaje:'esta placa ya ingreso al Parking'})
    }

    const onsubmitForm = (e) => {
        e.preventDefault()
    }

    const cancelar = (e) => {
        e.preventDefault()
        setPlaca({valor: '', valido: null})
        setFindPlaca({...findPlaca,valor: null, mensaje:''})
        setGuardado(null)
    }
    
    const generarIngreso = async (e) => {
        e.preventDefault()

        
        const createRegistro = {
            ingreso: Date(),
            salida: 'pendiente',
            estado: 'ingresado',
            total: 0,
            id_placa: findPlaca.valor.placa
        }

        await axios.post('http://localhost:8000/api/registro', createRegistro)
        .then(resp => {
            resp.status?setGuardado(true):setGuardado(false)
                axios.get('http://localhost:8000/api/registros')
                .then(res => {
                const vehiculosActuales = res.data.filter(elem => elem.estado === 'ingresado')
                setVehiculosIngresados(vehiculosActuales)
            })
        })
    }

return(
    <div>
        {
            !findPlaca.valor && 
            <Formulario onSubmit={onsubmitForm}>
                <ContainerCreatePlaca>
                    <Input estado={placa} cambiarEstado={setPlaca} tipo='text' campoLabel='Placa' placeholder='Ej: ABC123' name='placa' leyendaError={placa.valor.length>0?'solo se premiten numeros':'Este campo es obligatorio'} /> 
                    <Boton onClick={()=>validate(placa.valor)}>Validar</Boton>
                </ContainerCreatePlaca>
                <br />
            </Formulario>
        }
        {findPlaca.valor === false && <MensajeError><p><FontAwesomeIcon icon={faExclamationTriangle} /><b>Error:</b> {findPlaca.mensaje}</p></MensajeError>}
        {
            findPlaca.valor && <>
            <br /><br /><br />
            <h2>desea realizar el ingreso?</h2>
            <br />
            <ContainerCreatePlaca>
                <Boton onClick={generarIngreso}>Generar Ingreso</Boton>
                <Boton onClick={cancelar}>Cancelar</Boton>
            </ContainerCreatePlaca>
            </>
        }
        <br />
        {guardado === true && <MensajeExito>Se realizo el ingreso de manera correcta</MensajeExito>}
        {guardado === false && <MensajeError><p><FontAwesomeIcon icon={faExclamationTriangle} /><b>Error:</b> no se realizo el ingreso</p></MensajeError>}
        
    </div>
)
}
