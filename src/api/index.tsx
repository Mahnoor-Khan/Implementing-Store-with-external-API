import axios from "axios"


export const getTodo = async () => {
    console.log("????")
    try {
      const response = await axios.get(`http://127.0.0.1:8000/`,)
      return response.data
    } catch (error) {
      throw Promise.reject(error)
    }
  }

  export const setTodo = async (data :any) => {
    console.log("????")
    try {
      const response = await axios.post(`http://127.0.0.1:8000/`,data);
      
      return response.data
    } catch (error) {
      throw Promise.reject(error)
    }
  }
  export const deleteTodo = async (data: number) => {
    console.log("????")
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/`+data+'/')
      return response.data
    } catch (error) {
      throw Promise.reject(error)
    }
  }
  export const updateTodo = async (id: number, data:any) => {
    console.log("????")
    try {
      const response = await axios.put(`http://127.0.0.1:8000/`+id+'/', data)
      return response.data
    } catch (error) {
      throw Promise.reject(error)
    }
  }


