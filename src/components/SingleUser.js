//STRETCH GOAL --- COME BACK IF HAVE TIME
// import React from 'react';
// import {useParams} from 'react-router-dom';
// import Routines from './Routines'

// //created this whole file on Nov 3
// // /users/:username/routines    
// //maybe put username in parameter
// export default ({routinesList}) => {
//     const {username} = useParams();
//     const [filteredUser] = routinesList.filter(routine => username === routine.creatorName);
//     console.log('filteredUser: ', filteredUser);
    
    
//     return <>
//       <h1>Single User</h1>
//       {filteredUser && <Routines userRoutines={filteredUser} />}
//     </>
//   }