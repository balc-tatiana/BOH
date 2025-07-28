import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Harta.css'; // Asigură-te că ai un fișier CSS pentru stilizare
import FiltreActivitati from '../FiltreActivitati/FiltreActivitati';
import PozaIcon from '../../assets/images/PozaIcon.png'; // Asigură-te că calea este corectă

const IconPin = L.icon({
  iconUrl: PozaIcon, // Imaginea pentru marker
  iconSize: [50, 50], // Dimensiunea marker-ului (lățime, înălțime)
  iconAnchor: [25, 50], // Punctul de ancorare (centrul jos al imaginii)
  popupAnchor: [0, -50], // Punctul de deschidere al popup-ului
});

const Harta = () => {
  const [activities, setActivities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const cityCoordinates = {
    'București': [44.4268, 26.1025],
    'Cluj-Napoca': [46.7712, 23.6236],
    'Timișoara': [45.7489, 21.2087],
    'Iași': [47.1585, 27.6014],
    'Constanța': [44.1598, 28.6348]
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/activities', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }

      const data = await response.json();
      setActivities(data);
      setFilteredActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    
    if (mapInstanceRef.current && cityCoordinates[city]) {
      mapInstanceRef.current.setView(cityCoordinates[city], 13);
    }
  };
  const [filteredActivities, setFilteredActivities] = useState([]);
  // Inițializare hartă și fetch activities
  useEffect(() => {
    fetchActivities();

    mapInstanceRef.current = L.map('Harta').setView([45.9432, 24.9668], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  // Actualizare markere când se schimbă activities
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Curăță markerele existente
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    
    // Adaugă noile markere
    filteredActivities.forEach((activity) => {
      if (activity.activity_coord_lat && activity.activity_coord_lng) {
        const marker = L.marker(
          [activity.activity_coord_lat, activity.activity_coord_lng],
          { icon: IconPin } // Asociază icon-ul personalizat
        ).addTo(mapInstanceRef.current);

         const startDate = new Date(activity.activity_startdate);
         const now = new Date();
         const diffDays = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));
         const remainingDaysText = diffDays > 0
      ? `Remaining days: ${diffDays}`
      : 'The activity has started or passed';

        marker.bindPopup(`
          <div class="popup-content">
            <b class="popup-title">${activity.activity_title}</b><br>
            <p>${activity.description}</p>
            <p class="popup-remaining-days">${remainingDaysText}</p>
            <a href="/paginaDetalii/${activity.id}" class="popup-link">
              <button class="popup-button">More details</button>
            </a>
          </div>
        `);
      }
    });
  }, [ filteredActivities]);
  const handleFilterChange = async (selectedFilters) => {
    if (selectedFilters.length === 0) {
        setFilteredActivities(activities); // Dacă nu sunt selectate filtre, returnează toate activitățile
        return;
    }

    try {
        let filteredData = activities;

        // Filtrare pentru gratuit/contracost
        if (selectedFilters.includes('gratuit')) {
            filteredData = filteredData.filter((item) => item.activity_cost?.toLowerCase() === 'gratuit');
        }
        if (selectedFilters.includes('contracost')) {
            filteredData = filteredData.filter((item) => item.activity_cost?.toLowerCase() !== 'gratuit');
        }

        // Filtrare pentru online/fizic
        if (selectedFilters.includes('online')) {
            filteredData = filteredData.filter((item) => item.activity_city?.toLowerCase() === 'online');
        }
        if (selectedFilters.includes('fizic')) {
            filteredData = filteredData.filter((item) => item.activity_city?.toLowerCase() !== 'online');
        }

        // Filtrare pentru alte tipuri
        const otherFilters = selectedFilters.filter(
            (f) => !['gratuit', 'contracost', 'online', 'fizic'].includes(f)
        );
        if (otherFilters.length > 0) {
            const queryString = otherFilters.map((f) => encodeURIComponent(f)).join(',');
            const response = await fetch(
                `http://localhost:3001/api/activities/filter?types=${queryString}`,
                { credentials: 'include' }
            );

            if (!response.ok) {
                throw new Error('Filtering failed');
            }

            const data = await response.json();
            filteredData = filteredData.filter((item) =>
                data.some((filteredItem) => filteredItem.id === item.id)
            );
        
      
}

        setFilteredActivities(filteredData);
    } catch (error) {
        console.error('Error filtering activities:', error);
    }
};

  return (
    <div style={{ width: '100%', marginBottom: '40px' }}> {/* Container pentru harta și elementele asociate */}
      <h2 style={{ margin: '20px 0 10px 0' }}>Activities Map</h2>
      <div style={{ display: 'flex', height: '80vh' }}> {/* Flex container pentru harta și filtre */}
        {/* Harta */}
        <div id="Harta" ref={mapRef} style={{ flex: 1, height: '100%' }}></div>

        {/* Container pentru butonul de activități și filtre */}
        <div
          style={{
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '20px',
            backgroundColor: '#f4dea4',
            borderRadius: '8px',
            marginLeft: '20px',
          }}
        >
          {/* Butonul de activități */}
          <select
            value={selectedCity}
            onChange={handleCityChange}
            style={{
              padding: '8px',
              height: 'fit-content',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
              width: '100%',
            }}
          >
            <option value="">Select a city</option>
            {Object.keys(cityCoordinates).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Filtre */}
          <h3 style={{ margin: '5px 0 5px 0' }}>Filters</h3>
          {/* Aici se va adăuga componenta de filtre */}
          <FiltreActivitati onFilterChange={handleFilterChange} />
        </div>
      </div>
    </div>
  );
};

export default Harta;