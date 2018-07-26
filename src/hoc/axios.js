import axios from 'axios';

const instance = axios.create({
            baseURL: 'https://my-contact-lists.firebaseio.com/'
})
    
export default instance;