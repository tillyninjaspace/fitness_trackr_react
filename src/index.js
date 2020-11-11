import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink,
    Redirect
  } from 'react-router-dom';

import { getRoutines,
         getActivities } from './api';

import { getCurrentUser,
         getCurrentToken } from './auth';

import {
    Header,
    Routines,
    Activities,
    Loading,
    MyRoutines,
    // SingleUser,
    Footer
  } from './components';

import SingleUser from './components/SingleUser';



const App = () => {
    const [routinesList, setRoutines] = useState([])
    const [activitiesList, setActivities] = useState([])
    const [loading, setLoading] = useState(false)
//Nov 8 changed default state to getCurrentToken() below for localStorage instead of ('')  ..this is also causing a problem
    const [token, setToken] = useState(getCurrentToken())
// Nov 8 changed useState from ('') to getCurrentUser() below for localStorage but it is causing posts to now show if
//user closes browser and then comes back 
    const [currentUsername, setCurrentUsername] = useState(getCurrentUser());
    const [ usernameRoutineList, setUsernameRoutineList] = useState([])
    const [ hadAChange, setHadAChange] = useState(false)


    useEffect(() => {
         //need to review
        setLoading(true)
        getRoutines()
            .then(routines => {
                console.log("What are routines", routines)
                setRoutines(routines)
            })
            .catch(error => {
                console.error(error)
            });
           
            

        getActivities()
            .then(activities => {
                console.log("What are activities", activities)
                setActivities(activities)
            })
            .catch(error => {
                console.error(error)
            })
            //need to review loading
            .finally(() => { setLoading(false) })

    }, []);

    
//Nov 7, Testing This --- PERSISTED for NEW Routine only, old ones don't show! Update, adeed currentUsername to show old and new now
    const initialList = routinesList.filter(routine => currentUsername === routine.creatorName) 
    // console.log("INITIAL LIST", initialList)
    

//LOCAL STORAGE ADD is no bueno
    // useEffect(() => {
    //     const existingToken = setToken(getCurrentToken())
    //     const existingUser = setCurrentUsername(getCurrentUser())
    //     if (existingToken && existingUser) {
    //     setUsernameRoutineList(initialList)
    //     }
    // },[])
    

    useEffect(() => {
    setUsernameRoutineList(initialList)
    },[currentUsername])


    useEffect(() => {
        //need to review
       getRoutines()
           .then(routines => {
               console.log("What are routines", routines)
               setRoutines(routines)
           })
           .catch(error => {
               console.error(error)
           });
        }, [hadAChange]);



  console.log("What is the token inside of Main Index.JS?", token)
  console.log("What is the current USERNAME in Main Index", currentUsername)
  console.log("What is the ActivitiesList after update", activitiesList)
  console.log("What is the routine LIST by LOGGED in USER after NEW ROUTINE", usernameRoutineList)

    return (
       
            <div id="mainDiv">
                <Header token={token} setToken={setToken} currentUsername={currentUsername} setCurrentUsername={setCurrentUsername} />
                <NavLink to="/" className="nav" style={{textDecoration: "none", padding: "7px", borderRadius: "5px"}}>Home</NavLink>
                <NavLink to="/routines" style={{textDecoration: "none", padding: "7px", borderRadius: "5px"}} activeClassName="current">Routines</NavLink>
 {/* Nov 8, show MyRoutines only if token                */}
                { token ? <NavLink to="/my-routines" style={{textDecoration: "none", padding: "7px", borderRadius: "5px"}}
                    activeClassName="current"
                    
                    // onClick={() => {
                    //     setUsernameRoutineList(initialList)
                    // }}
                    
                    
                    >My Routines</NavLink>
                : '' }
{/* End MyRoutines conditional                 */}
                <NavLink to="/activities" style={{textDecoration: "none", padding: "7px", borderRadius: "5px"}}
                    activeClassName="current">Activities</NavLink>


                <Switch>

        { token ? 
                <Route path="/my-routines"><MyRoutines currentUsername={currentUsername}
                    token={token} routinesList={routinesList} setRoutines={setRoutines}
                    usernameRoutineList={usernameRoutineList} setUsernameRoutineList={setUsernameRoutineList} 
                    activitiesList={activitiesList}
                    hadAChange={hadAChange} setHadAChange={setHadAChange}
                    /> 
                </Route>  
            :
            ''    
        }

                <Route exact path="/routines">
                <Routines routinesList={routinesList} /> </Route> 

                <Route exact path="/activities">          
                <Activities activitiesList={activitiesList} setActivities={setActivities} token={token}/>
                </Route> 
                {loading ? <Loading /> : null}
{/* to get routines by username  Nov 5           */}
<Route path="/users/:username/routines">
< SingleUser routinesList={routinesList} currentUsername={currentUsername}/> 
</Route>
                <Route exact path="/">
                <>    
                <h2 style={{ padding: ".5em"}}>{token ? `Welcome ${currentUsername}!` : `Please log in.`}</h2>
                <img src="/fitness-tracker.png" className="banner" alt="fitness tracker banner"/>
                <h2>Fitness Tracker</h2>
                <p>Track your work out routines for free here on Fitness Tracker. Register for an account and start 
                    logging your routine and activities immediately. Stay healthy for longevity.</p>
                 </>
                </Route>

                <Redirect to="/" />
                </Switch>  
  
                 <Footer />
            </div>
          
    )
}


ReactDOM.render(
    <Router>   
    <App/>
    </Router> ,
    document.getElementById('root')

)







//STRETCH GOALS FOR LATER:
{/* //new params     -- NEEDS WORK           */}
    {/* <Route path="/users/:username/routines">
      {routinesList && <SingleUser routinesList={routinesList}/>}
    </Route> */}
{/* new params ends nov 3 */}