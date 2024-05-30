import axios from "axios";

//creating backend confug
const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': "multipart/form-data"
    }



});
//test api
export const testApi = () => api.get('/test')
// export const registerApi = (data) => api.post('/register', data)

//Register Api
export const registerUserApi = (data) => api.post('/api/user/create', data)

//login api
export const loginUserApi = (data) => api.post('/api/user/login', data)

//admin
// export const admin_dashboardAPi = (data) => api.post('/api/admin/dashboard', data);

//create product Api
export const createProductApi = (data) => api.post('/api/product/create', data);

//get all products api
export const getAllProducts = () => api.get('/api/product/get_all_products')

