import React, {useState} from 'react';
import './Header.css'
import {addActivity} from '../api'

const NewActivity = (props) => {
  const [ activityId, setActivityId] = useState(1)
  const [ activityName, setActivityName] = useState('')
  const [ descriptionName, setDescriptionName] = useState('')
  const [ routineActivityErrorMessage, setRoutineActivityErrorMessage] = useState('')
  const [ count, setCount] = useState(0)
  const [ duration, setDuration] = useState(0)

  const {activitiesList, routineIdtoAddActivity, token, setHadAChange} = props

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newActivityRoutine = await addActivity(routineIdtoAddActivity, token, activityId, count, duration)
    if (newActivityRoutine.error) {
      setRoutineActivityErrorMessage('This is a duplicate ROUTINE ACTIVITY. Please delete one of the same ACTIVITIES.')
    } else {
      setRoutineActivityErrorMessage('') 
    }
    setHadAChange(true)
    setCount(0)
    setDuration(0)
    setActivityId(0)
  };

  const handleSelectChange = (event) => {
    const id = event.target.value;
    const activity = activitiesList.find(activity => activity.id == id);
    setActivityId(activity.id);
    setActivityName(activity.name)
    setDescriptionName(activity.description)
  };

  return (
    <div className='activityForm'>
      <h4 className="activityFormTitle">Add an Activity</h4>
        <form onSubmit={ handleSubmit }>
          <p>(Select from drop down)</p>
          <select onChange={ handleSelectChange } className="option">       
            {
              activitiesList.map(activity => (
                <option key={ activity.id } value={ activity.id }>
                { activity.name}</option>
              ))
            }
          </select>
          <label>Duration:</label>   
          <input className="numberInput" type="number" min="0" value={ duration } name="duration"
              onChange={(event) => { setDuration(event.target.value) }}/>
          <label>Count:</label>    
          <input className="numberInput" type="number" min="0" value={ count } name="count"
              onChange={(event) => { setCount(event.target.value) }}/>
          <button type="submit" className='submitButton'>Add Activity</button>
            {
              routineActivityErrorMessage ? 
              <p style={{color: "red", backgroundColor: "white"}}>{routineActivityErrorMessage} </p> : ''
            }    
        </form>
    </div>
  )
};

export default NewActivity;