import React from 'react';
import classes from './Input.css';


const input = (props) => {
    let inputElement = null
    let errorMessage = null
    let inputclasses = [classes.InputElement]
    let err = false
    
    if (props.Invalid && props.isValidation && props.touched){
        inputclasses.push(classes.Invalid) 
        err = true
    }
    
    if(err){
        errorMessage = <p> Please enter a valid {props.label}. </p>
    }
    
    switch(props.elementType){
        case ('input') :
            inputElement = (<div>
                            <input className={inputclasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.clicked}/>
                                {errorMessage}
                                    </div>)
            break;
        
        case ('textarea') :
            inputElement = <textarea className={inputclasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.clicked}/>
            break;
            
        case ('select') :
            inputElement = ( <select className={inputclasses.join(' ')}
                                value={props.value}
                                onChange={props.clicked}>
                                {props.elementConfig.options.map(
                                option => (
                                <option value={option.value} 
                                        key={option.value}>
                                    {option.displayValue}
                                </option>
                                ))}
                            </select> )
            break;    
            
        default:
            inputElement = <input className={inputclasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
        onChange={props.clicked}/>
            break;
    }
    
    
    return(
        <div className={classes.Input}>
            <label className={classes.Label}> {props.label} </label>
            {inputElement}
            
        </div>
    )
}

export default input;