import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import NavBar from "./styles/NavBar";
import info from "./info.json";
import Footer from "./styles/Footer";
import Events from "./styles/Events";
import PassedEvents from "./PassedEvents";


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
