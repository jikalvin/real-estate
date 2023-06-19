import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loginMessage, setLoginMessage] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate()

    const signedIn = () => toast("You are signed In")
    const errorM = () => toast("Wrong email or password")

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(!isLoading)

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setLoginMessage(true)
            signedIn()
            navigate('/Dash')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            errorM()
            console.log(errorMessage)
        });
        setLoading(!isLoading)
    }

    return (
        <div>
            <div >
                <h1 className='text-blue-600 text-center'>Login</h1>
            </div>
            <div>
                <form className="grid justify-center">
                    <div>
                        <div>
                            <input 
                                type="email" 
                                name="email" 
                                id="" 
                                className='bg-slate-200 px-2 pr-20 w-200 h-10 my-2 rounded-lg flex justify-center items-center text-white text-lg' 
                                placeholder="Email ID" 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input 
                                type="password" 
                                name="phone" id="" 
                                className='bg-slate-200 px-2 pr-20 w-200 h-10 my-2 rounded-lg flex justify-center items-center text-white text-lg' 
                                placeholder="Password" 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <center>
                        <button 
                            className='bg-violet-700 hover:bg-violet-800 transition w-100 pl-5 pr-5 lg:max-w-[100px] h-12 rounded-lg mb-5 flex items-center	align-items-center justify-center items-center text-white text-lg'
                            onClick={(e) => handleSubmit(e)}    
                        >
                               {isLoading ? "Logging In..." : "Login"}
                        </button>
                    </center>
                </form>
            </div>
        </div>
    )
}
