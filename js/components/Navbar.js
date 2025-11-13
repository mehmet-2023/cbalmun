const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState('home');

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const currentPath = window.location.pathname;
    if (currentPath.includes('team.html')) {
      setActiveLink('team');
    } else {
      const hash = window.location.hash.substring(1);
      if (hash && navLinks.some(link => link.id === hash)) {
        setActiveLink(hash);
      } else {
        setActiveLink('home');
      }
    }

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navLinks = [
    { id: 'home', label: 'Home', href: 'index.html#home' },
    { id: 'team', label: 'Team', href: 'index.html#team' },
    { id: 'conference', label: 'Conference', href: 'index.html#conference' },
    { id: 'committees', label: 'Committees', href: 'index.html#committees' },
    { id: 'faq', label: 'FAQ', href: 'index.html#faq' },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="/" className="logo">ÇBALMUN</a>

          {}
          <nav className="desktop-nav">
            <ul>
              {navLinks.map((link) => {
                const isActive = activeLink === link.id ||
                               (link.id === 'home' && window.location.pathname.includes('index.html') && !window.location.hash) ||
                               (link.id === 'team' && window.location.pathname.includes('team.html'));

                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={isActive ? 'active' : ''}
                      onClick={() => setActiveLink(link.id)}
                    >
                      {link.label}
                      {isActive && <span className="active-indicator"></span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {}
          <button
            className={`hamburger ${isOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {}
      <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={activeLink === link.id ? 'active' : ''}
                  onClick={() => {
                    setActiveLink(link.id);
                    closeMenu();
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {}
      <div
        className={`nav-overlay ${isOpen ? 'open' : ''}`}
        onClick={closeMenu}
      ></div>
    </>
  );
};