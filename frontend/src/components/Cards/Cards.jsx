// Cards.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './CardUI';
import team1 from '../../assets/images/team1.jpg';
import team from '../../assets/images/team.jpeg';
import we from '../../assets/images/we.png';

const Cards = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div 
            className="contaier-fluid d-flex justify-content-center"
            style={{ marginTop: '100px' }}
        >
            <div className="row">
                <div className="col-md-4">
                    <div 
                        onClick={() => handleNavigation('/blog#top')} 
                        style={{ cursor: 'pointer', textDecoration: 'none' }}
                    >
                        <Card 
                            imgsrc={team1} 
                            title="Bytes of Hope"
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div 
                        onClick={() => handleNavigation('/blog#our-journey')} 
                        style={{ cursor: 'pointer', textDecoration: 'none' }}
                    >
                        <Card 
                            imgsrc={we} 
                            title="Our Journey"
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div 
                        onClick={() => handleNavigation('/blog#why-us')} 
                        style={{ cursor: 'pointer', textDecoration: 'none' }}
                    >
                        <Card 
                            imgsrc={team} 
                            title="Why Us?"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;