const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com', icon: 'fab fa-instagram' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin-in' },
    { name: 'Email', url: 'mailto:info@cbalmun.org', icon: 'far fa-envelope' }
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h3 className="footer-logo">ÇBALMUN</h3>
          <p className="footer-tagline">
            Çağrıbey A.L Model United Nations {currentYear}
          </p>
        </div>
        
        <div className="footer-social">
          <span className="social-title">Connect With Us</span>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="social-link"
                title={social.name}
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} ÇBALMUN. All rights reserved.</p>
      </div>
    </footer>
  );
};