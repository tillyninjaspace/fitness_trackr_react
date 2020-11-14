import React, {useEffect, useState} from 'react';
import './MyRoutines.css'

import { deleteRoutine, deleteRoutineActivity, getUserRoutines,
         editRoutineActivity } from '../api';

import NewActivity from './Forms'

const MyRoutines = (props) => {
    const { currentUsername, routinesList, setRoutines, token, 
            usernameRoutineList, setUsernameRoutineList, activitiesList,
            hadAChange, setHadAChange } = props
    
    const [ name, setName ] = useState('')
    const [ goal, setGoal ] = useState('')
    const [ isPublic, setIsPublic ] = useState(true)  
    const [ editName, setEditName ] = useState('')
    const [ editGoal, setEditGoal ] = useState('')
    const [ editId, setEditId ] = useState(1)
    const [ isEditing, setIsEditing ] = useState(false)
    const [ isEditingRA, setIsEditingRA ] = useState(false)
    const [ routineIdtoAddActivity, setRoutineIdtoAddActivity ] = useState(1)
    const [ routineError, setRoutineError ] = useState('')
    const [ editRoutineActivityDuration, setEditRoutineActivityDuration ] = useState(0)
    const [ editRoutineActivityCount, setEditRoutineActivityCount ] = useState(0)
    const [ editRoutineActivityId, setEditRoutineActivityId ] = useState(0)
    const [ editIsPublic, setEditIsPublic ] = useState(true)
    const [ nameOfRoutineActivityEdit, setNameOfRoutineActivityEdit ] = useState('')

    useEffect(() => {
        getUserRoutines(currentUsername)
       .then(routines => {
        setUsernameRoutineList(routines)
       })
       .catch(error => {
           console.error(error)
       });
    }, []);

    useEffect(() => {
        getUserRoutines(currentUsername)
        .then(routines => {
        setUsernameRoutineList(routines)
        setHadAChange(false)
        })
        .catch(error => {
            console.error(error)
        });
    }, [hadAChange]);
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('https://infinite-thicket-81951.herokuapp.com/api/routines', {
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
                const data = await response.json()
                if (data.error) {
                    setRoutineError('Sorry, your Routine was not added due to duplicate routine')
                    return
                } else {
                    setRoutineError('')
                }
                setHadAChange(true)
                setName('')
                setGoal('')
                setIsPublic(true)
        } catch (error) {
          console.error(error)
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`https://infinite-thicket-81951.herokuapp.com/api/routines/${editId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                body: JSON.stringify({
                name: `${editName}`,
                goal: `${editGoal}`,
                isPublic: `${editIsPublic}`
                })
            })
            await response.json()
            setHadAChange(true)
        } catch (error) {
          console.error(error)
        }
    };

    const handleEditRoutineActivitySubmit = async (event) => {
        event.preventDefault()
        try {
            const editData = await editRoutineActivity(editRoutineActivityId, token, editRoutineActivityCount, editRoutineActivityDuration)
            setHadAChange(true)
            setEditRoutineActivityId(0)
            setEditRoutineActivityCount(0)
            setEditRoutineActivityDuration(0)
        } catch (error) {
          console.log(error)
        }
    };

    return (
        <>
        <div className="myRoutinesSection">
            <h1>My Routines</h1>
            <form className='myRoutineForm' onSubmit={handleSubmit}>
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
                <label>Is Public?</label>
                <select value={ isPublic } style={{width: "50px", alignSelf: "center"}}
                onChange={(event) => {setIsPublic(event.target.value)}}
                name="isPublic">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
                </select>
                <button>Add Routine</button>
                </form>

            <h2>Hi {currentUsername}</h2> 
            <div className="routineMain">
            {   
                usernameRoutineList && usernameRoutineList.length > 0 &&  
                usernameRoutineList.map((userRoutine) => 
                <div key={userRoutine.id} style={{border: "3px solid rgb(133, 148, 161)", 
                borderRadius: "5px", width: "250px", padding: "10px"}} className="routineCard">
                <section>
                <h3>{userRoutine.name}</h3>
                <p><span className="myRoutineInfo">Goal:</span>{userRoutine.goal}</p>
                <p><span className="myRoutineInfo">Creator:</span>{userRoutine.creatorName}</p>   
                <p className="isPublic"><span className="myRoutineInfo">Is Public:</span>{ userRoutine.isPublic ? 'Yes' : 'No' }</p>      
                </section>

                { userRoutine.activities ? 
                    <>
                    <section className="actList">
                    <p>Activities:</p>
                    {   userRoutine.activities.map((activity) => 
                        <div key={activity.RoutineActivityId} className="eachActivity">
                        <p>Name: {activity.name}</p>
                        <p>Description: {activity.description}</p>
                        <p>Duration: {activity.duration}</p>
                        <p>Count: {activity.count}</p>
                        <button className="editRoutineActivity"
                            onClick={() => {
                            setIsEditingRA(true)
                            setEditRoutineActivityId(activity.RoutineActivityId)
                            setEditRoutineActivityCount(activity.count)
                            setEditRoutineActivityDuration(activity.duration)
                            setNameOfRoutineActivityEdit(activity.name) }}>Edit</button>
                        <button className="delete"
                            onClick={() => {
                            setHadAChange(true)
                            deleteRoutineActivity(activity.RoutineActivityId, token) }}>Delete</button>
                        </div>
                        )
                    }
                    </section>
                    </>
                    : ''
                }     

                <button className="edit" onClick={() => {
                setIsEditing(true)
                setEditName(userRoutine.name)
                setEditGoal(userRoutine.goal)
                setEditId(userRoutine.id)}}>Edit</button>

                <button className="delete" onClick={(event) => {
                const newList = [...routinesList]
                const newUserList = [...usernameRoutineList]
                const index = newList.findIndex(routine => routine.id === userRoutine.id);
                if (index === -1) return;
                newList.splice(index, 1);
                setRoutines(newList)
                const index2 = newUserList.findIndex(routine  => routine.id === userRoutine.id);
                if (index2 === -1) return;
                newUserList.splice(index2, 1);
                setUsernameRoutineList(newUserList)
                deleteRoutine(userRoutine.id, token)}}>Delete</button>

                <>
                <div onClick={(event) => {setRoutineIdtoAddActivity(userRoutine.id)}}>
                <NewActivity activitiesList={activitiesList} routineIdtoAddActivity={routineIdtoAddActivity}
                    token={token} hadAChange={hadAChange} setHadAChange={setHadAChange} />
                </div>
                </>
            </div>
            )}
        </div>
       
        <form className='routineEditForm' style={{ display: isEditing? 'block' : 'none' }}
            onSubmit={handleEditSubmit}>
            <h2 className="nameHeading"><span>Edit Routine</span> 
            <span className="close" onClick={() => setIsEditing(false)}>X CLOSE</span> 
            </h2>
            <label >Name</label>
            <input type="text" placeholder="name" value={ editName } onChange={(event) => { setEditName(event.target.value) }}/>
            <label>Goal</label>
            <input type="textarea" placeholder="goal" value={ editGoal } onChange={(event) => {setEditGoal(event.target.value)}}/>
            <label>Is Public?</label>
            <select value={ editIsPublic } style={{width: "50px", alignSelf: "center"}}
                onChange={(event) => {setEditIsPublic(event.target.value)}} name="isPublic">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
            <button style={{padding: "5px", border: "1 solid black"}}>Submit Edit</button>
        </form>

        <form className="editingRoutineActivityForm"  
            onSubmit={handleEditRoutineActivitySubmit}
            style={{display: isEditingRA? 'block' : 'none', textAlign: "center"}}>
            <p>Routine Activity Update:<span>{nameOfRoutineActivityEdit}</span></p>
            <label>Duration</label>
            <input type="number" name="editDuration" value={ editRoutineActivityDuration}
                min="0" onChange={(event) => {setEditRoutineActivityDuration(event.target.value)}} />
            <label>Count</label>
            <input type="number" name="editCount" value={ editRoutineActivityCount }
                min="0" onChange={(event) => {setEditRoutineActivityCount(event.target.value)}} />
            <button style={{padding: "5px"}}>Submit Edit</button><span className="close"
                onClick={() => setIsEditingRA(false)}>X CLOSE</span>
        </form>
        </div>
        </>
    )
};

export default MyRoutines;