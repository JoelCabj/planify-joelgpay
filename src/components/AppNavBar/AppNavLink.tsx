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


const AppNavLink: React.FC<AppNavLinkProps> = (props: AppNavLinkProps = {
        icon: NavBarIcons.Default,
        label: 'Default',
        link: '/',
        size: 20,
    }) => {
        const { [props.icon]: Icon } = Icons;
        return (
            <>
                <Link className='nav-link navbar-button' to={props.link}>
                    <Icon className='icon' size={props.size}></Icon>
                    { props.label }
                </Link>
            </>
        );
};

export default AppNavLink;
