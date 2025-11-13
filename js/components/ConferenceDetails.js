// ConferenceDetails.js - No import needed for React 17+ with JSX transform

const ConferenceDetails = () => {
  const schedule = [
    {
      day: "Day 1 - 24 Nisan 2025",
      events: [
        { time: "09:00 - 10:00", title: "Kayıt ve Açılış Kokteyli" },
        { time: "10:00 - 12:30", title: "Açılış Töreni" },
        { time: "12:30 - 13:30", title: "Öğle Yemeği" },
        { time: "13:30 - 15:30", title: "1. Oturum" },
        { time: "15:30 - 16:00", title: "Ara" },
        { time: "16:00 - 18:00", title: "2. Oturum" }
      ]
    },
    {
      day: "Day 2 - 25 Nisan 2025",
      events: [
        { time: "09:30 - 11:30", title: "3. Oturum" },
        { time: "11:30 - 12:00", title: "Ara" },
        { time: "12:00 - 13:30", title: "4. Oturum" },
        { time: "13:30 - 14:30", title: "Öğle Yemeği" },
        { time: "14:30 - 16:30", title: "5. Oturum" },
        { time: "16:30 - 17:00", title: "Ara" },
        { time: "17:00 - 19:00", title: "6. Oturum" }
      ]
    },
    {
      day: "Day 3 - 26 Nisan 2025",
      events: [
        { time: "10:00 - 12:00", title: "7. Oturum" },
        { time: "12:00 - 13:00", title: "Öğle Yemeği" },
        { time: "13:00 - 15:00", title: "8. Oturum" },
        { time: "15:00 - 15:30", title: "Ara" },
        { time: "15:30 - 17:30", title: "Kapanış Töreni" },
        { time: "17:30 - 19:00", title: "Kokteyl ve Kapanış" }
      ]
    }
  ];

  return (
    <section className="conference-details">
      <div className="container">
        <h2 className="section-title">Conference Details</h2>
        
        <div className="venue-section">
          <h3>Our Venue</h3>
          <div className="venue-content">
            <div className="venue-info">
              <h4>Çağrıbey Anadolu Lisesi</h4>
              <p className="venue-address">
                Yıldız Mahallesi, 17001 Çekirge/Çanakkale Merkez/Çanakkale
              </p>
              <a 
                href="https://www.google.com/maps?q=Çağrıbey+Anadolu+Lisesi+Çanakkale" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link"
              >
                <i className="fas fa-map-marker-alt"></i> View on Map
              </a>
            </div>
            <div className="venue-image">
              {/* Add your venue image here */}
              <div className="placeholder-image">
                <i className="fas fa-school"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="schedule-section">
          <h3>Event Schedule</h3>
          <div className="schedule-tabs">
            {schedule.map((day, index) => (
              <div key={index} className="schedule-day">
                <h4>{day.day}</h4>
                <div className="events-list">
                  {day.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="event-item">
                      <span className="event-time">{event.time}</span>
                      <span className="event-title">{event.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceDetails;
