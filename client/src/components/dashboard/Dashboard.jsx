import React from 'react'
import { ContainerDashboard } from '../../styleComponent/styleComponents';
import { NavBar } from '../navBar/NavBar';
import { Panel } from '../panel/Panel';

export const Dashboard = () => {
  return (
    <ContainerDashboard>
      <NavBar/>
      <Panel/>
    </ContainerDashboard>
  )
}
