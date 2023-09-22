// import React from 'react';
// import styles from './Room.module.css';
// import { useWebRTC } from '../../hooks/useWebRTC';
// import { useParams } from 'react-router-dom';
// const Room = () => {
//   const { id: roomId } = useParams();
//   const storeData = localStorage.getItem('user');
//   let user;
//   if (storeData) {
//     user = JSON.parse(storeData);
//   }
// console.log(user)
//  // const { clients, provideRef } = useWebRTC(roomId, user);

//   return (
//     <div>
//       <div>Room</div>
//       <div className={styles.main}>
//         {clients.map((client) => (
//           <div key={client.id}>
//             <audio ref={(instance) => provideRef(instance, user._id)} controls autoPlay src=""></audio>
//             <h4>{user.Name}</h4>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Room;
import React from 'react';
import styles from './Room.module.css';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useParams } from 'react-router-dom';

const Room = () => {

  const { id: roomId } = useParams();
  const storeData = localStorage.getItem('user');

  let user;
  if (storeData) {
    user = JSON.parse(storeData);
  }
  
  const { clients, provideRef } = useWebRTC(roomId, user);

  return (
    <div>
  
      <div>Room</div>
      <div className={styles.main}>
        {
       
        clients.map((client) => (
          <div key={client.id}>
            <audio ref={(instance) => provideRef(instance, user._id)} controls autoPlay src=""></audio>
            <h4>{user.Name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
