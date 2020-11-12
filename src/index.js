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
    SingleUser,
    Footer
  } from './components';

const App = () => {
    const [routinesList, setRoutines] = useState([])
    const [activitiesList, setActivities] = useState([])
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(getCurrentToken())
    const [currentUsername, setCurrentUsername] = useState(getCurrentUser());
    const [ usernameRoutineList, setUsernameRoutineList] = useState([])
    const [ hadAChange, setHadAChange] = useState(false)


    useEffect(() => {
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
            .finally(() => { setLoading(false) })

    }, []);

    
    useEffect(() => {
       getRoutines()
           .then(routines => {
               console.log("What are routines", routines)
               setRoutines(routines)
           })
           .catch(error => {
               console.error(error)
           });
    }, [hadAChange]);

//   console.log("What is the token inside of Main Index.JS?", token)
//   console.log("What is the current USERNAME in Main Index", currentUsername)
//   console.log("What is the ActivitiesList after update", activitiesList)
//   console.log("What is the routine LIST by LOGGED in USER after NEW ROUTINE", usernameRoutineList)

    return (
            <div id="mainDiv">
                <Header token={token} setToken={setToken} currentUsername={currentUsername} setCurrentUsername={setCurrentUsername} />
                <NavLink to="/" className="nav" style={{textDecoration: "none", padding: "7px", borderRadius: "5px"}}>Home</NavLink>
                <NavLink to="/routines" style={{textDecoration: "none", padding: "7px", borderRadius: "5px"}} activeClassName="current">Routines</NavLink>
                { token ? <NavLink to="/my-routines" style={{textDecoration: "none", padding: "7px", borderRadius: "5px"}}
                    activeClassName="current">My Routines</NavLink>
                : '' }
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
                : ''    
                }
                <Route exact path="/routines"> <Routines routinesList={routinesList} /> </Route> 
                <Route exact path="/activities">          
                <Activities activitiesList={activitiesList} setActivities={setActivities} token={token}/>
                </Route> 
                {loading ? <Loading /> : null}
                <Route path="/users/:username/routines">
                < SingleUser routinesList={routinesList} /> 
                </Route>
                <Route exact path="/">
                <>    
                    <h2 style={{ padding: ".5em"}}>{token ? `Welcome ${currentUsername}!` : `Please log in.`}</h2>
                    <img src="/fitness-tracker.png" className="banner" alt="fitness tracker banner"/>
                    <h2>Fitness Tracker</h2>
                    <p>Track your work out routines for free here on Fitness Tracker. Register for an account and start 
                    logging your routines and activities immediately. Stay healthy for longevity.</p>
                </>
                </Route>
                <Redirect to="/" />
                </Switch>   
                <Footer />
            </div>
          
            )
};


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