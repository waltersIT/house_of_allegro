import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import NavBar from "./styles/NavBar";
import info from "./info.json";
import Footer from "./styles/Footer";
import Events from "./styles/Events";
import PassedEvents from "./PassedEvents";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; //not coming through but don't need it rn
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const CALENDAR_ID = import.meta.env.VITE_CALENDAR_ID; // calendar id works tho idk

interface Props {
  title: string;
}

function GoogleCalendar({ title }: Props) {
  return (
    <>
      <NavBar title={info.title} />
      
        <Events title={info.calendar.title} />
        <PassedEvents title={info.calendar.title} />
       
      
      <Footer />
    </>
  );
}

export default GoogleCalendar;
