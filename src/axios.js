import axios from 'axios'
import router from './router'
import Element from 'element-ui'

//access backend URL
axios.defaults.baseURL = "http://localhost:8081"
// axios.defaults.baseURL = "http://10.1.1.191:8081"

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }
})

request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token")
    return config
})

request.interceptors.response.use(
    response => {
        let res = response.data
        console.log(res)
        if(!res){
            Element.Message.error('No Return Data')
            return Promise.reject('No Return Data')
        }
        if(res.code === 200){
            return response
        }else{
            Element.Message.error(!res.msg ? 'System Error' : res.msg)
            return Promise.reject(response.data.msg)
        }
    },
    error => {
        console.log("error =" + error)
        let resp = error.response;
        if(resp.data){
            error.message = resp.data.msg; // from backend
        }
        if(resp.status === 401){
            router.push("/login")
        }
        Element.Message.error(error.message,{duration: 3000})
        return Promise.reject(error)
    }
)

export default request