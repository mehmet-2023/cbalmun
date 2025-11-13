const VogueCBALMUN = () => {
  return (
    <section id="home">
    <div className="cover">
      <div className="content-wrapper">
        <header className="header">
          <div>
            <h1 className="text main-title">ÇBALMUN</h1>
            <p className="text subtitle">2025</p>
          </div>
        </header>

        <div className="main-content">
          <div className="left-content">
            <div className="left-block text">
              <p className="line">Çağrıbey A.L Model United Nations</p>
              <p className="line">24-25-26 April 2025</p>
              <p className="line">Istanbul, Türkiye</p>
              <p className="highlight">The future of leadership is shaped here</p>
              <div className="button-container">
                <a href="#apply" className="apply-button">Apply Now</a>
              </div>
            </div>
          </div>

          <div className="right-block text">
            <div className="number">3</div>
            <p className="number-text">day summit</p>
            <p className="number-text">Istanbul</p>
            <p className="number-text">24-26 april</p>
          </div>
        </div>
      </div>
    </div></section>
  );
};

const TeamSection = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const teamMembers = [
    {
      name: 'Jane Doe',
      position: 'Head of IT',
      image: 'images/team1.png'
    },
    {
      name: 'John Smith',
      position: 'Creative Director',
      image: 'images/team2.png'
    },
    {
      name: 'Alex Johnson',
      position: 'Event Coordinator',
      image: 'images/team3.png'
    }
  ];

  const [previousSlide, setPreviousSlide] = React.useState(teamMembers.length - 1);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPreviousSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [currentSlide, teamMembers.length]);

  return (
    <section id="team">
    <div className="team-section">
      <h2 className="team-title">OUR TEAM</h2>
      <div className="team-carousel">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`team-slide ${
              index === currentSlide ? 'active' :
              index === previousSlide ? 'previous' : ''
            }`}
          >
            <img
              src={member.image}
              alt={member.name}
              className="team-image"
            />
            <div className="team-info">
              <h3 className="team-name">{member.name}</h3>
              <p className="team-position">{member.position}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="team-button-container">
        <a href="team.html" className="team-view-all-button">View All Team Members</a>
      </div>
    </div></section>
  );
};

// Include ConferenceDetails component directly
const ConferenceDetails = () => {
  const schedule = [
    {
      day: "Day 1 - April 24, 2025",
      events: [
        { time: "09:00 - 10:00", title: "Registration & Welcome Coffee" },
        { time: "10:00 - 12:30", title: "Opening Ceremony" },
        { time: "12:30 - 13:30", title: "Lunch Break" },
        { time: "13:30 - 15:30", title: "Committee Session I" },
        { time: "15:30 - 16:00", title: "Coffee Break" },
        { time: "16:00 - 18:00", title: "Committee Session II" }
      ]
    },
    {
      day: "Day 2 - April 25, 2025",
      events: [
        { time: "09:30 - 11:30", title: "Committee Session III" },
        { time: "11:30 - 12:00", title: "Coffee Break" },
        { time: "12:00 - 13:30", title: "Committee Session IV" },
        { time: "13:30 - 14:30", title: "Lunch Break" },
        { time: "14:30 - 16:30", title: "Committee Session V" },
        { time: "16:30 - 17:00", title: "Coffee Break" },
        { time: "17:00 - 19:00", title: "Committee Session VI" }
      ]
    },
    {
      day: "Day 3 - April 26, 2025",
      events: [
        { time: "10:00 - 12:00", title: "Committee Session VII" },
        { time: "12:00 - 13:00", title: "Lunch Break" },
        { time: "13:00 - 15:00", title: "Committee Session VIII" },
        { time: "15:00 - 15:30", title: "Coffee Break" },
        { time: "15:30 - 17:30", title: "Closing Ceremony" },
        { time: "17:30 - 19:00", title: "Farewell Cocktail" }
      ]
    }
  ];

  return (
    <section className="conference-details" id="conference">
      <div className="container">
        <h2 className="section-title">Conference Details</h2>
        
        <div className="venue-section">
          <h3>Our Venue</h3>
          <div className="venue-content">
            <div className="venue-info">
              <h4>Çağrıbey Anadolu Lisesi</h4>
              <p className="venue-address">
                Üsküdar, Istanbul, Türkiye
              </p>
              <a 
                href="https://www.google.com/maps?q=Çağrıbey+Anadolu+Lisesi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link"
              >
                <i className="fas fa-map-marker-alt"></i> View on Map
              </a>
            </div>
            <div className="venue-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3109518.3683926156!2d28.347258092905527!3d40.43899120060657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac86864a7d1f5%3A0x5570e5e6d8609638!2zw5xza8O8ZGFyIMOHYcSfcsSxYmV5IEFuYWRvbHUgTGlzZXNp!5e0!3m2!1str!2str!4v1763066968755!5m2!1str!2str"
                width="100%" 
                height="300" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                title="Çağrıbey Anadolu Lisesi Konumu"
              ></iframe>
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

const App = () => (
  <>
    <VogueCBALMUN />
    <TeamSection />
    <ConferenceDetails />
  </>
);