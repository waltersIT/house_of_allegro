import { StrictMode } from 'react';
import ReactDom from 'react-dom/client';
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import '/src/App.css'
import NotFound from './components/NotFound.tsx';
import HomePage from './components/HomePage.tsx';
import info from './components/info.json';

const router = createBrowserRouter([{
  path: '/',
  element: <HomePage />, 
  errorElement: <NotFound />
},
]);

ReactDom.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
