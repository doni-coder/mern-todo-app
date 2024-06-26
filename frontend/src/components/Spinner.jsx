import React from 'react'
import { useTodoContext } from '../context/ContextProvider'
import "../styles/Spinner.css"

function Spinner() {
    const {isLoggedIn} = useTodoContext()
  return isLoggedIn? (
    <div style={{display:"flex",justifyContent:"center",marginTop:"100px"}}>
      <div class="loader"></div>
    </div>
  ):(
    <div style={{marginTop:"50px",textAlign:"center"}}>
        <h3 style={{color:"white",fontFamily:"Poppins"}}>Login to view tasks</h3>
    </div>
  )
}

export default Spinner
