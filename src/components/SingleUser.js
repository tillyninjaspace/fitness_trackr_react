//STRETCH GOAL --- COME BACK IF HAVE TIME
import React from 'react';
import {useParams} from 'react-router-dom';
import Routines from './Routines'

console.log("is this working for SINGLEUSER")
//created this whole file on Nov 3
// /users/:username/routines    
//maybe put username in parameter
export default (props) => {
    console.log("What are props inside of SingleUser", props)
    console.log("hello single user")
    const  {routinesList, currentUsername} = props
    const {username} = useParams();

    const [filteredUser] = routinesList.filter(routine => username === routine.creatorName);
    console.log('filteredUser: ', filteredUser);
    
    
    return <>
      <div>
      <h1>Single User</h1>
      <h2>Name: {username} </h2> 
     
      { console.log("What is filtered User inside of return", filteredUser)}
        { filteredUser && filteredUser.length > 0 &&  filteredUser.map((userRoutine) => 
                <div key={userRoutine.id}>
                {userRoutine.name}
                </div>
            )
        }
    </div>  
    </>
  }










  //Extra Stuff
       {/* {filteredUser && <Routines userRoutines={filteredUser} />} */}
//This works but maybe for MyRoutines
    //    const [filteredUserName] = routinesList.filter(routine => currentUsername === routine.creatorName);
    //    console.log('filteredUserName: ', filteredUserName);     