import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function Private({ children }){
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const credentials = localStorage.getItem('@jesustyle')
    
    if (((credentials[0] === 'client' && credentials[1] === 'client') || (credentials[0] === 'adm' && credentials[1] === 'adm'))){
      setRedirect(true)
    }
  }, [])

  if (redirect){
    return <Navigate to="/" replace/>
  }

  return children
}