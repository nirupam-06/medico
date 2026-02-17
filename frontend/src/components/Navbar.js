import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../CSS/Navbar.css';

const Navbar = () => {
  const { isLoggedIn, role, uid, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/user-role-selection');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Check if UID is verified (exists and not empty)
  const isUidVerified = uid && uid.trim() !== '';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Branding - Left Side */}
        <div className="branding">
          <Link 
            to="/user-role-selection" 
            className="logo"
            onClick={closeMobileMenu}
          >
            Medico
          </Link>
          <div className="moto">Advanced Healthcare Management</div>
        </div>

        {/* Navigation Links Container - Right Side */}
        <div className={`nav-links-container ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-links">
            {/* Always visible */}
            <li>
              <Link
                to="/user-role-selection"
                className={`nav-link ${isActiveLink('/user-role-selection') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>

            {/* Admin Routes */}
            {isLoggedIn && role === 'admin' && (
              <>
                {/* Always show Add Patient for admin */}
                <li>
                  <Link
                    to="/patients"
                    className={`nav-link ${isActiveLink('/patients') ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    Add Patient
                  </Link>
                </li>

                {/* Show these links only after UID verification */}
                {isUidVerified && (
                  <>
                    <li>
                      <Link
                        to={`/dashboard/${uid}`}
                        className={`nav-link ${isActiveLink(`/dashboard/${uid}`) ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/prescriptions"
                        className={`nav-link ${isActiveLink('/prescriptions') ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                      >
                        Prescriptions
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/reports"
                        className={`nav-link ${isActiveLink('/reports') ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                      >
                        Reports
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}

            {/* User Routes - Always show all links for users */}
            {isLoggedIn && role === 'user' && isUidVerified && (
              <>
                <li>
                  <Link
                    to={`/user-dashboard/${uid}`}
                    className={`nav-link ${isActiveLink(`/user-dashboard/${uid}`) ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/user-prescriptions/${uid}`}
                    className={`nav-link ${isActiveLink(`/user-prescriptions/${uid}`) ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    Prescriptions
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/user-reports/${uid}`}
                    className={`nav-link ${isActiveLink(`/user-reports/${uid}`) ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    Reports
                  </Link>
                </li>
              </>
            )}

            {/* Logout Button */}
            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;