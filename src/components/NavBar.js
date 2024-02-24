import React, { useState, useEffect } from 'react';

export function NavBar({items}) {
  const [activeSection, setActiveSection] = useState(items[0].ref);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page - must be the last section
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight;
      if (isAtBottom) {
        setActiveSection(items[items.length - 1].ref);
        return;
      }
      // Figure out which section is currently in view
      const currentSection = items.find(item => {
        const el = document.getElementById(item.ref);
        if (el) {
          const scrollPosition = window.scrollY + window.innerHeight / 2;
          return scrollPosition >= el.offsetTop && scrollPosition <= el.offsetTop + el.offsetHeight;
        }
        return false;
      });
      // Set the active section property
      if (currentSection) {
        setActiveSection(currentSection.ref);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <div id="navbar" className="navbar navbar-expand-sm navbar-light fixed-bottom">
      <div className="collapse navbar-collapse container" id="collapsibleNavbar">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          {
            items.map(item => (
              <li key={`nav_`+item.ref} className="nav-item">
                <a className={`nav-link ${activeSection === item.ref && 'active '}`} href={`#`+item.ref}>{item.label}</a>
              </li>))
          }
        </ul>
      </div>
    </div>
  );
}