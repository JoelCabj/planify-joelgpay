import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { AppointmentPage, BookingPage } from './pages';
import AppNavBar from './components/AppNavBar/AppNavBar';


function App() {
  return (
    <>
      <Container>
          <Routes>
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/appointments" element={<AppointmentPage />} />
            <Route path="*" element={<BookingPage />} />
          </Routes>
      </Container>
      <AppNavBar></AppNavBar>
    </>
  )
}

export default App
