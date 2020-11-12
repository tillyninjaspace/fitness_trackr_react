import React, {useState} from 'react';
import './Activities.css';

const Activities = (props) => {
    const {activitiesList, setActivities, token} = props
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('https://infinite-thicket-81951.herokuapp.com/api/activities', {
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
            const data = await response.json()
            if (data.error) {
                setErrorMessage('Sorry, your ACTIVITY was not added due to duplicate activity')
                    return
            } else {
                setErrorMessage('')
            }
            const newActivitiesList = [...activitiesList, data]
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
            <form className='newActivityForm' onSubmit={handleSubmit}>
                <h2>Create a New Activity</h2>
                { errorMessage ? 
                    <p style={{color: "red", backgroundColor: "white"}}>{errorMessage} </p> : ''
                }
                <input type="text" placeholder="name" 
                    value={ name }
                    onChange={(event) => {
                    setName(event.target.value)
                }}/>
                <input type="text" placeholder="description" 
                    value={ description }
                    onChange={(event) => {
                    setDescription(event.target.value)
                }}/>
                <button type="submit">Add Activity</button>
            </form>
        : ''
        }
            <div className="activitiesSection">
            {
                activitiesList.map((activity)  => 
                <div key={activity.id} className='activityItem'>
                <h3>{activity.name}</h3>
                <p><b>Description:</b>{activity.description}</p>
                </div>
                )
            }   
            </div>
        </div>
    )
};

export default Activities;