import { StrictMode } from 'react';
import ReactDom from 'react-dom/client';
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import '/src/App.css'
import info from './components/info.json';
import NotFound from './components/NotFound.tsx';
import HomePage from './components/HomePage.tsx';
import Music from './components/Spotify.tsx';
import GoogleCalendar from './components/Calendar.tsx';


const router = createBrowserRouter([{
  path: '/',
  element: <HomePage />, 
  errorElement: <NotFound />
},
{
  path: '/Events',
  element: <GoogleCalendar title={info.calendar.title}/>, //make the main calls not take any props
  errorElement: <NotFound />
},
{
  path: '/Music',
  element: <Music />, 
  errorElement: <NotFound />
},
]);

ReactDom.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
