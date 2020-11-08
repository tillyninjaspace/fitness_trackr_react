//I might not need this section if I add it to the header
//On Nov 4, I added all of this to the header so I can remove this later. Saving this just in case.
//Changing this to add Add Activty Form
//NOV 7, must keep!


import React, {useState} from 'react';
import './Header.css'
import {addActivity} from '../api'

const NewActivity = (props) => {
    const [ activityId, setActivityId] = useState(4)
    const [ count, setCount] = useState(0)
    const [ duration, setDuration] = useState(0)

    const {activitiesList, routineIdtoAddActivity, token} = props
    console.log("What are the props under New Activity Form", props)

    const handleSubmit = (event) => {
    event.preventDefault()
    console.log("What is NEW Activity values", activityId, count, duration, routineIdtoAddActivity)
    addActivity(routineIdtoAddActivity, token, activityId, count, duration)
    setCount(0)
    setDuration(0)
    //TRY CATCH moved to API 
    }


  const handleSelectChange = (event) => {
    const id = event.target.value;
    const activity = activitiesList.find(activity => activity.id == id);
    console.log("What is the SELECTED activity", activity)
    setActivityId(activity);
  }


//still working on the handleSubmit button above
    return (
        <div className='activityForm'>
            <h4 className="activityFormTitle">Add an Activity</h4>
            <form onSubmit={handleSubmit}

            // onSubmit={(event) => {event.preventDefault()
            //     console.log("what is the SELECTED ACT count/duration", activityId, count, duration)
            // }}
            
            >

            <select onChange={ handleSelectChange }>{
                activitiesList.map(activity => (
                  <option key={ activity.id } value={ activity.id }
                  className="option"
                  >
                    { activity.name}
                  </option>
                ))
              }</select>


            <label>Count:</label>    
            <input className="numberInput"
                type="number" 
                // placeholder="Count" 
                value={ count }
                name="count"
                onChange={(event) => {
                    setCount(event.target.value)
                }}
            />
            <label>Duration:</label>   
            <input className="numberInput"
                type="number" 
                // placeholder="Duration" 
                value={ duration }
                name="duration"
                onChange={(event) => {
                    setDuration(event.target.value)
                }}
            />
             <button type="submit" className='submitButton'>Add the Activity</button>
            </form>


        </div>
    )
}

export default NewActivity;