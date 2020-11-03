import React from 'react';
import './MyRoutines.css'

const MyRoutines = () => {

 

    return (
        <>
        <h1>My Routines</h1>

        <form className='myForm'>
            <h2>Create a New Routine</h2>
            <input type="text" placeholder="name"/>
            <input type="text" placeholder="goal"/>
            <select>
            <option value="true">Yes</option>
            <option value="false">No</option>
            </select>
        </form>


        <form className='myForm'>
            <h2>Create a New Activity</h2>
            <input type="text" placeholder="name"/>
            <input type="text" placeholder="description"/>
        </form>
        </>
    )
}

export default MyRoutines;