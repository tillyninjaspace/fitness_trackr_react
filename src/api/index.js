const BASE = 'http://localhost:4000/api'
const BASE2 = `http://infinite-thicket-81951.herokuapp.com/api`
// `http://infinite-thicket-81951.herokuapp.com/api/routines`
// const BASE = 'http://fitnesstrac-kr.herokuapp.com/api/'

export async function getRoutines() {
    try {
      const data  = await fetch(`${ BASE }/routines`);
      // console.log("What are routines under API section", data)
      const jsonData = await data.json()
    
      return jsonData
    } catch (error) {
      throw error;
    }
}

export async function getActivities() {
    try {
      const data  = await fetch(`${ BASE }/activities`);
      // console.log("What are activities under API section", data)
      const jsonData = await data.json()
    
      return jsonData
    } catch (error) {
      throw error;
    }
}

export async function getUser(token) {
  try { 
    const data = await fetch(`${ BASE }/users/me`, {
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer' + " " + token
  },
})
  console.log(data)
  const response = await data.json()
  console.log("What is response under API getUser", response)
    if (!token) {
      return
    } else {
      return response
    }

    } catch(error) {
      throw error;
  }
}

export async function deleteRoutine(routineId, token) {
    try {
        const data = await fetch(`http://localhost:4000/api/routines/${routineId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
        })
        console.log("What is the data from the delete button", data)
        const response = await data.json()
        console.log("what is the response from the delete button", response)
        return response
    } catch (error) {
        console.error(error)
    }
}


export async function addActivity(routineId, token, activityId, count, duration) {
  try { 
    const response = await fetch(`http://localhost:4000/api/routines/${routineId}/activities`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
    body: JSON.stringify({
          activityId,
          count,
          duration
      })
    })
    console.log("What is the response from the ACTIIVITY form", response)
    const data = await response.json()
    console.log("What is the dataJSON from ACTIVITY FORM", data)
    return data
  } catch (error) {
  console.error(error)
  }
}

export async function editRoutineActivity(routineActivityId, token, count, duration) {
  try { 
    const response = await fetch(`http://localhost:4000/api/routine_activities/${routineActivityId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
    body: JSON.stringify({
          count,
          duration
      })
    })
    console.log("What is the response from the EDIT ROUTINE ACTIIVITY form", response)
    const data = await response.json()
    console.log("What is the dataJSON from EDIT ROUTINE ACTIVITY FORM", data)
    return data
  } catch (error) {
  console.error(error)
  }
}

export async function deleteRoutineActivity(routineActivityId, token) {
  try {
      const data = await fetch(`http://localhost:4000/api/routine_activities/${routineActivityId}`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
              }
      })
      console.log("What is the data from the delete button", data)
      const response = await data.json()
      console.log("what is the response from the delete button", response)
      return response
  } catch (error) {
      console.error(error)
  }
}

export async function getUserRoutines(username) {
  try {
    const data  = await fetch(`${ BASE }/users/${username}/routines`);
    // console.log("What are routines under API section", data)
    const jsonData = await data.json()
    console.log("What is the user GET Routines for USER", jsonData)
    return jsonData
  } catch (error) {
    throw error;
  }
}