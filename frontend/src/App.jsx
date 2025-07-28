// App.jsx
import React from 'react'
import NavBar from './components/NavBar/NavBar'
import UserProfileCard from './components/UserProfileCard/UserProfileCard'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginRegister from './components/LoginRegister/LoginRegister';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import PaginaDetalii from './components/Harta/PaginaDetalii';
import PaginaInscriere from './components/PaginaInscriere/PaginaInscriere';
import PaginaActivitati from './components/PaginaActivitati/PaginaActivitati';
import HelpPage from './components/HelpPage/HelpPage';
import Harta from './components/Harta/Harta';
import Blog from './components/Blog/Blog';
import Footer from './components/Footer/Footer'
import Add from './components/Add/Add';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const App = () => {
  return(
    <BrowserRouter>
      <div className="app-container"> {/* New wrapper div */}
        <NavBar /> {/* NavBar first */}
        
        {/* Main content area */}
        <div className='main-content'> {/* New content wrapper */}
          <Routes>
            <Route path='/login' element={<LoginRegister />} />
           {/* <Route path="/profile" element={<UserProfileCard />} />*/}
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/paginaDetalii/:id" element={<PaginaDetalii/>} />
            <Route path="/activity-link" element={<PaginaInscriere/>}/>
            <Route path="/activities" element={<PaginaActivitati />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/map" element={<Harta/>} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/add" element={<Add />} />

          </Routes>
        </div>
     
       <Footer />  
      </div>
    </BrowserRouter>
  )
}

export default App;