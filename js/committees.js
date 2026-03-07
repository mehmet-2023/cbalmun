const fallbackCommittees = [
  {
    id: 1,
    name: 'United Nations Security Council',
    type: 'UN Body',
    description: 'The most powerful organ of the United Nations, responsible for maintaining international peace and security. Delegates will address critical global crises through intensive debate and resolution writing.',
    academicAssistant: 'Dr. Sarah Mitchell',
    underSecretaryGeneral: 'Ambassador James Chen',
    image: 'images/committees/unscc.jpg'
  },
  {
    id: 2,
    name: 'United Nations General Assembly',
    type: 'UN Body',
    description: 'The main deliberative body of the UN where all member states have equal representation. Perfect for beginners to experience diplomatic debate and consensus-building.',
    academicAssistant: 'Prof. Maria Rodriguez',
    underSecretaryGeneral: 'Diplomat Ahmed Hassan',
    image: 'images/committees/unga.jpg'
  },
  {
    id: 3,
    name: 'North Atlantic Treaty Organization',
    type: 'Regional Organization',
    description: 'NATO brings together North American and European countries to discuss security challenges. Delegates will work on collective defense and crisis management strategies.',
    academicAssistant: 'Col. Robert Thompson',
    underSecretaryGeneral: 'Ambassador Sophie Laurent',
    image: 'images/committees/nato.jpg'
  },
  {
    id: 4,
    name: 'European Union Council',
    type: 'Regional Organization',
    description: 'The EU Council represents the executive branch of the European Union. Delegates will tackle complex policy issues affecting European integration and governance.',
    academicAssistant: 'Dr. Elena Volkov',
    underSecretaryGeneral: 'Commissioner Hans Mueller',
    image: 'images/committees/euc.jpg'
  },
  {
    id: 5,
    name: 'World Health Organization',
    type: 'Specialized Agency',
    description: 'WHO coordinates international health within the UN system. This committee addresses global health challenges and pandemic response strategies.',
    academicAssistant: 'Dr. Lisa Park',
    underSecretaryGeneral: 'Dr. Michael Foster',
    image: 'images/committees/who.jpg'
  },
  {
    id: 6,
    name: 'International Criminal Court',
    type: 'Judicial Body',
    description: 'The ICC investigates and tries individuals charged with the gravest crimes of concern to the international community. Advanced delegates experience judicial proceedings.',
    academicAssistant: 'Judge Patricia Williams',
    underSecretaryGeneral: 'Prosecutor Jean Dubois',
    image: 'images/committees/icc.jpg'
  },
  {
    id: 7,
    name: 'Historical Security Council 1991',
    type: 'Historical Committee',
    description: 'Travel back to 1991 to address the end of the Cold War era. This historical committee challenges delegates to solve crises with the knowledge and constraints of the time.',
    academicAssistant: 'Prof. David Anderson',
    underSecretaryGeneral: 'Historian Catherine Zhang',
    image: 'images/committees/hsc1991.jpg'
  },
  {
    id: 8,
    name: 'Crisis Committee: Chernobyl Disaster',
    type: 'Crisis Committee',
    description: 'An intense crisis simulation where delegates respond to the 1986 Chernobyl nuclear disaster. Fast-paced decision making and unexpected developments characterize this committee.',
    academicAssistant: 'Dr. Ivan Petrov',
    underSecretaryGeneral: 'Crisis Director Emma Wilson',
    image: 'images/committees/chernobyl.jpg'
  },
  {
    id: 9,
    name: 'United Nations Human Rights Council',
    type: 'UN Body',
    description: 'UNHRC promotes and protects human rights worldwide. Delegates debate sensitive human rights issues and work towards universal standards.',
    academicAssistant: 'Dr. Rachel Green',
    underSecretaryGeneral: 'Ambassador Carlos Mendez',
    image: 'images/committees/unhrc.jpg'
  }
];

function CommitteesPage() {
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
          setCommittees(json.committees);
        }
      } catch (e) {
        // ignore and keep fallback
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="committees-page">
      <h1 className="committees-page-title">Committees</h1>
      <p className="committees-page-subtitle">Choose your diplomatic journey</p>
      {loading ? null : null}
      
      <div className="committees-grid">
        {committees.map((committee) => (
          <div key={committee.id} className="committee-card">
            <div className="committee-image-container">
              <img
                src={committee.image}
                alt={committee.name}
                className="committee-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCA4MDAgMjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxZTNhOGEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmb250LXdlaWdodD0iYm9sZCI+Q29tbWl0dGVlIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
            </div>
            
            <div className="committee-header">
              <h3 className="committee-name">{committee.name}</h3>
              <p className="committee-type">{committee.type}</p>
            </div>
            
            <div className="committee-content">
              <p className="committee-description">{committee.description}</p>
              
              <div className="committee-staff">
                <div className="staff-info">
                  <h4>Academic Assistant</h4>
                  <p className="staff-name">{committee.academicAssistant}</p>
                </div>
                <div className="staff-info">
                  <h4>Under Secretary General</h4>
                  <p className="staff-name">{committee.underSecretaryGeneral}</p>
                </div>
              </div>
              
              <button className="study-guide-button">
                <i className="fas fa-file-download"></i>
                Study Guide
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <a href="index.html" className="back-button">
        Back to Home
      </a>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CommitteesPage />
  </React.StrictMode>
);
