House of Allegro - DJ Website
The House of Allegro website is a dynamic platform for the DJ "House of Allegro." It integrates event management and music streaming functionalities while showcasing the DJ’s portfolio and events. This project is published under Walter IT.

Features
Event Calendar:
Integrates with the Google Calendar API to display upcoming events as well as past events.

Music Integration:
Connects with the Spotify API to fetch and display new releases and top tracks from the DJ’s Spotify artist profile.

Multi-Page Navigation:
Uses React Router for seamless navigation across the Home, Events, Music, About, and Contact pages.

Responsive Design:
Utilizes Bootstrap alongside custom CSS for a responsive and modern look.

Technology Stack
Frontend:

React

TypeScript

React Router

Bootstrap

Backend:

Node.js

Express

Axios

APIs:

Google Calendar API

Spotify API

Installation
Clone the Repository:

bash
Copy
git clone <repository_url>
cd house_of_allegro
Install Dependencies:

bash
Copy
npm install
Environment Variables:
Create a .env file in the root directory and add the following variables with your keys:

env
Copy
GOOGLE_API_KEY=your_google_api_key
CALENDAR_ID=your_calendar_id
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
Running the Project
Development Mode:

Run the development server (this will start the Express server and the React development environment):

bash
Copy
npm run dev
Production Build:

Build the React application:

bash
Copy
npm run build
Start the production server:

bash
Copy
npm start
Deployment
The website is published under Walter IT. The production build is located in the dist folder, and the Express server in server.js is configured to serve these static files. Ensure that you follow Walter IT's deployment guidelines when publishing updates.

File Structure
server.js:
Sets up the Express server, configures API routes for fetching events from Google Calendar and Spotify data, and serves the static build of the React application.
​

main.tsx:
Entry point for the React application. It configures routing for different pages such as Home, Events, Music, Passed Events, About, and Contact.
​

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

License
This project is published under Walter IT.

Contact
For any inquiries or issues, please contact the development team or visit our website.
