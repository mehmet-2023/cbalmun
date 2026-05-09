const VogueCBALMUN = () => {
  return (
    <section id="home">
    <div className="cover">
      <div className="content-wrapper">
        <header className="header">
          <div>
            <h1 className="text main-title">ÇBALMUN</h1>
            <p className="text subtitle">2026</p>
          </div>
        </header>

        <div className="main-content">
          <div className="left-content">
            <div className="left-block text">
              <p className="line">Çağrıbey Anatolian Highschool Model United Nations</p>
              <p className="line">22-23-24 May 2026</p>
              <p className="line">Istanbul, Türkiye</p>
              <p className="highlight">Fashioning the Future of Diplomacy</p>
              <div className="button-container">
                <a href="#apply" className="apply-button">Apply Now</a>
              </div>
            </div>
          </div>

          <div className="right-block text">
            <div className="number">3</div>
            <p className="number-text">day summit</p>
            <p className="number-text">Istanbul</p>
            <p className="number-text">22-23-24 May</p>
          </div>
        </div>
      </div>
    </div></section>
  );
};

const TeamSection = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const fallbackTeamMembers = [
    {
      name: 'Travis Scott',
      position: 'Secretary General',
      image: 'images/team1.png'
    },
    {
      name: 'Kanye West',
      position: 'Director General',
      image: 'images/team2.png'
    },
    {
      name: 'Enes Batur',
      position: 'Event Coordinator',
      image: 'images/team3.png'
    },
    {
      name: 'Cem Yılmaz',
      position: 'Head Of Finance',
      image: 'images/team4.png'
    },
    {
      name: 'Bill Gates',
      position: 'Head Of IT',
      image: 'images/team5.png'
    },
    {
      name: 'The Rock',
      position: 'Head Of Logistics',
      image: 'images/team6.png'
    }
  ];

  const [teamMembers, setTeamMembers] = React.useState(fallbackTeamMembers);
  const [loading, setLoading] = React.useState(true);

  const [previousSlide, setPreviousSlide] = React.useState(fallbackTeamMembers.length - 1);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch('/api/public/team', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (mounted && Array.isArray(json.team) && json.team.length) {
          setTeamMembers(json.team);
          setPreviousSlide(json.team.length - 1);
          setCurrentSlide(0);
        }
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

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
      {loading ? null : null}
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
  const fallbackSchedule = [
    {
      day: "Day 1 - May 22, 2026",
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
      day: "Day 2 - May 23, 2026",
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
      day: "Day 3 - May 24, 2026",
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

  const [schedule, setSchedule] = React.useState(fallbackSchedule);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch('/api/public/schedule', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (mounted && Array.isArray(json.schedule) && json.schedule.length) {
          setSchedule(json.schedule);
        }
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="conference-details" id="conference">
      <div className="container">
        <h2 className="section-title">Conference Details</h2>
        {loading ? null : null}
        
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

const CommitteesPreview = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  
  const fallbackCommittees = [
    {
      id: 1,
      name: 'United Nations Security Council',
      type: 'UN Body',
      description: 'The most powerful organ of the United Nations',
      image: 'images/committees/unscc.jpg'
    },
    {
      id: 2,
      name: 'United Nations General Assembly',
      type: 'UN Body',
      description: 'The main deliberative body of the UN',
      image: 'images/committees/unga.jpg'
    },
    {
      id: 3,
      name: 'North Atlantic Treaty Organization',
      type: 'Regional Organization',
      description: 'Collective defense and security alliance',
      image: 'images/committees/nato.jpg'
    },
    {
      id: 4,
      name: 'European Union Council',
      type: 'Regional Organization',
      description: 'Executive branch of the European Union',
      image: 'images/committees/euc.jpg'
    },
    {
      id: 5,
      name: 'World Health Organization',
      type: 'Specialized Agency',
      description: 'Global health coordination and response',
      image: 'images/committees/who.jpg'
    },
    {
      id: 6,
      name: 'International Criminal Court',
      type: 'Judicial Body',
      description: 'Justice for the world\'s gravest crimes',
      image: 'images/committees/icc.jpg'
    }
  ];

  const [committees, setCommittees] = React.useState(fallbackCommittees);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch('/api/public/committees', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (mounted && Array.isArray(json.committees) && json.committees.length) {
          setCommittees(json.committees.map((c) => ({
            id: c.id,
            name: c.name,
            type: c.type,
            description: (c.description || '').slice(0, 60),
            image: c.image,
          })));
          setActiveIndex(0);
        }
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setTimeout(() => {
          setActiveIndex((prev) => (prev + 1) % committees.length);
          setIsAnimating(false);
        }, 500);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [committees.length, isAnimating]);

  const handleCommitteeClick = (index) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <section id="committees" className="committees-preview">
      <div className="container">
        <h2 className="section-title">OUR COMMITTEES</h2>
        <p className="section-subtitle">Explore our diverse range of committees</p>
        {loading ? null : null}
        
        <div className="vogue-showcase">
          <div className="showcase-main">
            {committees.map((committee, index) => (
              <div
                key={committee.id}
                className={`showcase-item ${index === activeIndex ? 'active' : ''} ${index === (activeIndex - 1 + committees.length) % committees.length ? 'prev' : ''} ${index === (activeIndex + 1) % committees.length ? 'next' : ''}`}
                onClick={() => handleCommitteeClick(index)}
              >
                <div className="showcase-image-container">
                  <img
                    src={committee.image}
                    alt={committee.name}
                    className="showcase-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCA4MDAgNDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxZTNhOGEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmb250LXdlaWdodD0iYm9sZCI+Q29tbWl0dGVlPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                  <div className="showcase-overlay">
                    <div className="overlay-content">
                      <span className="overlay-type">{committee.type}</span>
                      <h3 className="overlay-name">{committee.name}</h3>
                      <p className="overlay-description">{committee.description}</p>
                      {committee.studyGuideLink && (
                        <a href={committee.studyGuideLink} target="_blank" rel="noopener noreferrer" className="overlay-study-link">
                          <i className="fas fa-file-download"></i> Study Guide
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="showcase-navigation">
            {committees.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleCommitteeClick(index)}
                aria-label={`Go to committee ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="committees-button-container">
          <a href="committees.html" className="view-all-committees-button">
            View All Committees
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

const ApplySection = () => {
  const [applications, setApplications] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch('/api/public/applications', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (mounted && Array.isArray(json.applications) && json.applications.length) {
          setApplications(json.applications);
        }
      } catch (e) {
        // ignore and keep empty
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="apply" className="apply-section">
      <div className="container">
        <h2 className="section-title">Apply to CBALMUN 2026</h2>
        <p className="section-subtitle">Choose your application type and submit your form</p>
        {loading ? null : (
          <div className="applications-grid">
            {applications.map((app, idx) => (
              <div key={idx} className="application-card">
                <h3 className="application-title">{app.title}</h3>
                <p className="application-description">{app.description}</p>
                <a href={app.link} target="_blank" rel="noopener noreferrer" className="apply-button">
                  Apply Now
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const LetterFromSecretaryGeneral = () => {
  return (
    <section id="letter" className="letter-section">
      <div className="container">
        <h2 className="section-title">Letter from Secretary General</h2>
        <div className="letter-content">
          <div className="letter-text">
            <p className="letter-greeting">Dear Distinguished Participants, Esteemed Guests,</p>
            <p className="letter-paragraph">
              It is my pleasure to welcome you all to the third version of CBALMUN'26 Model United Nations Conference. Which will be held on 16-18 June 2026. I'm truly honoured to assure you that our doors are wide open for every delegate who is eager to debate, collaborate, and create meaningful solutions for global issues. I acknowledge that Model United Nations is not only about debating but also about having meaningful friendships and gaining new perspectives on global challenges.
            </p>
            <p className="letter-paragraph">
              The journey of CBALMUN'26 was a challenging one. Our academic and organization teams have worked tirelessly to ensure that this conference provides unforgettable experience. I sincerely hope that the debates you participate in, the friendships you build, and the memories you create here will inspire you long after the conference concludes.
            </p>
            <p className="letter-paragraph">
              In this regard, your participation will be the most valuable part of this conference. I'm very pleased to invite everyone those who wish to develop themselves both academically and socially.
            </p>
            <p className="letter-paragraph">
              On behalf of the entire secretariat team, I welcome you once again to CBALMUN'26. I wish you all fruitful debates, successful resolutions, and an enjoyable conference experience.
            </p>
            <p className="letter-signature">
              Best Regards<br />
              <span className="signature-name">Ayşe Erva Engin</span><br />
              <span className="signature-title">Secretary-General of CBALMUN'26 Conference</span>
            </p>
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
    <CommitteesPreview />
    <ConferenceDetails />
    <LetterFromSecretaryGeneral />
    <ApplySection />
  </>
);