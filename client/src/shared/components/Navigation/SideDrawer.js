import React from 'react';
// import { NavLink } from 'react-router-dom'

// import MainHeader from './MainHeader'
import './SideDrawer.css';

const SideDrawer = props => {
    return (
        <aside className="side-drawer">{props.children}</aside>
    )
}
export default SideDrawer;