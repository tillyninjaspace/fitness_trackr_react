import React, {useState} from 'react';
import './Header.css'
import './Sign.css'

const Forms = () => {

    //Still working on all of this
    //Problem: Line 26 shows undefined in console.log
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
            event.preventDefault();
            fetch('https://infinite-thicket-81951.herokuapp.com/api/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                username: {username},
                password: {password}
            })
            }).then(response => {
            console.log(response) 
            response.json()
            })
            .then(result => {
            console.log(result);
            // return result
            })
            .catch(console.error);
    }
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
             <button className='submitButton'>Submit</button>
            </form>


        </div>
    )
}

export default Forms;


//An example 

// const Form = props => {
//     const [username, setUsername] = useState('');
//     const handleSubmit = event => {
//       event.preventDefault();
//       axios.get(`http://api.github.com/users/${username}`)
//         .then(response => {
//           props.onSubmit(response.data);
//           setUsername('');
//         });
//     }
//     return(
//       <form onSubmit={handleSubmit}>
//         <input 
//           type="text"
//           value={username}
//           onChange={event => setUsername(event.target.value)}
//           placeholder="GitHub username"
//           required
//           />
//           <button type="submit">Add card</button>
//       </form>
//     );
//   }


//Take one inside of the input
 
                // (event) => {
                // event.preventDefault()
                // console.log("What is the username", username)
                // console.log("What is the password", password)

                // fetch('https://infinite-thicket-81951.herokuapp.com/api/users/login', {
                //     // fetch('http://fitnesstrac-kr.herokuapp.com/api/users/login', {
                //         method: "POST",
                //         headers: {
                //             'Content-Type': 'application/json'
                //             // 'Authorization': 'Bearer'
                //             // 'Authorization': 'Bearer TOKEN_STRING_HERE'
                //             },
                //             body: JSON.stringify({
                //             username: {username},
                //             password: {password}
                //         })
                //         })
                //         .then(response => {
                //           console.log(response)
                //           response.json()
                //         })
                //         .then(data => {
                //         console.log(data);
                //         return data
                //         })
                //         .catch(console.error);

                //     }}




            //     // setUsername('')
            //     // setPassword('')
//take1 ends


//alternative link
  // // await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/login', {


// an axios example
   //  event.preventDefault();
            //   axios.get(`http://api.github.com/users/${username}`)
            //     .then(response => {
            //       props.onSubmit(response.data);
            //       setUsername('');
            //     });