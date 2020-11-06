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
    const [token, setToken] =useState('')
// Nov 5 working on currentUsername morning    
    const [currentUsername, setCurrentUsername] = useState('sandra')

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

    // useEffect(() => {
    //     console.log("looking for activities changes")
     


    // }, [activitiesList])


  console.log("What is the token inside of Main Index.JS?", token)
  console.log("What is the ActivitiesList after update", activitiesList)

    return (
       
            <div id="bigHoncho">
                <Header token={token} setToken={setToken} currentUsername={currentUsername} setCurrentUsername={setCurrentUsername}/>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/routines" activeClassName="current">Routines</NavLink>
                <NavLink to="/my-routines" activeClassName="current">My Routines</NavLink>
                <NavLink to="/activities" activeClassName="current">Activities</NavLink>


                <Switch>

                <Route path="/my-routines"><MyRoutines currentUsername={currentUsername}
                    token={token} routinesList={routinesList} setRoutines={setRoutines} /> 
                </Route>      
                <Route exact path="/routines">
                <Routines routinesList={routinesList}/> </Route> 

                <Route exact path="/activities">          
                <Activities activitiesList={activitiesList} setActivities={setActivities} token={token}/>
                </Route> 
                {loading ? <Loading /> : null}
{/* to get routines by username  Nov 5           */}
<Route path="/users/:username/routines">
< SingleUser routinesList={routinesList} currentUsername={currentUsername}/> 
</Route>
                <Route exact path="/">
                <h2 style={{ padding: ".5em"}}>{token ? `Welcome ${currentUsername}!` : `Please log in, above.`}</h2>
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