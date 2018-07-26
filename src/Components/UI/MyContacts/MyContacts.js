import React from 'react';
import classes from './MyContacts.css';

const Order = (props) =>{
    let contact = [];
    for (let contactname in props.contact){
        contact.push({
            name: contactname,
            value: props.contact[contactname],
            id: props.id
            })
        }
    const contactDetails = contact.map(ct=> {
        return (
                <span style={{
                display: 'block',
                margin: '0 8px',    
                border: '1px solid #ccc',
                padding: '5px',
                }}
                key={ct.name}> {ct.name} : {ct.value} </span>
        )
    })
    
    return(
        <div className={classes.Order} >
            <p> Contact Details : {contactDetails} </p>
        </div>
    )
}

export default Order;