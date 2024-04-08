import React from 'react';
import { Navbar } from 'react-bootstrap';

import AppNavLink  from "./AppNavLink";
import { NavBarIcons } from './NavBarIcons';
import './AppNavBar.css'

interface NavBarProps {
    //
}

const AppNavBar: React.FC<NavBarProps> = (props) => {
    return (
        <>
            <Navbar className="app-navbar bg-body-tertiary" fixed="bottom">
                <AppNavLink icon={NavBarIcons.CupHotFill} label='Reservar' link='bookings'></AppNavLink>
                <AppNavLink icon={NavBarIcons.CupHotFill} label='Mis Turnos' link='appointments'></AppNavLink>
            </Navbar>
        </>
    );
};

export default AppNavBar;
