import React, { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';

import AppNavLink  from "./AppNavLink";
import { NavBarIcons } from './NavBarIcons';
import './AppNavBar.css'

export interface AppRoute {
    label: string,
    link: string,
    icon: NavBarIcons
}

interface NavBarProps {
    routes: AppRoute[]
}

const AppNavBar: React.FC<NavBarProps> = ({routes}) => {

    const [links, setLinks] = useState<AppRoute[]>([]);

    const renderLink = (item: AppRoute) => {
        const {icon, label, link} = item;
        const key = `${link}#${label}`;
        return (
            <AppNavLink icon={icon} label={label} link={link} key={key}></AppNavLink>
        )
    }

    useEffect(() => {
        if (routes) {
            setLinks(routes);
        }
    }, [routes]);

    return (
        <>
            <Navbar className="app-navbar bg-body-tertiary" fixed="bottom">
                {links.map( l => renderLink(l))}
            </Navbar>
        </>
    );
};

export default AppNavBar;
