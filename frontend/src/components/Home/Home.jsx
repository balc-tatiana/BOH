// Home.jsx
import React from 'react';
import './Home.css';
import Harta from '../Harta/Harta'; // Asigură-te că calea e corectă
import Intro from '../Intro/Intro'; // Asigură-te că calea e corectă
import Cards from '../Cards/Cards';
import LoginRegister from '../LoginRegister/LoginRegister';
import plus from '../../assets/images/plus2.png'; // Asigură-te că calea e corectă

const Home = () => {
  return (
    <div style={{ width: '100%', height: '370vh' }}>
      <Intro /> {/* Introducerea cu video */}
      <Harta />
      <a href="/add" style={{ textDecoration: 'none' }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ba736a', // Culoare de fundal
            color: 'white', // Text alb
            border: 'none',
            borderRadius: '20px',
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#a85a50'; // Culoare mai închisă la hover
            e.currentTarget.style.transform = 'scale(1.05)'; // Mărește ușor butonul
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ba736a'; // Revine la culoarea inițială
            e.currentTarget.style.transform = 'scale(1)'; // Revine la dimensiunea inițială
          }}
        >
          <img
            src={plus}
            alt="Plus"
            style={{
              width: '30px',
              height: '30px',
              marginRight: '10px', // Spațiu între icon și text
            }}
          />
          <span>Add activity</span>
        </button>
      </a>
      <Cards />
      <LoginRegister />
    </div>
  );
};

export default Home;