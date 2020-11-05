import React, {useState} from 'react';
import './Activities.css';

const BASE = 'http://localhost:4000/api'
// my heroku link: 'http://infinite-thicket-81951.herokuapp.com/api/activities'

const Activities = (props) => {
    const {activitiesList, setActivities} = props
    console.log("what are the props under Activities ", props)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    //temporary id for testing for render
    const [activityid, setActivityid] = useState('')
    const {token} = props


    //This is BREAKING!
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

            const newActivitiesList = [...activitiesList, data]
            console.log("What is the New Activites List", newActivitiesList)
            setActivities(newActivitiesList)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="newActivity">
        <h1 style={{textAlign: "center"}}>Activities</h1>

        <form className='newActivityForm'
            onSubmit={handleSubmit}
            // {(event) =>  {
            // event.preventDefault()
            // console.log("What's the name?", name)
            // console.log("What's the description?", description)
            // const activitiesListCopy = [...activitiesList, { id: Number(`${activityid}`), name: `${name}`, description: `${description}`}]
            // console.log("what is the copy", activitiesListCopy)
            // // setActivities(activitiesListCopy)
            // //set Activities up there is breaking everything
            // setName('')
            // setDescription('')
            // }}
        >
            <h2>Create a New Activity</h2>
            {/* //temporary id to see if it's going to render */}
            {/* <input type="number" placeholder="id"
                value={activityid}
                onChange={(event) => {
                    setActivityid(event.target.value)
                }}
            /> */}

            <input type="text" placeholder="name" 
                value={ name }
                onChange={(event) => {
                    setName(event.target.value)
                }}
            />

            <input type="text" placeholder="description" 
                value={ description }
                onChange={(event) => {
                    // console.log(description)
                    setDescription(event.target.value)
                }}
            />

            <button type="submit">Add Activity</button>
        </form>

        <div className="activitiesSection">
        
        {
            activitiesList.map((activity)  => 
                <div key={activity.id} 
                // <div key={idx} 
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


//OLD CODE
// import React, {useState} from 'react';
// import './Activities.css';

// const BASE = 'http://localhost:4000/api'
// // my heroku link: 'http://infinite-thicket-81951.herokuapp.com/api/activities'

// const Activities = (props) => {
//     const {activitiesList, setActivities} = props
//     console.log("what are the props under Activities ", props)
//     const [name, setName] = useState('')
//     const [description, setDescription] = useState('')
//     //temporary id for testing for render
//     const [activityid, setActivityid] = useState('')
//     const {token} = props


//     //This is BREAKING!
//     const handleSubmit = async (event) => {
//         console.log("What is the new name and description", name, description)
//         event.preventDefault()

//         try {
//             const response = await fetch('http://localhost:4000/api/activities', {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                     },
//                 body: JSON.stringify({
//                 name: `${name}`,
//                 description: `${description}`
//                 })
//             })
//             console.log("What is the response from the activities form", response)
//             const newActivity = await response.json()
//             console.log("What is the dataJSON from activities form", newActivity)
//             const activitiesListCopy = [...activitiesList, newActivity]
//             console.log("What is the activitiesList copy", activitiesListCopy)
//             // const updatedList = activitiesListCopy.push(newActivity)
//             // console.log(updatedList)
//             setActivities(activitiesListCopy)

//         } catch (error) {
//             console.error(error)
//         }
//     }

//     return (
//         <div className="newActivity">
//         <h1 style={{textAlign: "center"}}>Activities</h1>

//         <form className='newActivityForm'
//             onSubmit={handleSubmit}
//             // {(event) =>  {
//             // event.preventDefault()
//             // console.log("What's the name?", name)
//             // console.log("What's the description?", description)
//             // const activitiesListCopy = [...activitiesList, { id: Number(`${activityid}`), name: `${name}`, description: `${description}`}]
//             // console.log("what is the copy", activitiesListCopy)
//             // // setActivities(activitiesListCopy)
//             // //set Activities up there is breaking everything
//             // setName('')
//             // setDescription('')
//             // }}
//         >
//             <h2>Create a New Activity</h2>
//             {/* //temporary id to see if it's going to render */}
//             <input type="number" placeholder="id"
//                 value={activityid}
//                 onChange={(event) => {
//                     setActivityid(event.target.value)
//                 }}
//             />

//             <input type="text" placeholder="name" 
//                 value={ name }
//                 onChange={(event) => {
//                     setName(event.target.value)
//                 }}
//             />

//             <input type="text" placeholder="description" 
//                 value={ description }
//                 onChange={(event) => {
//                     // console.log(description)
//                     setDescription(event.target.value)
//                 }}
//             />

//             <button type="submit">Add Activity</button>
//         </form>

//         <div className="activitiesSection">
        
//         {
//             activitiesList.map((activity)  => 
//                 <div key={activity.id} 
//                 className='activityItem'>
//                 <h3>{activity.name}</h3>
//                 <p><b>Description:</b>{activity.description}</p>
//                 </div>
//             )
//         }   
//         </div>
//         </div>
//     )
// }

// export default Activities;