import React, {useState} from 'react';
import './Header.css';
// import 
//     Forms
//    from './Sign';
import NewAccount from './NewAccount'





const Header = (props) => {
    console.log("Header props", props)

    const LogInForm = () => {
        // console.log("what are LogInForm props", props)
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const {token, setToken} = props

        const handleSubmit = async (event) => {
          console.log("What is LOG-IN username and password",username, password)
      //TRY CATCH
          event.preventDefault();
      try {    
          const response = await fetch('http://infinite-thicket-81951.herokuapp.com/api/users/login', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
              username: '{username}',
              password: '{password}'
          })
          });
          console.log("what is the log in response", response)
          console.log(response.status)
          const data = await response.json()
          console.log("What is LOG-IN data", data)
          console.log("What is LOG-IN token?", data.token)
          setToken(data.token)
          console.log("What is LOG-in token on State?", token)
          //having error here, anyusername and password can log in
      } catch(error) {
        console.error(error)
      }
      
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

    
    return (
        <header>
        <h1 className='mainHeader'>Fitness Tracker B</h1>
        {/* <Forms /> */}
        <LogInForm />
        <NewAccount />
        </header>
    )
}

export default Header;