import React from 'react'
import EventCard from '../EventCard/EventCard'

const PaginaActivitati = () => {
  return (
    <div style={{width:'80%'}}>
         <div>
           <h1>Activities</h1>
           <p>Here you can find all the activities you can join.</p>
          </div>
        <div>
          <EventCard/>
        </div>
    </div>
  )
}

export default PaginaActivitati
