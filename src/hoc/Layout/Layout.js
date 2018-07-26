import React from 'react';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import Route from '../../Routes/Route';
import classes from './Layout.css';

const Layout = () => {
    return(
        <div className={classes.Layout}>
            <Toolbar />
            <Route />
        </div>
    )
}

export default Layout;