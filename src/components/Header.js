import React, {useState} from 'react';
import './Header.css';
// import 
//     Forms
//    from './Sign';
// import NewAccount from './NewAccount'
import { getUser } from '../api'


const BASE = 'http://localhost:4000/api'

// const BASE = 'http://infinite-thicket-81951.herokuapp.com/api'


const Header = (props) => {
    console.log("Header props", props)
    
    const [loggingIn, setLoggingIn] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const {token, setToken, setCurrentUsername, currentUsername} = props

//LOGIN
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
          console.log("what is the log in response", response)
          console.log(response.status)
          const data = await response.json()
          console.log("What is LOG-IN data", data)
          console.log("What is LOG-IN token?", data.token)
//GETTING USER IS NOT WORKING --- may not need it         
          await setToken(data.token)
          if (data.token) {
          await setCurrentUsername(data.user.username)
          }
//Take 2 on Getting User          
          const trygettinguser = await getUser(data.token)
          console.log("Do we see user info ID", trygettinguser)
//End Getting User          
          console.log("What is LOG-in token after setToken func", token)
          if (data.error) {
            setErrorMessage(data.message) || setErrorMessage(data.error + '. No username found.')
        } else {
            setErrorMessage('')
        }

        } catch(error) {
          console.error(error)
        }

//trying to getUser after is an idea

      
      }
      //END TRY CATCH
      console.log("What is token outside the function", token)
      console.log("What is the USERNAME outside the function", currentUsername)
          return (
              <div className='forms'>
                  <h2 className="formTitle">Log In</h2>
                  <form 
                  onSubmit={handleSubmit}
                  >
                  <input 
                      type="text" 
                      placeholder="Username" 
                      value={ username }
                      name="username"
                      onChange={(event) => {
                          setUsername(event.target.value)
                      }}
                  />
      
                  <input 
                      type="text" 
                      placeholder="Password" 
                      value={ password }
                      name="password"
                      onChange={(event) => {
                          setPassword(event.target.value)
                      }}
                  />
                   <button type="submit" className='submitButton'>Submit</button>
                  </form>
      
      
              </div>
          )
      }
//NEW ACCOUNT
// console.log("What is the token in between Login and New Account Forms", token)
      const NewAccount = () => {
        const [newUsername, setNewUsername] = useState('')
        const [newPassword, setNewPassword] = useState('')

          const handleSubmit = async (event) => {
        //   console.log("What is NEW ACCOUNT username and password input", newUsername, newPassword)
      //TRY CATCH
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
          console.log("what is the log in response", response)
          console.log(response.status)
          const data = await response.json()
          console.log("What is NEW ACCOUNT data", data)
          console.log("What is NEW ACCOUNT token?", data.token)
          if (data.error) {
              setErrorMessage(data.message)
          }  else {
            setErrorMessage('')
          }
          
      } catch(error) {
        console.error(error)
      }
      
    }

 console.log("error message", errorMessage)
      
          return (
              <div className='forms'>
                  <h2 className="formTitle">New Account</h2>
                  <form 
                  onSubmit={handleSubmit}
                  >
                  <input 
                      type="text" 
                      placeholder="Username" 
                      value={ newUsername }
                      name="newusername"
                      onChange={(event) => {
                          setNewUsername(event.target.value)
                      }}
                  />
      
                  <input 
                      type="text" 
                      placeholder="Password" 
                      value={ newPassword }
                      name="newpassword"
                      onChange={(event) => {
                          setNewPassword(event.target.value)
                      }}
                  />
                   <button type="submit" className='submitButton'>Submit</button>
                  </form>
      
      
              </div>
          )
      }
        
console.log("What is currentUsername result", currentUsername)
    
    return (
        <header>
        <h1 className='mainHeader'>Fitness Tracker</h1>
        {/* <Forms /> */}
        <section className="toggleSignIn">
        <button className="toggleButton"
        onClick={() => setLoggingIn(!loggingIn)}>{loggingIn ? 'New User? Create Account' : 'Already have an Account? Log In'}</button>
        { errorMessage? <p className="errorMessage">{errorMessage}</p> : '' }

     { 
        loggingIn ? <LogInForm />
        :
        <NewAccount />
     }
        </section>
        </header>
    )
}

export default Header;