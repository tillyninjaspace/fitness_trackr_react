import React from 'react';
import {useParams} from 'react-router-dom';

export default (props) => {
  const { username } = useParams();
  const  { routinesList } = props
  const filteredUser = routinesList.filter(routine => username === routine.creatorName && routine.isPublic);

  return <>
    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
    <h1 style={{paddingTop: "5px"}}>User</h1>
    <h2>Public Routines by: {username} </h2> 
      <div className="singleUserSection" style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
        { filteredUser && filteredUser.length > 0 &&  filteredUser.map((userRoutine) => 
            <div key={userRoutine.id} style={{border: "3px solid rgb(133, 148, 161)",
                  borderRadius: "5px", width: "250px", padding: "10px"}}>
                <section>
                <h3>{username}'s Routine: {userRoutine.name}</h3>
                <p><b>Goal:</b>{userRoutine.goal}</p>
                </section> 
                { userRoutine.activities ? 
                  <>
                  <section className="actList">
                    <p>Activities:</p>
                    {userRoutine.activities.map((activity) => 
                      <div key={activity.routineActivityId} className="eachActivity">
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