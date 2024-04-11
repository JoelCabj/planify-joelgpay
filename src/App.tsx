import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { AppointmentPage, BookingPage } from './pages';
import AppNavBar, {AppRoute} from './components/AppNavBar/AppNavBar';
import { NavBarIcons } from './components/AppNavBar/NavBarIcons';


function App() {
  const links: AppRoute[] = [
    {label: 'Reservar', link: 'bookings', icon: NavBarIcons.CupHotFill},
    {label: 'Mis Turnos', link: 'appointments', icon: NavBarIcons.CupHotFill},
  ];

  return (
    <>
      <Container>
          <Routes>
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/appointments" element={<AppointmentPage />} />
            <Route path="*" element={<BookingPage />} />
          </Routes>
      </Container>
      <AppNavBar routes={links}></AppNavBar>
    </>
  )
}

export default App
