// CardUI.js
import React from 'react';
import './card.style.css';

const Card = props => {
    return (
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.imgsrc} alt="Image 1" className="card-img-top"/>
            </div>
            <div className="card-body text-dark">
                {/* Add a default value in case title prop is not provided */}
                <h4 className="card-title">{props.title || 'Default Title'}</h4>
                <p className="card-text text-secondary">
                    Find more by clicking the button below.
                </p>
                <a href="/blog" className="btn btn-outline-success">View more</a>
            </div>
        </div>
    );
}

export default Card;