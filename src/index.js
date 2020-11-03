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
    Footer
  } from './components';



const App = () => {
    const [routinesList, setRoutines] = useState([])
    const [activitiesList, setActivities] = useState([])
    const [loading, setLoading] = useState(false)

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


    console.log("list:", routinesList)
   

    return (
       
            <div id="bigHoncho">
                <Header />
                <NavLink to="/" activeClassName="current">Home</NavLink >
                <NavLink to="/my-routines" activeClassName="current">My Routines</NavLink>
                <NavLink to="/routines" activeClassName="current">Routines</NavLink>



                <Switch>
{/* <Route exact path="my-routines"><MyRoutines />  </Route>     */}
                <Route path="/my-routines"><MyRoutines /> </Route>      
                <Route exact path="/routines">
                <Routines routinesList={routinesList}/> </Route> 
                                
                <Activities activitiesList={activitiesList} />
                
                {loading ? <Loading /> : null}
{/* working on this                 */}

                <Route exact path="/">
                <h2 style={{ padding: ".5em"}}>Please log in, above.</h2>
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