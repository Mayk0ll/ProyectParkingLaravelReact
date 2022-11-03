import React from 'react'
import './navBar.css'
import {ContainerNavBar} from '../../styleComponent/styleComponents'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
  return (
    <ContainerNavBar>
      <NavLink to='/crearConductor' className={({isActive})=>isActive === true ? 'claseActiva itemEnlace':'claseInactiva itemEnlace'}>Crear Conductor</NavLink>
      <NavLink to='/crearVehiculo' className={({isActive})=>isActive === true ? 'claseActiva itemEnlace':'claseInactiva itemEnlace'}>Crear Vehiculo</NavLink>
      <NavLink to='/crearIngreso' className={({isActive})=>isActive === true ? 'claseActiva itemEnlace':'claseInactiva itemEnlace'}>Ingreso</NavLink>
      <NavLink to='/crearSalida' className={({isActive})=>isActive === true ? 'claseActiva itemEnlace':'claseInactiva itemEnlace'}>Salida</NavLink>
      <NavLink to='/vehiculosActuales' className={({isActive})=>isActive === true ? 'claseActiva itemEnlace':'claseInactiva itemEnlace'}>Ingresados</NavLink>
    </ContainerNavBar>
  )
}
