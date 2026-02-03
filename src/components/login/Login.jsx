    import React from 'react'
    import { useState } from 'react'
    import { useNavigate } from 'react-router-dom'

    const Login = ({onClose}) => {

        const user = "you"
        const pass = "1234"
        const [userName , setUserName] = useState("")
        const [ password , setPassword] = useState("")
        const navigate = useNavigate ()
        const handleLogin =()=>{
            if( userName === user && password === pass)
                navigate("/mainPage")
            else
                alert("your password or userName is invalid")
        }

    return (
        <div className='flex items-center justify-center h-screen bg-transparent backdrop-blur-sm w-full'>
        <div className='flex flex-col items-center min-w-auto bg-[#252836] rounded-xl p-10'>
        <h1 className='text-2xl font-bold text-white text-center pb-8'>Login</h1>
        <form 
        onSubmit={handleLogin}
        className='flex flex-col items-center gap-2' >
            <div className='flex flex-col items-start w-full'>
            <h1 className='text-gray-400 font-semibold text-start '>User Name</h1>
                <input
                type="text"
            placeholder='Name...' 
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            className='text-gray-400 px-3 py-2 border border-gray-600 rounded text-sm md:w-100'/>
            </div>
            <div className='flex flex-col items-start w-full '>
                <h1 className='text-gray-400 font-semibold text-start'>Password</h1>
            <input type="password"
            placeholder='Name...' 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className='text-gray-400 px-3 py-2 border border-gray-600 rounded text-sm md:w-100'/>
            </div>
            <div className='flex flex-row items-center justify-between gap-6'> 
                <button 
                onClick={onClose}
                className='text-[#F99147] border border-[#F99147] rounded px-2 py-1 hover:bg-[#F99147]/60 '>Cancel</button>
                <button className='text-white bg-[#F99147] rounded px-2 py-1 active:scale-95'>Submit</button>
            </div>
        </form>
        </div>
        </div>
    )
    }

    export default Login
