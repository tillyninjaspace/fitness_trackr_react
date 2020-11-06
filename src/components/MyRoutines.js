import React, {useState} from 'react';
import './MyRoutines.css'

const MyRoutines = (props) => {
    console.log("What are the props under MyRoutines", props)
    const [name, setName] = useState('')
    const [goal, setGoal] = useState('')
    const [isPublic, setIsPublic] = useState(true)
    const [ usernameRoutineList, setUsernameRoutineList] = useState([])

// useState For Editing a Routine    
    const [ editName, setEditName ] = useState('')
    const [ editGoal, setEditGoal ] = useState('')
    const [ editId, setEditId ] = useState(1)
// useState for Editing ends
console.log(editId)
    const { currentUsername, routinesList, setRoutines, token} = props

//Filtering Routines by Logged in Username THIS WORKS
    const routinesbyUsername = routinesList.filter(routine => currentUsername === routine.creatorName);
    console.log('routinesbyUserName: ', routinesbyUsername);   



    //THIS IS BREAKING THE PAGE below
//     setUsernameRoutineList(routinesbyUsername)
//WORKING ON THIS NOV 6TH
// const refreshList = () => {
//     routinesList.filter(routine => currentUsername === routine.creatorName);
// }
// setUsernameRoutineList(routinesbyUsername)

// console.log('reFreshList: ', usernameRoutineList);  
//Working on this ends


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
               
                const newRoutinesList = [...routinesList, data]
                console.log("What is the New Routines List", newRoutinesList)
               
                setRoutines(newRoutinesList)

    
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

            //BElOW may not work Because I am not pushing any new items
            // const newRoutinesList = [...routinesList, data]
            // console.log("What is the New Routines List", newRoutinesList)
            // setRoutines(newRoutinesList)

        } catch (error) {
            console.error(error)
        }
}

     
    

    return (
        <div className="myRoutinesSection">
        <h1>My Routines</h1>

        <form className='myRoutineForm'
            onSubmit={handleSubmit}>
            <h2>Create a New Routine</h2>
            <input type="text" placeholder="name" value={ name } 
                onChange={(event) => {
                    setName(event.target.value)
                }}
                />
            <input type="text" placeholder="goal" value={ goal }
                onChange={(event) => {
                    setGoal(event.target.value)
                }}
                />
            <label>Public? 
            <select>
            <option value="true">Yes</option>
            <option value="false">No</option>
            </select>
            </label>   
            <button>Add Routine</button>
        </form>

        <h2>Hello {currentUsername}</h2> 
{/* New */}

{/* New                 */}
      { console.log("What is the list of ROUTINES by Username inside of return", routinesbyUsername)}
        { routinesbyUsername && routinesbyUsername.length > 0 &&  routinesbyUsername.map((userRoutine) => 
                <div key={userRoutine.id} style={{border: "1px solid black", width: "200px"}}>
                <h4>{userRoutine.name}</h4>
                <p>Goal:{userRoutine.goal}</p>
                <p>Creator:{userRoutine.creatorName}</p>
                <button className="edit" onClick={() => {
                    setEditName(userRoutine.name)
                    setEditGoal(userRoutine.goal)
                    setEditId(userRoutine.id)
                }}>Edit</button>
                <button className="delete">Delete</button>
                </div>
            )
        }

{/* Working on this for EDITING a ROUTINE */}
<form className='routineEditForm' style={{border: "1px solid black", width: "400px", 
            backgroundColor: "yellow",}}
            onSubmit={handleEditSubmit}
            >
            <h2>Edit Routine</h2>
            <input type="text" placeholder="name" value={ editName } 
                onChange={(event) => {
                    setEditName(event.target.value)
                }}
                />
            <input type="text" placeholder="goal" value={ editGoal }
                onChange={(event) => {
                    setEditGoal(event.target.value)

                }}
                />
            <label>Public? 
            <select>
            <option value="true">Yes</option>
            <option value="false">No</option>
            </select>
            </label>   
            <button style={{padding: "5px", color: "purple", 
                 border: "1 solid black"}}>
                Edit Routine</button>
        </form>

        </div>
    )
}

export default MyRoutines;