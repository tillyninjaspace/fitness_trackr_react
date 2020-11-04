import React from 'react';
import './MyRoutines.css'

const MyRoutines = () => {

    return (
        <div className="myRoutinesSection">
        <h1>My Routines</h1>

        <form className='myRoutineForm'>
            <h2>Create a New Routine</h2>
            <input type="text" placeholder="name"/>
            <input type="text" placeholder="goal"/>
            <select>
            <option value="true">Yes</option>
            <option value="false">No</option>
            </select>
            <button>Add Routine</button>
        </form>
        </div>
    )
}

export default MyRoutines;