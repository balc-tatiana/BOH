import React from 'react';
import tutorial from '../../assets/video/tutorial.mp4';
import tutorialapp from '../../assets/video/tutorialapp.mp4';

const HelpPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      {/* Container pentru text și linkuri */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '20px' }}>
        <h1>AI recommendations & Help Page</h1>
        <h3>
          Not sure what activity suits you best? I'm here to help you discover opportunities that match your interests and goals. Let's find the right path together!
        </h3>
        <a 
          href="https://partyrock.aws/u/tatianaidk/8igC1ljXc/ExtraFun" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ fontSize: '1.2rem', color: '#007bff', textDecoration: 'none', marginTop: '10px' }}
        >
          Click here for help
        </a>
      </div>

      {/* Container pentru video */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <a 
          href="https://partyrock.aws/u/tatianaidk/8igC1ljXc/ExtraFun" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: 'block', width: '100%', maxWidth: '900px' }}
        >
          <video 
            src={tutorial} 
            controls 
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </a>
      </div>
      <div>
        <h3>Do you need help navigating the app? You can follow the video bellow for instructions</h3>
      </div>
       <div style={{ display: 'flex', justifyContent: 'center' }}>
          <video 
            src={tutorialapp} 
            controls 
            style={{ width: '70%', borderRadius: '10px' }}
          />
      </div>
    </div>
  );
};

export default HelpPage;
