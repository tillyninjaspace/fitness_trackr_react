import React, {useEffect, useState} from 'react';
import './MyRoutines.css'

import { deleteRoutine, addActivity } from '../api';

import NewActivity from './Forms'


const MyRoutines = (props) => {
    console.log("What are the props under MyRoutines", props)
    const { currentUsername, routinesList, setRoutines, token, 
            usernameRoutineList, setUsernameRoutineList, activitiesList
            } = props


    const [name, setName] = useState('')
    const [goal, setGoal] = useState('')
    const [isPublic, setIsPublic] = useState(true)
    // const [ usernameRoutineList, setUsernameRoutineList] = useState([])
    // const [changeRoutineList, setChangeRoutineList] = useState(false)

// useState For Editing a Routine    
    const [ editName, setEditName ] = useState('')
    const [ editGoal, setEditGoal ] = useState('')
    const [ editId, setEditId ] = useState(1)
    const [ isEditing, setIsEditing] = useState(false)
// useState for Editing ends
console.log(editId)

//for Adding an activity
    const [ activityId, setActivityId] = useState(3)
    const [ count, setCount] = useState(0)
    const [ duration, setDuration] = useState(0)

// ----
    const [ routineIdtoAddActivity, setRoutineIdtoAddActivity ] = useState(1)
console.log("What is the ROUTINE ID TO ADD ACT", routineIdtoAddActivity)
//Adding an activity ends
    

//Filtering Routines by Logged in Username THIS WORKS
    // const routinesbyUsername = routinesList.filter(routine => currentUsername === routine.creatorName);
    // console.log('routinesbyUserName: ', routinesbyUsername); 


    //GOLDEN  -- moved to main index 
// const initialList = routinesList.filter(routine => currentUsername === routine.creatorName) 

// useEffect(() => {
//     // if (!changeRoutineList) {
//     setUsernameRoutineList(initialList)
//     // }
// },[])
// GOLDEN ends

// const initialList = routinesList.filter(routine => currentUsername === routine.creatorName) 

// useEffect(() => {
//     // if (!changeRoutineList) {
//     setUsernameRoutineList(initialList)
//     // }
// },[])


// console.log('usernameRoutinesList: ', usernameRoutineList) 
// console.log("activitiesList in My Routines to pass to Forms", activitiesList)

    const handleSubmit = async (event) => {
            console.log("What is the new Routine name and goal", name, goal)
            event.preventDefault()
    
            try {
                const response = await fetch('http://localhost:4000/api/routines', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                        },
                    body: JSON.stringify({
                    name: `${name}`,
                    goal: `${goal}`,
                    isPublic: `${isPublic}`
                    })
                })
                console.log("What is the response from the routines form", response)
                const data = await response.json()
                console.log("What is the dataJSON from routines form", data)
               
                const newRoutinesList = [...routinesList]
                const newUserRoutinesList = [...usernameRoutineList]

                console.log("What is the New Routines List", newRoutinesList)
                

                newUserRoutinesList.unshift(data)
                setUsernameRoutineList(newUserRoutinesList)

                newRoutinesList.unshift(data)
                setRoutines(newRoutinesList)
     //Trying this again
    //  setChangeRoutineList(true)
     
                setName('')
                setGoal('')
    
            } catch (error) {
                console.error(error)
            }
    }


    const handleEditSubmit = async (event) => {
        console.log("What is the updated Routine name and goal", editName, editGoal)
        event.preventDefault()

        try {
            const response = await fetch(`http://localhost:4000/api/routines/${editId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                body: JSON.stringify({
                name: `${editName}`,
                goal: `${editGoal}`,
                isPublic: `${isPublic}`
                })
            })
            console.log("What is the response from the UPDATED routines form", response)
            const data = await response.json()
            console.log("What is the dataJSON from UPDATED routines form", data)
//Trying Splice -- Worked for updates on both sides
            const newList = [...routinesList]
            const newUserRoutinesList = [...usernameRoutineList]

            const index = newList.findIndex(a => a.id === editId);
            console.log("WhaT is this UPDATE index", index)
            if (index === -1) return;
            newList.splice(index, 1, data);
            setRoutines(newList)    

            const index2 = newUserRoutinesList.findIndex(a => a.id === editId);
            console.log("WhaT is this UPDATE index", index2)
            newUserRoutinesList.splice(index2, 1, data);
            setUsernameRoutineList(newUserRoutinesList)  
//End Splice
        } catch (error) {
            console.error(error)
        }
}

     


    return (
        <>
        <div className="myRoutinesSection">
                <h1>My Routines</h1>

                <form className='myRoutineForm'
                    onSubmit={handleSubmit}>
                <h2>Create a New Routine</h2>
                <label>Name</label>
                <input type="text" placeholder="name" value={ name } 
                    onChange={(event) => {
                    setName(event.target.value)
                    }}/>
                <label>Goal</label>    
                <input type="text" placeholder="goal" value={ goal }
                    onChange={(event) => {
                    setGoal(event.target.value)}}/>

                <button>Add Routine</button>
                </form>

                <h2>Hi {currentUsername}</h2> 


            <div className="routineMain">
            
            {   
                usernameRoutineList && usernameRoutineList.length > 0 &&  
                usernameRoutineList.map((userRoutine) => 

                <div key={userRoutine.id} style={{border: "1px solid black", width: "200px"}} className="routineCard">

                <section>
                <h3>{userRoutine.name}</h3>
                <p>Goal: {userRoutine.goal}</p>
                <p>Creator: {userRoutine.creatorName}</p>
                </section>
{/* activitites  */}
        { userRoutine.activities ? 
                <>
                <section className="actList">
                <p>Activities:</p>
                    {userRoutine.activities.map((activity) => 
                    <div key={activity.id} className="eachActivity">
                    <p>Name:{activity.name}</p>
                    <p>Description:{activity.description}</p>
                    <p>Duration: {activity.duration}</p>
                    <p>Count: {activity.count}</p>
                    </div>
                    )
                    }
                </section>
                </>
                : ''
                    
        }     
{/* activities ends */}


                <button className="edit" onClick={() => {
                    setIsEditing(true)
                    setEditName(userRoutine.name)
                    setEditGoal(userRoutine.goal)
                    setEditId(userRoutine.id)}}>Edit</button>

                <button className="delete" onClick={(event) => {
                    console.log("What is the this routine.id value", userRoutine.id)
                    console.log("delete button")
                    const newList = [...routinesList]
                    const newUserList = [...usernameRoutineList]

                    const index = newList.findIndex(a => a.id === userRoutine.id);
                    console.log("WhaT is this index", index)
                    if (index === -1) return;
                    newList.splice(index, 1);
                    setRoutines(newList)

                    const index2 = newUserList.findIndex(a => a.id === userRoutine.id);
                    if (index2 === -1) return;
                    newUserList.splice(index2, 1);
                    setUsernameRoutineList(newUserList)
                   
                    deleteRoutine(userRoutine.id, token)}}>Delete</button>

{/* NEW ACTIVITY FORM */}
                <>
                <button
                    onClick={(event) => {setRoutineIdtoAddActivity(userRoutine.id)}}>
                <NewActivity activitiesList={activitiesList} routineIdtoAddActivity={routineIdtoAddActivity}
                    token={token}  />
                </button>
                </>
{/* NEW ACTIVITY FORM ENDS */}


                </div>
                //Above is where the CARD Closes
            )
        }
        </div>
       
{/* Where the card border ends       */}

{/* Edit ROUTINE FORM */}
            <form className='routineEditForm' style={{border: "1px solid gray", 
                display: isEditing? 'block' : 'none'}}
                onSubmit={handleEditSubmit}>
                <h2 className="nameHeading"><span>Edit Routine</span> 
                <span className="close" onClick={() => setIsEditing(false)}>X CLOSE</span> 
                </h2>
                
                <label >Name</label>
                <input type="text" placeholder="name" value={ editName } 
                onChange={(event) => {
                    setEditName(event.target.value)}}/>
                <label>Goal</label>
                <input type="textarea" placeholder="goal" value={ editGoal }
                onChange={(event) => {setEditGoal(event.target.value)}}/>
            
                <button style={{padding: "5px", color: "purple", 
                 border: "1 solid black"}}>
                Edit Routine</button>
            </form>



    </div>
    </>
    )
}

export default MyRoutines;




//extra
{/* <label>Public? 
            <select>
            <option value="true">Yes</option>
            <option value="false">No</option>
            </select>
            </label>    */}


            {/* DOCS didn't mention having isPublic as a requirement so come back if have time                 */}
            {/* <label>Public? 
            <select>
            <option value="true">Yes</option>
            <option value="false">No</option>
            </select>
            </label>    */}