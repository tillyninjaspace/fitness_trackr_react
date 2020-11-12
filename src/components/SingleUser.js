import React from 'react';
import {useParams} from 'react-router-dom';

export default (props) => {
    console.log("What are props inside of SingleUser", props)
    const { username } = useParams();
    const  { routinesList } = props
    const filteredUser = routinesList.filter(routine => username === routine.creatorName);
   
    return <>
      <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
      <h1 style={{paddingTop: "5px"}}>User</h1>
      <h2>Routines by: {username} </h2> 
     
      { console.log("What is filtered User inside of return", filteredUser)}

        <div className="singleUserSection" style={{display: "flex", justifyContent: "center",
        flexWrap: "wrap"}}>
        { filteredUser && filteredUser.length > 0 &&  filteredUser.map((userRoutine) => 
                <div key={userRoutine.id} style={{border: "3px solid rgb(133, 148, 161)",
                  borderRadius: "5px", width: "250px", padding: "10px"}}>
                <section>
                <h3>{username}'s Routine: {userRoutine.name}</h3>
                <p>Goal: {userRoutine.goal}</p>
                </section> 

                { userRoutine.activities ? 
                <>
                <section className="actList">
                <p>Activities:</p>
                    {userRoutine.activities.map((activity, idx) => 
                    <div key={idx}
                    className="eachActivity">
                    <p>Name: {activity.name}</p>
                    <p>Description: {activity.description}</p>
                    <p>Duration: {activity.duration}</p>
                    <p>Count: {activity.count}</p>
                    </div>
                    )}
                </section>
                </>
                : ''
                }      

                </div>
            ) 
        }
        </div>
      </div>  
    </>
};