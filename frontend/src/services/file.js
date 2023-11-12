import axios from 'axios'
import config from './../Config'

const baseUrl = `${config.backend}file/`

export const uploadCsv= async(data) => {
    try{
        const response = await axios.post(`${baseUrl}upload`,data)
        console.log(response)
        return response.data
    }
    catch(err){
        console.log(err)
        return err.response.data
    }
}

export const deleteCsv= async(data) => {
    try{
        const response = await axios.delete(`${baseUrl}delete?fileName=${data}`)
        console.log(response)
        return response.data
    }
    catch(err){
        console.log(err)
        return err.response.data
    }
}

export const drawChart= async(data) => {
    try{
        const response = await axios.post(`${baseUrl}draw`,data)
        console.log(response)
        return response.data
    }
    catch(err){
        console.log(err)
        return err.response.data
    }
}