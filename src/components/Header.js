import React, {useState} from 'react';
import './Header.css';
import { getUser } from '../api'

import {
    storeCurrentUser,
    clearCurrentUser,
    storeCurrentToken,
    clearCurrentToken
} from '../auth';
  

const BASE = 'http://localhost:4000/api'

// const BASE = 'http://infinite-thicket-81951.herokuapp.com/api'


const Header = (props) => {
    const [loggingIn, setLoggingIn] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const {token, setToken, setCurrentUsername, currentUsername} = props

    const LogInForm = () => {
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        
        const handleSubmit = async (event) => {
          console.log("What is LOG-IN username and password input", username, password)
            event.preventDefault();
            try {    
                const response = await fetch('http://localhost:4000/api/users/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                  username: `${username}`, password: `${password}`
                })
                });
                const data = await response.json()
                if (data.error) {
                    setErrorMessage(data.message) || setErrorMessage(data.error + '. No matching Username and Password found.')
                } else {
                    setErrorMessage('')
                }      
                if (data.token) {
                    await setCurrentUsername(data.user.username)   
                    await setToken(data.token)        
                    await storeCurrentUser(data.user.username)
                    await storeCurrentToken(data.token)
                    await getUser(data.token)
                }      
            } catch(error) {
                console.error(error)
            }
        };
      
        return (
                <div className='forms'>
                    <h2 className="formTitle">Log In</h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={ username }
                            name="username"
                            onChange={(event) => {
                            setUsername(event.target.value)}}/>
      
                        <input 
                            type="text" 
                            placeholder="Password" 
                            value={ password }
                            name="password"
                            onChange={(event) => {
                            setPassword(event.target.value)}}/>
                        <button type="submit" className='submitSign'>Log In</button>
                    </form>
                </div>
        )
    };

    const NewAccount = () => {
        const [newUsername, setNewUsername] = useState('')
        const [newPassword, setNewPassword] = useState('')

        const handleSubmit = async (event) => {
            event.preventDefault();
            try {    
                const response = await fetch('http://localhost:4000/api/users/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: `${newUsername}`,
                    password: `${newPassword}`
                })
            });
                const data = await response.json()
                if (data.error) {
                    setErrorMessage(data.message)
                    return
                } else {
                    setErrorMessage('')
                }
    
                const newUser = await getUser(data.token)
                await storeCurrentUser(data.user.username)
                await storeCurrentToken(data.token)
                if (!data.error && data.token && newUser) {
                    await setToken(data.token)    
                    await setCurrentUsername(newUser.username)
                }
            } catch(error) {
                console.error(error)
            }
        };

        return (
            <div className='forms'>
                <h2 className="formTitle">New Account</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={ newUsername }
                        name="newusername"
                        onChange={(event) => {
                          setNewUsername(event.target.value)
                        }}/>
      
                    <input 
                        type="text" 
                        placeholder="Password" 
                        value={ newPassword }
                        name="newpassword"
                        onChange={(event) => {
                          setNewPassword(event.target.value)
                        }}/>
                    <button type="submit" className='submitSign'>Create New Account</button>
                </form>
            </div>
        )
    };
        
    return (
        <header>
        <h1 className='mainHeader'>Fitness Tracker</h1>
        <section className="toggleSignIn">
        {
            token ? 
            <button className="signOut"
                onClick={() => {setToken('') 
                    setCurrentUsername('')
                    clearCurrentUser();
                    clearCurrentToken();
                    }}>Sign Out</button>
            :
            <button className="toggleButton"
                onClick={() => setLoggingIn(!loggingIn)}>{loggingIn ? 'New User? Create Account' : 'Already have an Account? Log In'}</button>
        }

        { errorMessage ? <p className="errorMessage">{errorMessage}</p> : '' }

        <div className="signInForms" style={{display: token? "none" : "block"}}>
        { loggingIn ? <LogInForm /> : <NewAccount /> }
        </div>
        </section>
        </header>
    )
};

export default Header;