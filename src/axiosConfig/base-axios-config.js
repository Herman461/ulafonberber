import axios from 'axios'


const http = axios.create({
    baseURL: "http://ulafonberber.mws.agency/api/v1"
})

export default http;
