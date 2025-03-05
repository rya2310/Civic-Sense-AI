import {useContext,createContext, useState} from 'react'

const AuthContext=createContext()
export const AuthContextUse=()=>{
    return useContext(AuthContext)
}
const AuthContextProvider=({children})=>{
    const [user,setUser]=useState('')

    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider