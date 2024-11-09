import React, {useState, useEffect, useContext} from 'react'; 
import "./Profile.css"; 
import {UserContext} from '../../App.js'; 
import EventCreation from '../EventCreation/EventCreation.jsx';

function Profile() {
  // const [userInfo, setUserInfo] = useState(null); 
  const {isLoggedIn} = useContext(UserContext);
  const [eventsClicked, setEventsClicked] = useState(false); 
  const handleEventsClicked = () => {
    setEventsClicked(true); 
  }

  const user = {organization: "Alcoholics Anonymous", description: "We host continuous meeting for recovering alcoholics!", rating: 5, events: [{name: "Consultation", completed: true, location: "4531 Druggie Ave"}, {name: "Group Therapy", completed: true, location: "4531 Druggie Ave",}, {name: "Movie Night", completed: false, location: "4531 Druggie Ave"}, {name: "Pizza and Chat", completed: false, location: "4531 Druggie Ave"}], contactInfo: "123-456-7890"}; 
  // const users = [
  //   {organization: "Alcoholics Anonymous", description: "We host continuous meeting for recovering alcoholics!", rating: 5, events: ["hi", "hi2"], contactInfo: "123-456-7890"},
  //   {organization: "Narcotics Anonymous", description: "We host continuous meeting for recovering drug addicts!", rating: 5, events: ["hi", "hi2"], contactInfo: "123-456-7894"}
  // ];

  useEffect(() => {

  })

  const completedEvents = user.events.filter(hosting => hosting.completed);
  const currentEvents = user.events.filter(hosting => !hosting.completed);

  return (
    (!eventsClicked ? <div className="profileContainer">
      <h1>{user.organization}</h1>
      <p>{user.description}</p>
      <div className="leftSide">
        <h2 className='text-5xl p-4'>Current Events</h2>
        <ul className="eventsContainer">
          {completedEvents.map((hosting) => (
            <li>
              <EventThread description={hosting.description} location={hosting.location}/>
            </li>
          ))}
        </ul>
        <h2 className='text-5xl p-4'>Past Events</h2>
        <ul className="eventsContainer">
          {currentEvents.map((hosting) => (
            <li>
              <EventThread description={hosting.description} location={hosting.location}/>
            </li>
          ))}
        </ul>
        {isLoggedIn && <button className='rounded-lg mr-4 bg-blue-700 text-white p-2 hover:opacity-70' onClick={handleEventsClicked}>Add Event</button>}
      </div>
      <div className="rightSide">
        <h2 className='text-5xl p-4'>Rating</h2>
        <p>{user.rating}</p>
        <h2 className='text-5xl p-4'>Contact Us!</h2>
        <p>{user.contactInfo}</p>
      </div>
    </div> : <EventCreation />)
  )
}

export default Profile
