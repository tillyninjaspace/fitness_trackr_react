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
              {

                routine.creatorName ?
                <p><b>
        {/* new param STRETCH GOAL -- come back if have time*/}
       {/* {routine.creatorName && <Link to={`/users/${routine.creatorName}/routines`}>{routine.creatorName}</Link>} */}
       {/* new param ends */}
                    Creator:</b>{routine.creatorName}
                    
                </p>
                :
                <p>Creator: Me</p>
             } 

                </section>
            { routine.activities ? 
                <section className="actList">
                <p>Activities:</p>
                    {routine.activities.map((activity) => 
                    <div key={activity.id} className="eachActivity">
                    <p>Name: {activity.name}</p>
                    <p>Description: {activity.description}</p>
                    <p>Duration: {activity.duration}</p>
                    <p>Count: {activity.count}</p>
                    </div>
                    )
                    }
                </section>
                : ''
            }     
                </div>
            )
        }   
        </div>
        </main>
        </>
    )
}

export default Routines;