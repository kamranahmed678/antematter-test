import axios from 'axios'
import config from './../Config'

const baseUrl = `${config.backend}general/`

export const getHelp = async() => {
    try{
        const response = await axios.get(`${baseUrl}help`)
        return response.data
    }
    catch(err){
        console.log(err)
    }
}

export const getAbout = async() => {
    try{
        const response = await axios.get(`${baseUrl}about`)
        return response.data
    }
    catch(err){
        console.log(err)
    }
}