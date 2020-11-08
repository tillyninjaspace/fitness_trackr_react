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


//Nov 6, 2020 Works now
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
    // ^^^ I forgot to return response --  important reminder

    } catch(error) {
      throw error;
  }
}


//This works as of Nov. 6th
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


//Working on thsi at the moment ERROR 
//"syntax error at or near "["" On Nov. 7th
export async function addActivity(routineId, token, activityId, count, duration) {
  try { 
    const response = await fetch(`http://localhost:4000/api/routines/${routineId}/activities`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
    body: JSON.stringify({
      // activityId: `${activityId}`,
      // count: `${count}`,
      // duration: `${duration}`
          activityId,
          count,
          duration
      })
    })
    console.log("What is the response from the ACTIIVITY form", response)
    const data = await response.json()
    console.log("What is the dataJSON from ACTIVITY FORM", data)
  } catch (error) {
  console.error(error)
  }
}





// FORMAT TO follow from Routines that returned a correct object format
// try {
//   const response = await fetch('http://localhost:4000/api/routines', {
//       method: "POST",
//       headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//           },
//       body: JSON.stringify({
//       name: `${name}`,
//       goal: `${goal}`,
//       isPublic: `${isPublic}`
//       })
//   })
//   console.log("What is the response from the routines form", response)
//   const data = await response.json()
//   console.log("What is the dataJSON from routines form", data)
 
//   const newRoutinesList = [...routinesList, data]
//   console.log("What is the New Routines List", newRoutinesList)
 
//   setRoutines(newRoutinesList)


// } catch (error) {
//   console.error(error)
// }




//Old Jquery Example from my Stranger's things for reference
// const signUp = async (username, password) => {
//   try {
//     const response = await fetch(`${API_URL}/users/register`, {
//     method: "POST",
//     headers: 
//     makeHeaders(),
//     body: JSON.stringify({
//       user: {
//         username: username,
//         password: password
//       }
//     })
//     })
//     const responseObj = await response.json();
//     state.token = responseObj.data && responseObj.data.token;
//     setToken(responseObj.data.token)
//     $('.accountError').empty()
//     $('.accountError').append($(`<p class="message">Your Account was created.<p>`))
//   } catch (error) {
//     console.error(error)
//     $('.accountError').empty()
//     $('.accountError').prepend($(`<p class="message">Username not available.<p>`))
//   }
// };   
    

// const logIn = async (username, password) => {
//   try {
//     const response = await fetch(`${API_URL}/users/login`, {
//     method: "POST",         
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${state.token}`
//     },
//     body: JSON.stringify({
//       user: {
//         username: username,
//         password: password
//       }
//     })
//     });
// const responseObj = await response.json();
//     setToken(responseObj.data.token)
//     state.token = responseObj.data && responseObj.data.token;
//     state.responseObj = responseObj;
//     const fetchUser = fetchUserData()
//     $('.signOut').css('display', 'inline-block')
//     $('.loggingIn').css('display', 'none')
//     $('.openYourPosts').css('display', 'inline-block')
//     $('#new-account-form, #account-form').addClass('closed')
//     populatePosts()
//     renderLogInMessage()
//   } catch (error) {
//     console.error(error)
//     state.token = ''
//     $('.asideHeader').empty()
//     $('.asideHeader').prepend('Username & Password was invalid. You are not logged in.')
//     $('.messageList').empty()
//     $(`.welcome-message`).empty()
//   }
// };  
  

// $('#new-account-form').on('submit', async function (event){
//   event.preventDefault()
//   const user = {
//     username: $('#new-username').val(),
//     password: $('#new-password').val(),
//   }
//   try {
//     const result = await signUp(user.username, user.password)
//     fetchUserData()
//     $('.asideHeader').empty()
//     $('.asideHeader').prepend(`Please log in to start using our services.`)  
//     $('#new-account-form').trigger('reset')
//     return result
//   } catch (error) {
//     console.log(error)
//   } 
// });


// $('#account-form').on('submit', async function (event){
//   event.preventDefault()
//   const user = {
//     username: $('#username').val(),
//     password: $('#password').val(),
//   }
//   try {
//     const result = await logIn(user.username, user.password)
//     fetchUserData()
//     populatePosts()
    
//     $('#account-form').trigger('reset')
//     return result
//   } catch (error) {
//     console.log(error)
//   } 
// });
