// Intro.jsx
import React, { useState, useEffect } from 'react';
import './Intro.css';
import video from '../../assets/video/melc.mov';

const Intro = () => {
  const [showTitle, setShowTitle] = useState(false);
  const title = "SnailTrail";
  
  const [showDesc, setShowDesc] = useState(false); // Adăugăm acest state
  const desc = "Welcome to the app that connects young people with free courses, volunteer opportunities, and educational resources, ensuring equal access for every child and teen.";
  useEffect(() => {
  
    setTimeout(() => {
      setShowTitle(true);
    }, 3100);
  }, []);
 
  useEffect(() => {
    setTimeout(() => {
      setShowDesc(true);
    }, 5000);
  }, []);

  return (
    <div className="intro-container">
      <div className="overlay">
        {showTitle && (
          <h1 className="title">
            {title.split('').map((letter, index) => (
               <span 
                key={index} 
                className="letter"
                style={{ animationDelay: `${(title.length - index) * 0.1}s` }} // Această linie s-a modificat
                >
             {letter}
               </span>
          ))}

          </h1>
        )}
       {showDesc && (
              <div className="description fade-in">
                <p>{desc}</p>
              </div>
            )}
      </div>
      <video 
        className="background-video" 
        autoPlay 
        muted
        playsInline
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Intro;