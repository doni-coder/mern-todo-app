import axios from 'axios'
import React from 'react'
axios.defaults.withCredentials = true;
import { useTodoContext } from "../context/ContextProvider";

function Button() {
  const { setIsLoggedIn,setTaskCount,apiUrl } = useTodoContext();
    const handleLogout = async ()=>{
        const response = await axios.post(`${apiUrl}/api/v1/users/logout`)
        console.log("user loggedout");
        setIsLoggedIn(false)
        setTaskCount(0)
    }
  return (
    <button className='btn' onClick={handleLogout}>Logout</button>
  )
}

export default Button
