import React, {useState} from 'react';
import './Activities.css';

const BASE = 'http://localhost:4000/api'
// my heroku link: 'http://infinite-thicket-81951.herokuapp.com/api/activities'

const Activities = (props) => {
    const {activitiesList, setActivities} = props
    console.log("what are the props under Activities ", props)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    //temporary id for testing for render
    // const [activityid, setActivityid] = useState('')
    const {token} = props

    const handleSubmit = async (event) => {
        console.log("What is the new name and description", name, description)
        event.preventDefault()

        try {
            const response = await fetch('http://localhost:4000/api/activities', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                body: JSON.stringify({
                name: `${name}`,
                description: `${description}`
                })
            })
            console.log("What is the response from the activities form", response)
            const data = await response.json()
            console.log("What is the dataJSON from activities form", data)
                if (data.error) {
                    setErrorMessage('Sorry, your ACTIVITY was not added due to duplicate activity')
                    return
                } else {
                    setErrorMessage('')
                }

            const newActivitiesList = [...activitiesList, data]
            console.log("What is the New Activities List", newActivitiesList)
            setActivities(newActivitiesList)
            setName('')
            setDescription('')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="newActivity">
        <h1 style={{textAlign: "center"}}>Activities</h1>

    { token ? 
        <form className='newActivityForm'
            onSubmit={handleSubmit}>

            <h2>Create a New Activity</h2>
            { errorMessage ? 
            <p style={{color: "red", backgroundColor: "white"}}>{errorMessage} </p> : ''
            }
        
            <input type="text" placeholder="name" 
                value={ name }
                onChange={(event) => {
                    setName(event.target.value)
                }}
            />

            <input type="text" placeholder="description" 
                value={ description }
                onChange={(event) => {
                    setDescription(event.target.value)
                }}
            />
   
            <button type=   "submit">Add Activity</button>
        </form>
        : ''
    }

        <div className="activitiesSection">
        
        {
            activitiesList.map((activity)  => 
                <div key={activity.id} 
                className='activityItem'>
                <h3>{activity.name}</h3>
                <p><b>Description:</b>{activity.description}</p>
                </div>
            )
        }   
        </div>
        </div>
    )
}

export default Activities;