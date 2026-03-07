const fallbackCommittees = [
  {
    id: 1,
    name: 'United Nations Security Council',
    type: 'UN Body',
    description: 'The most powerful organ of the United Nations, responsible for maintaining international peace and security. Delegates will address critical global crises through intensive debate and resolution writing.',
    academicAssistant: 'Dr. Sarah Mitchell',
    underSecretaryGeneral: 'Ambassador James Chen',
    image: 'images/committees/unscc.jpg'
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
              
              {committee.studyGuideLink ? (
                <a href={committee.studyGuideLink} target="_blank" rel="noopener noreferrer" className="study-guide-button">
                  <i className="fas fa-file-download"></i>
                  Study Guide
                </a>
              ) : (
                <button className="study-guide-button" disabled>
                  <i className="fas fa-file-download"></i>
                  Study Guide
                </button>
              )}
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
