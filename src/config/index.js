import axios from 'axios'
//College API Link
export default axios.create({
    baseURL: "https://college-api-mo.herokuapp.com/api"
})