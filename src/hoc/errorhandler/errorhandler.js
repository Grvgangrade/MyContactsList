import React, { Component }  from 'react';
import axios from '../axios';

const withErrorHandler = (WrappedComponent) => {
return class extends Component {
    state = {
        error: null
    }
    
    componentWillMount() {
        this.resInterceptors = axios.interceptors.response.use(res => res , error=> {
            this.setState({error:error})
        });
        
        this.reqInterceptors = axios.interceptors.request.use(req=> {
            this.setState({error:null})
            return req;
        });
    }
    
    componentWillUnmount() {
        axios.interceptors.response.eject(this.resInterceptors);
        axios.interceptors.request.eject(this.reqInterceptors);

    }
    
    cancelBackdropHandler = () => {
        this.setState({error:null});
    }
    
    render(){
        return(
        <div>
            <WrappedComponent {...this.props} />
        </div>
            )
    }   
}
}

export default withErrorHandler;
