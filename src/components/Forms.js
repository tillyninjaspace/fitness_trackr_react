//I might not need this section if I add it to the header
//On Nov 4, I added all of this to the header so I can remove this later. Saving this just in case.
//Changing this to add Add Activty Form
//NOV 7, must keep!


import React, {useState} from 'react';
import './Header.css'
import {addActivity} from '../api'

const NewActivity = (props) => {
    const [ activityId, setActivityId] = useState(4)
    const [activityName, setActivityName] = useState('')
    const [descriptionName, setDescriptionName] = useState('')


    const [ count, setCount] = useState(0)
    const [ duration, setDuration] = useState(0)

    // const { routineActivityList, setRoutineActivityList } = props
    const [routineActivityList, setRoutineActivityList] = useState([])
    console.log("routineActivityList", routineActivityList )

    const {activitiesList, routineIdtoAddActivity, token} = props
    // console.log("What are the props under New Activity Form", props)

//For editing a routine activity
      // const [ editRoutineActivityDuration, setEditRoutineActivityDuration ] = useState(1)
      // const [ editRoutineActivityCount, setEditRoutineActivityCount ] = useState(1)
      // const [ editRoutineActivityId, setEditRoutineActivityId ] = useState(1)

//      const {editRoutineActivityDuration, setEditRoutineActivityDuration,    
//      editRoutineActivityCount, setEditRoutineActivityCount,
//      editRoutineActivityId, setEditRoutineActivityId} = props


// console.log("What is the EDIT ROUTINE ACTIVITY ID, DURATION and COUNT", editRoutineActivityId,
// editRoutineActivityDuration, editRoutineActivityCount)
//for editing a routine activity ends


    const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("What is NEW Activity values for the FORM", "ActivityID:", activityId, "Count:", count, "Duration:", duration, "RoutineID:",routineIdtoAddActivity)
    const newActivityRoutine = await addActivity(routineIdtoAddActivity, token, activityId, count, duration)
    console.log("NEW ACTIVITY ROUTINE", newActivityRoutine)
    
    const copy = [...routineActivityList, newActivityRoutine]
    setRoutineActivityList(copy)


    setCount(0)
    setDuration(0)
    //TRY CATCH moved to API 
    }


  const handleSelectChange = (event) => {
    const id = event.target.value;
    const activity = activitiesList.find(activity => activity.id == id);
    console.log("What is the SELECTED activity", activity)
    setActivityId(activity.id);
    setActivityName(activity.name)
    setDescriptionName(activity.description)

  }


  // const Editing = () => {

  //   return (
  //       <form>
  //         <input type="number">Duration</input>
  //         <input type="number">Count</input>
  //         <button type="submit">Edit Routine Activity</button>
  //         </form>
  //   )
  // }


  const RoutineActivitiesList = () => {
    
    return (
      <div>
        <h5>This is the Routine Activities List</h5>

          <div className="routineActivityItem">{
          routineActivityList.map((routineActivity) => <div key={ routineActivity.id } style={{border: "1px dotted black"}}>
          <p>Activity Id: { routineActivity.id }</p>
          <p>Name:</p>
                    <p>Description:{descriptionName}</p>
                    <p>Duration: {routineActivity.duration}</p>
                    <p>Count: {routineActivity.count}</p>
                    <button style={{backgroundColor: "orange", padding: "5px"}}

//new for editing TEST edit ROUTINE ACTIVITY for API
                    // onClick={() => {
                    // setEditRoutineActivityDuration(routineActivity.duration)
                    // setEditRoutineActivityCount(routineActivity.count)
                    // setEditRoutineActivityId(routineActivity.id)}}
     //end new 11/9/2020             

                    >Edit</button>


                    <button style={{color: "red", padding: "5px"}}>Delete</button>
          </div>)
          }</div>

      </div>
    )

  }





//still working on the handleSubmit button above
    return (
        <div className='activityForm'>
            <h4 className="activityFormTitle">Add an Activity</h4>
            <form 
            onSubmit={handleSubmit}

            // onSubmit={(event) => {event.preventDefault()
            //     console.log("TESTING MODE What are the form values collected?", "Routine ID:", routineIdtoAddActivity,
            //     "Activity ID:", activityId,"Count:", count, "Duration:", duration)
            // }}
            
            >

            <select onChange={ handleSelectChange } className="option" >{
                activitiesList.map(activity => (
                  <option key={ activity.id } value={ activity.id }
                  
                  >
                    { activity.name}
                  </option>
                ))
              }</select>

            <label>Duration:</label>   
            <input className="numberInput"
                type="number" 
                min="0"
                // placeholder="Duration" 
                value={ duration }
                name="duration"
                onChange={(event) => {
                    setDuration(event.target.value)
                }}
            />


            <label>Count:</label>    
            <input className="numberInput"
                type="number" 
                min="0"
                // placeholder="Count" 
                value={ count }
                name="count"
                onChange={(event) => {
                    setCount(event.target.value)
                }}
            />
           
             <button type="submit" className='submitButton'>Add Activity</button>
            </form>
          
           
            <RoutineActivitiesList />
           
        </div>
        
    )
}

export default NewActivity;