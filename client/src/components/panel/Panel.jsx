import React from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import App from '../../App';
import { ContainerPanel } from '../../styleComponent/styleComponents'
import {CrearConductor} from '../crearConductor/CrearConductor'
import {CrearVehiculo} from '../crearVehiculo/CrearVehiculo'
import {CrearIngreso} from '../crearIngreso/CrearIngreso'
import {CrearSalida} from '../crearSalida/CrearSalida'
import {VehiculosActuales} from '../vehiculosActuales/VehiculosActuales'

export const Panel = () => {
    return (
        <ContainerPanel>
            <Routes>
                <Route  path='/' element={<Navigate to="/vehiculosActuales" replace />} />
                <Route path='/crearConductor' element={<CrearConductor />}/>
                <Route path='/crearVehiculo' element={<CrearVehiculo />}/>
                <Route path='/crearIngreso' element={<CrearIngreso />}/>
                <Route path='/crearSalida' element={<CrearSalida />}/>
                <Route path='/vehiculosActuales' element={<VehiculosActuales />}/>
            </Routes>
        </ContainerPanel>
    )
}
