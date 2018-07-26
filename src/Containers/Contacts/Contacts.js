import React, { Component } from 'react';
import Order from '../../Components/UI/MyContacts/MyContacts';
import axios from '../../hoc/axios';
import errorhandler from '../../hoc/errorhandler/errorhandler';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Contacts extends Component {
    state = {
        loading:true,
        contacts:[]
    }

componentDidMount(){
    axios.get('contacts.json').then(res=> {
            const fetchedContacts = [];
            for(let key in res.data){
            fetchedContacts.push({
                ...res.data[key],
                id:key
            })        
            }
        this.setState({loading:false , contacts:fetchedContacts})
    }).catch(error=>{
            this.setState({loading:false})});
    
}

    render(){
        let showOrder = null;
        if (this.state.loading){
            showOrder = <Spinner />
        }else {
            showOrder = (this.state.contacts.map(contacts=>
                   <Order  contact = {contacts.contact} id={contacts.id}
                            key= {contacts.id} />           
            ))
        }
        return(
            <div>
                {showOrder}
            </div>
        )
    }
}

export default errorhandler( Contacts , axios );