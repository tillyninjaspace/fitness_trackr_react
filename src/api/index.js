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


//Nov 4, 2020 -- Working on this
export async function getUser(token) {
  try { 
    const data = await fetch(`${ BASE }/users/me`, {
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
})
  console.log(data)
  const response = await data.json()
  console.log("What is response under API getUser", response)
    // if (!token) {
    //   return
    // }
    // if (response.username) {
    //   setCurrentUser(response.username)
    // }

    } catch(error) {
      throw error;
  }
}

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
