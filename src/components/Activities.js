import React from 'react';
import './Activities.css';

const Activities = ({activitiesList}) => {
    return (
        <>
        <h1 style={{textAlign: "center"}}>Activities</h1>
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
        </>
    )
}

export default Activities;