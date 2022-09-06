import axios from 'axios'


const http = axios.create({
    baseURL: "https://ulafonberber.mws.agency/api/v1"
})

export default http;
