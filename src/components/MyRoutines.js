import React from 'react';
import './MyRoutines.css'

const MyRoutines = () => {

 

    return (
        <div class="myRoutinesSection">
        <h1>My Routines</h1>

        <form className='myRoutineForm'>
            <h2>Create a New Routine</h2>
            <input type="text" placeholder="name"/>
            <input type="text" placeholder="goal"/>
            <select>
            <option value="true">Yes</option>
            <option value="false">No</option>
            </select>
        </form>

{/* moving form below under Activities */}
        {/* <form className='myForm'>
            <h2>Create a New Activity</h2>
            <input type="text" placeholder="name"/>
            <input type="text" placeholder="description"/>
        </form> */}
        </div>
    )
}

export default MyRoutines;