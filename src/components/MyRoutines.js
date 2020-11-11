import React, {useEffect, useState} from 'react';
import './MyRoutines.css'

import { deleteRoutine, addActivity, deleteRoutineActivity, getUserRoutines,
        editRoutineActivity } from '../api';

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
    const [ isEditingRA, setIsEditingRA] = useState(false)
    const { hadAChange, setHadAChange } = props
// useState for Editing ends
console.log(editId)

//for Adding an activity
const [routineActivityList, setRoutineActivityList] = useState([])
console.log("what is the routineActivityList under MY ROUTINES SECTION", routineActivityList)
// ----
    const [ routineIdtoAddActivity, setRoutineIdtoAddActivity ] = useState(1)

    console.log("What is the ROUTINE ID TO ADD ACT", routineIdtoAddActivity)
//Adding an activity ends
    const [routineError, setRoutineError] = useState('')

// --- for EDITING A ROUTINE activity
const [ editRoutineActivityDuration, setEditRoutineActivityDuration ] = useState(0)
      const [ editRoutineActivityCount, setEditRoutineActivityCount ] = useState(0)
      const [ editRoutineActivityId, setEditRoutineActivityId ] = useState(0)
      const [nameOfRoutineActivityEdit, setNameOfRoutineActivityEdit] = useState('')
// --- End of FOR EDITING A ROUTINE ACTIVITY
    
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

useEffect(() => {
   
    getUserRoutines(currentUsername)
       .then(routines => {
           console.log("What are routines in the GET GET function", routines)
        setUsernameRoutineList(routines)
       })
       .catch(error => {
           console.error(error)
       });
    }, []);


    ///THIS DEFINITELY WORKS FOR DELETING A ROUTINE ACTIVITY! Nov 9

    useEffect(() => {
        getUserRoutines(currentUsername)
           .then(routines => {
               console.log("What are routines in the GET TWO TWO function", routines)
            setUsernameRoutineList(routines)
            setHadAChange(false)
           })
           .catch(error => {
               console.error(error)
           });
        }, [hadAChange]);
    



console.log('MOO MOO usernameRoutinesList: ', usernameRoutineList) 
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

                if (data.error) {
                    setRoutineError('Sorry, your Routine was not added due to duplicate routine')
                return
                } else {
                    setRoutineError('')
                }
               
                const newRoutinesList = [...routinesList]
                const newUserRoutinesList = [...usernameRoutineList]

                console.log("What is the New Routines List", newRoutinesList)
                

                newUserRoutinesList.unshift(data)
                setUsernameRoutineList(newUserRoutinesList)

                newRoutinesList.unshift(data)
                setRoutines(newRoutinesList)


     //Trying this again foR HAD A CHANGE
                setHadAChange(true)
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

            setHadAChange(true)
//Trying Splice -- Worked for updates on both sides
            // const newList = [...routinesList]
            // const newUserRoutinesList = [...usernameRoutineList]

            // const index = newList.findIndex(a => a.id === editId);
            // console.log("WhaT is this UPDATE index", index)
            // if (index === -1) return;
            // newList.splice(index, 1, data);
            // setRoutines(newList)    

            // const index2 = newUserRoutinesList.findIndex(a => a.id === editId);
            // console.log("WhaT is this UPDATE index", index2)
            // newUserRoutinesList.splice(index2, 1, data);
            // setUsernameRoutineList(newUserRoutinesList)  
//End Splice
        } catch (error) {
          console.error(error)
        }
}

//newest handler Nov 10
const handleEditRoutineActivitySubmit = async (event) => {
     event.preventDefault()
    try {
        const editData = await editRoutineActivity(editRoutineActivityId, token, editRoutineActivityCount, editRoutineActivityDuration)
        console.log("What is the returned EDIT DATA of RA", editData)

        setHadAChange(true)
        setEditRoutineActivityId(0)
        setEditRoutineActivityCount(0)
        setEditRoutineActivityDuration(0)
    } catch (error) {
        console.log(error)
    }
}

     


    return (
        <>
        <div className="myRoutinesSection">
                <h1>My Routines</h1>

                <form className='myRoutineForm'
                    onSubmit={handleSubmit}>
                <h2>Create a New Routine</h2>
                
            { routineError ? 
            <p style={{color: "red", backgroundColor: "white"}}>{routineError} </p> : ''
            }
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

             {  userRoutine.creatorName ?
                <p>Creator: {userRoutine.creatorName}</p>
                : <p>Creator: Me</p>

             }   
                </section>

{/* activitites  */}


            { userRoutine.activities ? 
                 <>
                <section className="actList">
                <p>Activities:</p>
                    {userRoutine.activities.map((activity) => 
                    <div key={activity.RoutineActivityId} className="eachActivity">
                    <p>Name: {activity.name}</p>
                    <p>Description: {activity.description}</p>
                    <p>Duration: {activity.duration}</p>
                    <p>Count: {activity.count}</p>
                    <button className="editRoutineActivity"
// //Editing RA      
                    onClick={() => {
                        setIsEditingRA(true)
                        setEditRoutineActivityId(activity.RoutineActivityId)
                        setEditRoutineActivityCount(activity.count)
                        setEditRoutineActivityDuration(activity.duration)
                        setNameOfRoutineActivityEdit(activity.name)
                    }}      
//                    
                    >Edit</button>

                    <button className="delete"
                    // style={{color: "red", padding: "3px"}}
                    onClick={() => {
                        console.log("delete routine activity", "routineActivityID:", activity.RoutineActivityId)
//  Ask for Help  to find Routine Activity ID when it is not in API docs and my own pull. DO I need
// to edit DATABASE?                    
                    //     console.log("What are the userRoutine.activitites", userRoutine.activities)
                   
                    // const leftover = userRoutine.activities.filter(routineActivity => routineActivity.id !== activity.RoutineActivityId) 
                    // console.log("What is leftover", leftover)

                    // userRoutine.activities = leftover
                    // console.log("What are the userRoutine.activities now", userRoutine.activities )

                    setHadAChange(true)
//    !!!! THIS WORKS BELOW BUT going to do TEST FIRST
                    deleteRoutineActivity(activity.RoutineActivityId, token)
                        
                    }}
                    
                    >Delete</button>

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
{/* Changing button to Div because of nesting red error               */}
                <div
                    onClick={(event) => {setRoutineIdtoAddActivity(userRoutine.id)}}>
                <NewActivity activitiesList={activitiesList} routineIdtoAddActivity={routineIdtoAddActivity}
                    token={token} 

                    routineActivityList={routineActivityList} setRoutineActivityList={setRoutineActivityList}
                    hadAChange={hadAChange} setHadAChange={setHadAChange}
    // editRoutineActivityDuration={ editRoutineActivityDuration} setEditRoutineActivityDuration={setEditRoutineActivityDuration}
    // editRoutineActivityCount={editRoutineActivityCount} setEditRoutineActivityCount={setEditRoutineActivityCount}
    // editRoutineActivityId={editRoutineActivityId} setEditRoutineActivityId={setEditRoutineActivityId}
                    
                    
                    />
                </div>
                </>
{/* NEW ACTIVITY FORM ENDS */}


                </div>
                //Above is where the CARD Closes
            )
        }
        </div>
       
{/* Where the card border ends       */}

{/* Edit ROUTINE FORM */}
            <form className='routineEditForm' style={{
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
            
                <button style={{padding: "5px", 
                 border: "1 solid black"}}>
                Edit Routine</button>
            </form>


        {/* Edit RoutineActivity Form             */}   
        <form className="editingRoutineActivityForm"  
        onSubmit={handleEditRoutineActivitySubmit}
        style={{display: isEditingRA? 'block' : 'none', textAlign: "center"}}
            // {(event) => {event.preventDefault()
            //     console.log("EDIT RC TESTING MODE What are the form values collected?", "RoutineACT ID:", editRoutineActivityId,
            //     "EDIT RC Duration:", editRoutineActivityDuration, "EDIT RC Count:", editRoutineActivityCount)
            // }}
            
>
            <p>Routine Activity Update:<span>{nameOfRoutineActivityEdit}</span></p>
            
            <label>Duration</label>
             <input type="number" name="editDuration" 
                value={ editRoutineActivityDuration}
                min="0" onChange={(event) => {
                setEditRoutineActivityDuration(event.target.value)}} />

             <label>Count</label>
             <input type="number" name="editCount" 
                value={ editRoutineActivityCount }
                min="0" onChange={(event) => {
                setEditRoutineActivityCount(event.target.value)}} />
             <button style={{padding: "5px"}}>Submit Edit</button><span className="close"
             onClick={() => setIsEditingRA(false)}
             >X CLOSE</span>
           </form>
{/* End of RoutineActivityForm */}
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