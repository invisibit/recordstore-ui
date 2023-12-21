// import logo from './logo.svg';
import './App.css';
import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Home from './components/Home'
import Mymusic from './components/Mymusic'
import Consent from './components/Consent'

function App() {

  const onSpotifyLogin = () => {
    let serverUrl = process.env.REACT_APP_SERVER_URL;
    const serverPort = process.env.REACT_APP_SERVER_PORT;
    const spotifyClientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    if (serverPort != null) {
      console.log("Add port");
      serverUrl += ":" + serverPort
    }
    console.log("Url: ", serverUrl)

    window.location.replace('https://accounts.spotify.com/authorize?' +
      'response_type=code' +
      '&client_id=' + spotifyClientID +
      '&redirect_uri=' + serverUrl + '/v1/spotify/callback' +
      '&state=state' +
      '&scope=user-library-read user-follow-read');
  }

  return (
    <Router>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">
            Your emotionally unsatisfied hipster record store clerk
          </h1>
          <hr className="mb-3"></hr>
        </div>
        <div className="row">
          <ButtonToolbar className="custom-btn-toolbar">
            <Button onClick={onSpotifyLogin}>Spotify</Button>
            <Button onClick={window.onAmazonLogin}>Amz</Button>
            <Button>Toustube</Button>
            <Button>Schmapple</Button>
            <Button>Analyze</Button>
            <Button>Connect</Button>
            <Button>Sync</Button>

          </ButtonToolbar>
          <hr className="mb-3"></hr>
        </div>

        <div className="row">

          <div className="col-md-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Mymusic" element={<Mymusic />} />
              <Route path="/consent" element={<Consent />} />
              <Route path="/lwa.html" />
            </Routes>
          </div>
        </div>
      </div>

    </Router >
  );
}

export default App;
