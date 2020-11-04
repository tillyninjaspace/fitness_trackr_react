import React, {useState} from 'react';
import './Header.css'
import './Sign.css'

const NewAccount = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

    const handleSubmit = async (event) => {
    console.log("What is NEW ACCOUNT username and password",username, password)
//TRY CATCH
    event.preventDefault();
try {    
    const response = await fetch('http://infinite-thicket-81951.herokuapp.com/api/users/register', {
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

export default NewAccount;