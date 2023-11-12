import axios from 'axios'
import config from './../Config'

const baseUrl = `${config.backend}crypto/`

export const getPrice = async(data) => {
    try{
        const response = await axios.get(`${baseUrl}fetch-price?pair=${data}`)
        return response.data
    }
    catch(err){
        console.log(err)
        return err.response.data
    }
}