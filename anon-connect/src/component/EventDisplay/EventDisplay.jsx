import React, { useState } from 'react';
import EventItem from './EventItem/EventItem'; // Import EventItem
import EventThread from './EventThread/EventThread'; // Import EventThread
import EventMap from './EventMap.jsx';

function EventDisplay() {
  const [currentItem, setCurrentItem] = useState(null); // State for the current selected event

  // Sample events data
  const eventsList = [
    {
      description: "Event for druggies to become clean.",
      location: "12345 street ave",
      name: "Cold turkey",
      attendees: 0,
      coordinates: { lat: 40.7128, lng: -74.0060 },
    },
    {
      description: "Event for alcoholics to become clean.",
      location: "67890 ave",
      name: "More drugs",
      attendees: 0,
      coordinates: { lat: 34.0522, lng: -118.2437 },
    },
  ];

  // Handle item click to show event details
  const handleItemClick = (eventThread) => {
    setCurrentItem(eventThread);
  };

  // Show event details if currentItem is selected
  if (currentItem) {
    return <EventItem event={currentItem} />;
  }

  return (
    <div className="p-6 bg-gradient-to-b from-primary to-secondary min-h-screen">
      <h3 className="text-5xl text-white font-bold mb-8">Events</h3>

      <div className="flex flex-col lg:flex-row justify-center gap-8">
        {/* Events List Section */}
        <div className="flex-1 p-4 bg-white shadow-lg rounded-lg">
          {eventsList.map((eventThread) => (
            <div
              key={eventThread.name}
              onClick={() => handleItemClick(eventThread)}
              className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl p-4 mb-4 rounded-md bg-gray-50 hover:bg-gray-100"
            >
              <EventThread
                description={eventThread.description}
                location={eventThread.location}
                name={eventThread.name}
              />
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden">
          <EventMap eventsList={eventsList} />
        </div>
      </div>
    </div>
  );
}

export default EventDisplay;