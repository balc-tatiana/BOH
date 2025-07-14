import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PaginaDetalii.css';
import defaultImage from '../../assets/images/default_profile.png';
import phone from '../../assets/images/phone.png';
import email from '../../assets/images/email.png';
import insta from '../../assets/images/insta.png';

// ✅ [1] Importă toate imaginile din folderul assets/event
const images = import.meta.glob('../../assets/event/*', { eager: true });

// ✅ [2] Funcție care caută imaginea corespunzătoare
const getImage = (fileName) => {
  const path = `../../assets/event/${fileName}`;
  return images[path]?.default || null;
};

// Iconițe inimă
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const PaginaDetalii = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // **Stare pentru favorite**
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchActivity = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/activities/${id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch activity');
      }

      const data = await response.json();
      setActivity(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!activity) return <p>Activity not found.</p>;
  const photos = activity.activity_img
    ? activity.activity_img.split(';').map((photo) => photo.trim())
    : [];

  // **Handler pentru toggle favorite**
  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
    alert(
      !isFavorite
        ? 'TNice! The activity is now on your favorites list!'
        : 'The event has been removed from your favorites list.'
    );
  };

  return (
    <div className="pagina-detalii">
      <h1 className="nume-eveniment">{activity.activity_title}</h1>

      <div className="organizator-localitate">
        <span className="organizator">{activity.activity_organizer_name || 'N/A'}</span>
        <span className="localitate">{activity.activity_city || 'N/A'}</span>
      </div>

      <div className="info-box">
        <h2>Details</h2>
        <div className="info-row">
          <span>Start Date: {new Date(activity.activity_startdate).toLocaleString()}</span>
          <span>End Date: {new Date(activity.activity_enddate).toLocaleString()}</span>
        </div>
        <div className="info-row">
          <span style={{ color: '#840101', fontStyle: 'italic' }}>
            Minimum Age: {activity.activity_minage || 'N/A'}
          </span>
        </div>
        <div className="info-row">
          <span style={{ color: 'green', fontWeight: 'bold' }}>
            Cost: {activity.activity_cost}
          </span>
        </div>
        <div className="info-row">
          <div className="tags-container">
            {activity.activity_type?.split(';').map((tag, index) => (
              <span key={index} className="tag">
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="descriere-eveniment">
        <h2>Event Description</h2>
        <p
          style={{
            marginRight: '10px',
            marginLeft: '10px',
            whiteSpace: 'pre-line',
            lineHeight: '1.5',
          }}
        >
          {activity.description}
        </p>
      </div>

      {/* ✅ Galerie Foto - mai multe poze */}
      <div className="galerie-foto">
        <h2>Photo Gallery</h2>
        <div className="poze-grid">
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <div className="image-wrapper" key={index}>
                <img
                  src={getImage(photo) || defaultImage}
                  alt={`Poza ${index + 1}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                />
              </div>
            ))
          ) : (
            <p>No photos available for this event.</p>
          )}
        </div>
      </div>

      <div className="contact">
        <h2>Contact</h2>
        <p>Contact the organizer for more details.</p>
        <li style={{ listStyle: 'none' }}>
          <img
            src={phone}
            alt="Phone"
            className="rounded-icon"
            width={30}
            height={30}
            style={{ marginRight: '15px' }}
          />
          <span>{activity.activity_contact_phone || 'N/A'}</span>
        </li>
        <li style={{ listStyle: 'none' }}>
          <img
            src={email}
            alt="Mail"
            className="rounded-icon"
            width={30}
            height={30}
            style={{ marginRight: '15px' }}
          />
          <span>{activity.activity_contact_email || 'N/A'}</span>
        </li>
        <li style={{ listStyle: 'none' }}>
          <a href={activity.activity_link_media} target="_blank" rel="noopener noreferrer">
            <img
              src={insta}
              alt="Insta"
              className="border-icon"
              width={30}
              height={30}
              style={{ marginRight: '15px' }}
            />
            <span>{activity.activity_contact_media || 'N/A'}</span>
          </a>
        </li>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          width: '100%',
        }}
      >
        <button
          onClick={() => {
            if (activity.activity_link_media === 'NU') {
              navigate('/activity-link'); // Navighează către PaginaInscriere.jsx
            } else {
              navigate(activity.activity_form); // Redirecționează în aceeași pagină către linkul formularului
            }
          }}
          style={{
            backgroundColor: '#87261B',
            color: 'white',
            padding: '15px 40px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            margin: '20px 0',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#a62d20';
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#87261B';
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
          }}
        >
          Join Activity
        </button>

        <button
          onClick={handleFavoriteClick}
          className={`heart-button ${isFavorite ? 'favorite' : ''}`}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: isFavorite ? '#FF0000' : '#ccc',
            transition: 'color 0.3s ease',
          }}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};

export default PaginaDetalii;
