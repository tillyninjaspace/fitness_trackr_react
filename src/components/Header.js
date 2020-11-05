import React, {useState} from 'react';
import './Header.css';
// import 
//     Forms
//    from './Sign';
// import NewAccount from './NewAccount'
import {getUser} from '../api'


const BASE = 'http://localhost:4000/api'

// const BASE = 'http://infinite-thicket-81951.herokuapp.com/api'


const Header = (props) => {
    console.log("Header props", props)
    
    const {token, setToken} = props

//LOGIN
    const LogInForm = () => {
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        
        const handleSubmit = async (event) => {
          console.log("What is LOG-IN username and password input",username, password)
          event.preventDefault();
         try {    
          const response = await fetch('http://localhost:4000/api/users/login', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                  username: `${username}`, password: `${password}`
                  
                                    // username: `{username}`, 
                                    //  password: `{password}`
          })
          });
          console.log("what is the log in response", response)
          console.log(response.status)
          const data = await response.json()
          console.log("What is LOG-IN data", data)
          console.log("What is LOG-IN token?", data.token)
//GETTING USER IS NOT WORKING          
          await setToken(data.token)
        //   const trygettinguser = await getUser(token)
        //   console.log("Do we see user info", trygettinguser)
          console.log("What is LOG-in token after setToken func", token)
          //having error here, anyusername and password can log in

        } catch(error) {
        console.error(error)
        }

//trying to getUser after is an idea

      
      }
      //END TRY CATCH
      console.log("What is token outside the function", token)
      //still working on the handleSubmit button above
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
          //having error here, no one can create a new account. Saying everyone exists already.
      
          console.log("What is NEW ACCOUNT token?", data.token)
          
      } catch(error) {
        console.error(error)
      }
      
      }
      //END TRY CATCH
      
      //still working on the handleSubmit button above
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
        

    
    return (
        <header>
        <h1 className='mainHeader'>Fitness Tracker</h1>
        {/* <Forms /> */}
        <LogInForm />
        <NewAccount />
        </header>
    )
}

export default Header;