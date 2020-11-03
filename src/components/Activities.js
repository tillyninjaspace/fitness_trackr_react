import React from 'react';
import './Activities.css';

const Activities = ({activitiesList}) => {
    return (
        <div className="newActivity">
        <h1 style={{textAlign: "center"}}>Activities</h1>

        <form className='newActivityForm'>
            <h2>Create a New Activity</h2>
            <input type="text" placeholder="name"/>
            <input type="text" placeholder="description"/>
            <button>Submit</button>
        </form>

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
}

export default Activities;