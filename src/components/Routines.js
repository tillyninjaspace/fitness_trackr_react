import React from 'react'
//STRETCH GOALfor LINK
// import {Link} from 'react-router-dom';
import './Routines.css'

const Routines = ({routinesList}) => {
    return (
        <>
        <main>
        <h1 style={{textAlign: "center"}}>Routines</h1>
        <div className="routinesSection">
        
        {
            routinesList.map((routine)  => 
                <div key={routine.id} className='routineItem'>

                <section>
                <h3>{routine.name}</h3>
                <p><b>Goal:</b>{routine.goal}</p>
                <p><b>
        {/* new param STRETCH GOAL -- come back if have time*/}
       {/* {routine.creatorName && <Link to={`/users/${routine.creatorName}/routines`}>{routine.creatorName}</Link>} */}
       {/* new param ends */}
                    Username:</b>{routine.creatorName}
                    
                </p>
                </section>

                <section className="actList">
                <p>Activities:</p>
                    {routine.activities.map((activity) => 
                    <div key={activity.id}>
                    <p><b>Activity Name:</b>{activity.name}</p>
                    <p><b>Activity Description:</b>{activity.description}</p>
                    </div>
                    )
                    }
                </section>
                
                </div>
            )
        }   
        </div>
        </main>
        </>
    )
}

export default Routines;