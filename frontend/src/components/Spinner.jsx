import React from 'react'
import { useTodoContext } from '../context/ContextProvider'

function Spinner() {
    const {isLoggedIn} = useTodoContext()
  return isLoggedIn? (
    <div style={{display:"flex",justifyContent:"center",marginTop:"50px"}}>
      <img style={{width:"40px"}} src="../../public/images/Spinner-3.gif" alt="" />
    </div>
  ):(
    <div style={{marginTop:"50px",textAlign:"center"}}>
        <h3 style={{color:"white",fontFamily:"Poppins"}}>Login to view tasks</h3>
    </div>
  )
}

export default Spinner
