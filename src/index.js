import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';

const app = (<BrowserRouter> 
                <Layout/>
            </BrowserRouter>)



ReactDOM.render(app, document.getElementById('root'));
