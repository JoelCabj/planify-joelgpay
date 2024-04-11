import React from 'react';
import  * as Icons  from 'react-bootstrap-icons';

import { NavBarIcons } from "./NavBarIcons";
import { Link } from 'react-router-dom';

interface AppNavLinkProps {
    icon: NavBarIcons;
    label: string;
    link: string;
    size?: number;
}


const AppNavLink: React.FC<AppNavLinkProps> = ({
        icon = NavBarIcons.Default,
        label = 'Default',
        link = '/',
        size = 20,
    }) => {
        const { [icon]: Icon } = Icons;
        return (
            <>
                <Link className='nav-link navbar-button' to={link}>
                    <Icon className='icon' size={size}></Icon>
                    { label }
                </Link>
            </>
        );
};

export default AppNavLink;
