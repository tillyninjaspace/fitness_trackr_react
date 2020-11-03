import React from 'react'
import './Routines.css'

const Routines = ({routinesList}) => {
    return (
        <>
        <h1 style={{textAlign: "center"}}>Routines</h1>
        <div className="routinesSection">
        
        {
            routinesList.map((routine)  => 
                <div key={routine.id} className='routineItem'>
                <h3>{routine.name}</h3>
                <p><b>Goal:</b>{routine.goal}</p>
                <p><b>Username:</b>{routine.creatorName}</p>
                <p className="actList"><b>Activities:</b>
                {routine.activities.map((activity) => 
                    <div>
                    <p><b>Activity Name:{activity.name}</b></p>
                    <p><b>Activity Description:</b>{activity.description}</p>
                    </div>
                    )
                }
                </p>
                
                </div>
            )
        }   
        </div>
        </>
    )
}

export default Routines;