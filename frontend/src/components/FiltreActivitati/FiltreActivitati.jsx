import React, { useState, useEffect } from 'react';
import './FiltreActivitati.css';

const FiltreActivitati = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  
  const filterOptions = [
    { id: 'voluntariat', label: 'Volunteering' },
    { id: 'eveniment', label: 'Event' },
    { id: 'caritabil', label: 'Charity' },
    { id: 'tabara', label: 'Camp' },
    { id: 'curs', label: 'Course' },
    { id: 'concurs', label: 'Competition' },
    { id: 'sportiv', label: 'Sports' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'artistic', label: 'Artistic' },
   { id: 'robotica', label: 'Robotics' },
    { id: 'ecologie', label: 'Ecology' },
    { id: 'tehnologie', label: 'Technology' },
    { id: 'gratuit', label: 'Free' }, // Înlocuit 'gratis' cu 'gratuit'
    { id: 'contracost', label: 'Paid' },
    { id: 'online', label: 'Online' },
    { id: 'fizic', label: 'Physical' }
  ];

  const handleFilterClick = (filterId) => {
    setSelectedFilters(prevFilters => {
      if (prevFilters.includes(filterId)) {
        return prevFilters.filter(id => id !== filterId);
      } else {
        return [...prevFilters, filterId];
      }
    });
  };

  // Notify parent component when filters change
  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  return (
    <div className="filtre-container">
        {filterOptions.map((filter) => (
            <button
                key={filter.id}
                className={`filter-button ${selectedFilters.includes(filter.id) ? 'active' : ''}`}
                onClick={() => handleFilterClick(filter.id)}
            >
                {filter.label}
            </button>
        ))}
    </div>
  );
};

export default FiltreActivitati;