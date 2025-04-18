import { StrictMode } from "react";
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "/src/App.css";
import info from "./components/info.json";
import NotFound from "./components/NotFound.tsx";
import HomePage from "./components/HomePage.tsx";
import Music from "./components/Spotify.tsx";
import GoogleCalendar from "./components/Calendar.tsx";
import EventCalendar from "./components/PassedEvents.tsx";
import About from "./components/About.tsx";
import Contact from "./components/Contact.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/Events",
    element: <GoogleCalendar title={info.title} />, //make the main calls not take any props
    errorElement: <NotFound />,
  },
  {
    path: "/Music",
    element: <Music />,
    errorElement: <NotFound />,
  },
  {
    path: "/PassedEvents",
    element: <EventCalendar title={info.calendar.passedTitle} />,
    errorElement: <NotFound />,
  },
  {
    path: "/About",
    element: (
      <About
        title={info.about.title}
        descriptionOne={info.about.descriptionOne}
        descriptionTwo={info.about.descriptionTwo}
        descriptionThree={info.about.descriptionThree}
        descriptionFour={info.about.descriptionFour}
      />
    ),
  },
  {
    path: "/Contact",
    element: <Contact title={info.title} />,
    errorElement: <NotFound />,
  },

]);

ReactDom.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
