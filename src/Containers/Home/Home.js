import React , { Component } from 'react';
import Button from '../../Components/Button/Button';
import classes from './Home.css';    
import axios from '../../hoc/axios';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Input from '../../Components/UI/Inputs/Input';

class ContactData extends Component {
    state = {
        contactData :{
            firstname:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your First Name',
                    label:'First Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            } ,
            lastname:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your Last Name',
                    label:'Last Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            } ,
            street: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your Street',
                    label:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            } ,
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your Country',
                    label:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            } ,
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder:'Your E-Mail',
                    label:'Email'
                },
                value:'',
                validation:{
                    required:true,
                    mail:true
                },
                valid:false,
                touched:false
            } ,
            mob: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your Contact Number',
                    label:'Contact Number'
                },
                value:'',
                validation:{
                    required:true,
                    minLength: 10,
                    maxLength:10,
                    isNumber:true
                },
                valid:false,
                touched:false
            } ,
            pincode:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your ZIP',
                    label:'Zip Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength: 5,
                    maxLength:5
                },
                valid:false,
                touched:false
            } ,
            status: {
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value: 'active' , displayValue: 'Active'},
                        {value: 'inactive' , displayValue: 'Inactive'}
                    ],
                    label:'Status'
                },
                value:'',
                valid:true
            }
        },
        formIsValid:false,
        loading: false
    }
    
orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading:true});
    const formOrder = {};
    for ( let elementIdentifier in this.state.contactData) {
        formOrder[elementIdentifier] = this.state.contactData[elementIdentifier].value;
    }
        const contacts = {
            contact: formOrder
            
        }
    
        axios.post('/contacts.json' , contacts).then(response=> {
                                this.setState({loading:false});
                                this.props.history.push('/');
        } )
                                .catch(error=> this.setState({loading:false }));      
}

validationHandler= (value , rules) => {
    let isValid = true
    
    if(rules){
         if(rules.required){
        isValid = value.trim() !== '' && isValid
    }
    
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid
    }
    
    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }
    if(rules.mail){
        const at = value.indexOf("@");
        const dot = value.lastIndexOf(".");
        const mail = at < 1 || dot < at +2 || dot + 2 >= value.length
        isValid = !mail && isValid
    }
    if(rules.isNumber){
        isValid = !isNaN(value) && isValid
    }
    }
    return isValid
}

changedDetailHandler = (event , elementIdentifier) =>{
    const updatedDetails = {...this.state.contactData}
    let updatedDetailsOrder = {...updatedDetails[elementIdentifier]}
    console.log(updatedDetailsOrder)
    updatedDetailsOrder.value = event.target.value
    updatedDetailsOrder.valid = this.validationHandler(updatedDetailsOrder.value , updatedDetailsOrder.validation )
    updatedDetailsOrder.touched = true
    let formIsValid = true
    for(let elementIdentifier in updatedDetails){
        formIsValid = updatedDetails[elementIdentifier].valid && formIsValid
    }
    
    console.log(formIsValid);
    console.log(updatedDetailsOrder)
    
    updatedDetails[elementIdentifier] = updatedDetailsOrder
    this.setState({contactData:updatedDetails, formIsValid:formIsValid});
}

    render(){
       const formDetails = []
        for ( let key in this.state.contactData){
            formDetails.push({
                id:key,
                config: this.state.contactData[key]
            })
        }
        
        
        let form = (<form onSubmit={this.orderHandler}>
                    {formDetails.map(formElement=>(
                        <Input  
                                key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value} 
                                clicked={(event) => this.changedDetailHandler(event , formElement.id ) }
                                Invalid={!formElement.config.valid}
                                isValidation={formElement.config.validation}
                                touched={formElement.config.touched}
                                label={formElement.config.elementConfig.label}/>
                   ))}
                    <Button buttontype='Success' 
                            disabled={!this.state.formIsValid}
                            clicked={this.orderHandler}> 
                        Save Details 
                    </Button>
                </form> 
                    );
        if(this.state.loading){
            form = <Spinner />
        }
            
        return( 
                <div className={classes.ContactData} >
                    <h4> Can we have your contact details </h4>
                    {form}
                </div>
        )
        }
}

export default ContactData;