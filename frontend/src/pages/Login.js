import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [data,setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) =>{
        const { name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }


    const handleSubmit = async(e) =>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }

    }

    console.log("data login",data)
    
  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons'/>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                    type='email' 
                                    placeholder='enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                        </div>

                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='enter password'
                                    value={data.password}
                                    name='password' 
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password ?
                            </Link>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

                    </form>

                    <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
            </div>


        </div>
    </section>
  )
}

export default Login



// Sure, let's break down the `Login` component step by step:

// 1. Import necessary modules and assets:
//    - `React`: Required for creating React components.
//    - `useState` and `useContext` from React hooks for managing state and context respectively.
//    - `loginIcons` for importing the login image.
//    - `FaEye` and `FaEyeSlash` from `"react-icons/fa"` for showing and hiding password functionality.
//    - `Link` and `useNavigate` from 'react-router-dom' for navigation within the application.
//    - `SummaryApi` for API endpoints.
//    - `toast` from 'react-toastify' for showing toast notifications.
//    - `Context` for accessing context data.

// 2. Define the `Login` component:
//    - Initialize state variables using the `useState` hook:
//      - `showPassword`: Manages the visibility of the password input.
//      - `data`: Stores the user's email and password.
//    - Initialize the `navigate` function using the `useNavigate` hook for programmatic navigation.
//    - Destructure functions `fetchUserDetails` and `fetchUserAddToCart` from the context.

// 3. Define event handler functions:
//    - `handleOnChange`: Updates the state `data` when the user types in the email or password input fields.
//    - `handleSubmit`: Handles form submission. It sends a request to the server with user credentials for authentication. If the authentication is successful, it redirects to the home page, fetches user details, and fetches the user's cart details. If there's an error, it displays an error message using toast.

// 4. Render the component:
//    - Render a section with the ID 'login'.
//    - Render a container div with login form elements:
//      - Render the login image.
//      - Render a form with email and password input fields.
//      - Toggle the visibility of the password input field with the eye icon.
//      - Provide a link for forgotten passwords.
//      - Render a login button.
//      - Provide a link for new users to sign up.
//    - Finally, export the `Login` component as the default export.

// This component represents a login form where users can enter their email and password. It provides functionality to toggle the visibility of the password and handles form submission for user authentication.