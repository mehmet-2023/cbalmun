const teamMembers = [
  {
    id: 1,
    name: 'Jane Doe',
    position: 'Head of IT',
    image: 'images/team1.png'
  },
  {
    id: 2,
    name: 'John Smith',
    position: 'Marketing Director',
    image: 'images/team2.png'
  },
  {
    id: 3,
    name: 'Alex Johnson',
    position: 'Event Coordinator',
    image: 'images/team3.png'
  },

  {
    id: 4,
    name: 'Sarah Williams',
    position: 'Secretary General',
    image: 'images/team1.png'
  },
  {
    id: 5,
    name: 'Michael Brown',
    position: 'Under-Secretary General',
    image: 'images/team2.png'
  },
  {
    id: 6,
    name: 'Emily Davis',
    position: 'Head of Logistics',
    image: 'images/team3.png'
  }
];

function TeamPage() {
  return (
    <div className="team-page">
      <h1 className="team-page-title">Our Team</h1>
      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-member">
            <img
              src={member.image}
              alt={member.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCA4MDAgNDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTFhMWEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3Q9IiMwMDAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmb250LXdlaWdodD0iYm9sZCI+Q2Fubm90IGxvYWQgaW1hZ2U8L3RleHQ+PC9zdmc+';
              }}
            />
            <div className="member-info">
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.position}</p>
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
    <TeamPage />
  </React.StrictMode>
);