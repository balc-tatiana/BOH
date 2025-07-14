/*import React, { useState } from 'react';
import './UserProfileCard.css';  // Import the CSS specific to this component
import profile from '../../assets/images/default_profile.png'

const UserProfileCard = () => {
  const [activeTab, setActiveTab] = useState('tab1'); // Manage active tab state

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set the active tab when clicked
  };

  return (
    <div className="profile-wrapper">
          {/* Profile Header 
      <header className="header-profile">
        <div className="highlight-wrapper-profile">
          {/* You can add more content here if needed 
        </div>
        <div className="profile-avatar">
          <img src={profile} loading="lazy" alt="Participant Profile" />
        </div>
        <div className="highlight-wrapper-profile">
          {/* Add more content here if needed 
        </div>
      </header>

      {/* Profile Name 
      <div className="profile-name">
        <h2>
           HGFDSA{profile.name}
          <i className="bx bxs-badge-check"></i>
        </h2>
        <p className="location">Location </p>
      </div>

      {/* Tabs 
      <main>
        <div className="tabs-wrapper">
          <ul className="tabs">
            <li>
              <a
                href="#about"
                id="tab1"
                className={activeTab === 'tab1' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleTabClick('tab1'); }}
              >
                <p className='text-aboutinfo'>About me</p>
              </a>
            </li>
            <li>
              <a
                href="#contact"
                id="tab2"
                className={activeTab === 'tab2' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleTabClick('tab2'); }}
              >
                <p className='text-aboutinfo'>Contact information</p>
              </a>
            </li>
            <li id="active-bg" style={{ transform: activeTab === 'tab1' ? 'translateX(0)' : 'translateX(12.25rem)' }}></li>
          </ul>
        </div>

        {/* Tab Content 
        <div
          id="tab1-content"
          className={`tab-content ${activeTab === 'tab1' ? 'tab-content-active' : ''}`}
        >
          <p>Here will be the description</p>
        </div>
        <div
          id="tab2-content"
          className={`tab-content ${activeTab === 'tab2' ? 'tab-content-active' : ''}`}
        >
          <h4 >Phone number: {profile.user_phonenumber}</h4>
          <h4>Email: {profile.email}</h4>
        </div>
      </main>
    </div>
  );
};

export default UserProfileCard;*/
// UserProfileCard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfileCard.css'; 
import defaultProfile from '../../assets/images/descarcare.jpg';

const UserProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('tab1');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401) {
          console.log('Not logged in');
          navigate('/login');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setProfile(data);
        }
      })
      .catch(err => console.error('Error fetching profile:', err));
  }, [navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (!profile) {
    return null; // or a spinner/loading indicator
  }

  return (
    <div className="profile-wrapper">
      {/* Profile Header */}
      <header className="header-profile">
        <div className="highlight-wrapper-profile" />
        <div className="profile-avatar">
          <img src={defaultProfile} loading="lazy" alt="Participant Profile" />
        </div>
        <div className="highlight-wrapper-profile" />
      </header>

      {/* Profile Name */}
      <div className="profile-name">
        <h2>
          {profile.name}
          <i className="bx bxs-badge-check"></i>
        </h2>
        <p className="location">{profile.location || 'Location not available'}</p>
      </div>

      {/* Tabs */}
      <main>
        <div className="tabs-wrapper">
          <ul className="tabs">
            <li>
              <a
                href="#about"
                id="tab1"
                className={activeTab === 'tab1' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleTabClick('tab1'); }}
              >
                <p className="text-aboutinfo">About me</p>
              </a>
            </li>
            <li>
              <a
                href="#contact"
                id="tab2"
                className={activeTab === 'tab2' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleTabClick('tab2'); }}
              >
                <p className="text-aboutinfo">Contact information</p>
              </a>
            </li>
            <li 
              id="active-bg" 
              style={{ transform: activeTab === 'tab1' ? 'translateX(0)' : 'translateX(12.25rem)' }} 
            />
          </ul>
        </div>

        {/* Tab Content */}
        <div
          id="tab1-content"
          className={`tab-content ${activeTab === 'tab1' ? 'tab-content-active' : ''}`}
        >
          <p>{profile.about || 'Here will be the description'}</p>
        </div>
        <div
          id="tab2-content"
          className={`tab-content ${activeTab === 'tab2' ? 'tab-content-active' : ''}`}
        >
          <h4>Phone number: {profile.user_phonenumber || 'N/A'}</h4>
          <h4>Email: {profile.email}</h4>
        </div>
      </main>
    </div>
  );
};

export default UserProfileCard;
