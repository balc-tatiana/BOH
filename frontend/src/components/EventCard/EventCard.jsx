// EventCard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './EventCard.css';
import FiltreActivitati from '../FiltreActivitati/FiltreActivitati'; // Importă componenta FiltreActivitati

// Importă imaginile din folderul assets/event
const images = import.meta.glob('../../assets/event/*', { eager: true });

const getImage = (fileName) => {
  const path = `../../assets/event/${fileName}`;
  return images[path]?.default || null;
};

const EventCard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // Datele filtrate
    const [selectedFilters, setSelectedFilters] = useState([]); // Filtrele selectate
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/activities');
                if (!response.ok) {
                    throw new Error('Failed to fetch activities');
                }
                const activities = await response.json();
                setData(activities);
                setFilteredData(activities); // Inițial, toate datele sunt afișate
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    // Actualizează datele filtrate când filtrele se schimbă
    useEffect(() => {
        if (selectedFilters.length === 0) {
            setFilteredData(data); // Dacă nu sunt filtre, afișează toate datele
        } else {
            const filtered = data.filter((event) => {
                return selectedFilters.some((filter) => {
                    if (filter === 'gratuit') {
                        return event.activity_cost?.toLowerCase() === 'gratuit';
                    }
                    if (filter === 'contracost') {
                        return event.activity_cost?.toLowerCase() !== 'gratuit';
                    }
                    if (filter === 'online') {
                        return event.activity_city?.toLowerCase() === 'online';
                    }
                    if (filter === 'fizic') {
                        return event.activity_city?.toLowerCase() !== 'online';
                    }
                    return event.activity_type?.toLowerCase().includes(filter.toLowerCase());
                });
            });
            setFilteredData(filtered);
        }
    }, [selectedFilters, data]);

    if (loading) return <h3 className="noMessage">Loading events...</h3>;
    if (error) return <h3 className="noMessage">Error: {error}</h3>;

    return (
        <div>
            {/* Adaugă componenta FiltreActivitati */}
            <FiltreActivitati onFilterChange={setSelectedFilters} />

            {/* Afișează mesajul dacă nu există carduri disponibile */}
            {filteredData.length === 0 && (
                <h3 style={{ textAlign: 'center', color: '#87261B', marginTop: '20px' }}>
                    No events match your filters. Please try different filters.
                </h3>
            )}

            {/* Afișează evenimentele filtrate */}
            <div className="events_grid">
                {filteredData.map((event) => (
                    <div key={event.id} className="event_card">
                        <div 
                            className="event_image_card"
                            style={{
                                backgroundImage: `url(${getImage(event.activity_img?.split(';')[0]) || 'default-image-path.jpg'})`
                            }}
                        />
                        <div className="content_wrapper">
                            <div className="event_title_card">
                                {event.activity_title}
                            </div>
                            <div className="event_location_card">
                                {event.activity_city}
                            </div>
                            <div className="event_date_card">
                                <span>Start date: {new Date(event.activity_startdate).toLocaleDateString()}</span>
                                <span>End date: {new Date(event.activity_enddate).toLocaleDateString()}</span>
                            </div>
                            <div className="event_details_card">
                                <p>Cost: {event.activity_cost === 'Gratuit' ? 'Free' : 'Paid'}</p>
                                <p style={{ color: '#87261B' }}>Minimum age: {event.activity_minage} years</p>
                            </div>
                            <div className="event_type_card">
                                {event.activity_type?.split(';').map((type, index) => (
                                    <span key={index} className="type_tag">{type.trim()}</span>
                                ))}
                            </div>
                        </div>
                        <div className="button_container">
                            <button
                                onClick={() => navigate(`/paginaDetalii/${event.id}`)}
                                className="button_details"
                            >
                                Discover More
                            </button>             
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventCard;