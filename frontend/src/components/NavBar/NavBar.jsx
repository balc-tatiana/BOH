import React, { useState } from 'react';
import './NavBar.css'
import logo from '../../assets/images/logo.jpeg'
import profile from '../../assets/images/default_profile.png'
import search from '../../assets/images/search-icon.png'
import list from '../../assets/images/list-icon.png'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleActivitiesClick = () => {
    navigate('/activities');
  };
  const handleMapClick = () => {
    navigate('/map');
  };
  const handleBlogClick = () => {
    navigate('/blog');
  };
  const handleHelpClick = () => {
    navigate('/help');
  };
  return (
    <div className='navbar'>
      <img src={logo} alt="" className='logo' />
      <ul>
        <li className="nav-item" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
          Home
        </li>
        <li className="discover-dropdown">
          <div className="discover-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <img src={list} alt="list" className="list-icon" />
            Discover

            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              <a  onClick={handleMapClick} style={{ cursor: 'pointer' }}>Map</a>
               <a onClick={handleActivitiesClick} style={{ cursor: 'pointer' }}>Activities</a>
              <a  onClick={handleBlogClick} style={{ cursor: 'pointer' }}>Blog</a>
              <a  onClick={handleHelpClick} style={{ cursor: 'pointer' }}>Help</a>
            </div>
          </div>
        </li>
      </ul>
      <div className='search-box'>
        <input type="text" placeholder='Search' className='search-box-input' />
        <img src={search} style={{width:'30px', height:'30px'}} alt="" />
      </div>
      <img
        src={profile}
        alt=""
        className="Profile"
        onClick={handleProfileClick}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )
}

export default NavBar
