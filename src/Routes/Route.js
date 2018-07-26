import React , { Component }from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Containers/Home/Home';
import Contacts from '../Containers/Contacts/Contacts';


class Routes extends Component {
    render(){
        return(
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/mycontacts' component={Contacts} />
            </Switch>
        )
    }
}

export default Routes;
