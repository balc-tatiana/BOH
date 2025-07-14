import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
    fetch('http://localhost:3001/api/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401) {
          console.log('Not logged in');
          navigate('/login'); // redirect to login if not authenticated
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


  if (!profile) {
    return null;
  }

  return (
    <div align="left"> 
      <h2>User Profile</h2>
      <div className="card p-4">
        <p><strong>ID:</strong> {profile.id}</p>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.user_phonenumber || 'N/A'}</p>
        <p><strong>User Type:</strong> {profile.user_type || 'N/A'}</p>
        <p><strong>Created At:</strong> {new Date(profile.created_at).toLocaleString()}</p>
      </div>
      <button
        style={{
          backgroundColor: '#d4a017', // Galben muștar
          color: 'white',
          border: 'none',
          borderRadius: '20px', // Margini rotunjite
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          marginTop: '20px',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b58914')} // Culoare mai închisă la hover
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#d4a017')} // Revine la culoarea inițială
      >My favourites</button>
    </div>
  );
};

export default Profile;
