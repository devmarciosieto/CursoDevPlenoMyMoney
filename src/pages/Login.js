import React from 'react'
import { usePost} from '../utils/rest'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgurbw-R1dYJdynFJomY9VRp3YDiJPlug'

const Login = () => {
    const [postData, signin] = usePost(url)   
    const login = async() => {
        await signin({
            email: 'mmmsieto@gmail.com',
            password: '123456',
            returnSecureToken: true
        })
    }
    return(
        <div className='container'>
            <h1>Login</h1>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login

