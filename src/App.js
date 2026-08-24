// import logo from './logo.svg';
import './App.css';
import { React, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Home from './components/Home'
import Mymusic from './components/Mymusic'
import Consent from './components/Consent'
import Minimax from './components/minimax'
import { GoogleOAuthProvider, useCodeClient } from '@react-oauth/google';
// import { useSession } from './session';

function App() {
  // useSession();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('provider')) {
      params.delete('provider');
      const next = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
      window.history.replaceState({}, '', next);
    }
  }, []);


  const onSpotifyLogin = () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://recordstore.spyrafall.com:4000';
    const spotifyClientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    window.location.replace('https://accounts.spotify.com/authorize?' +
      'response_type=code' +
      '&client_id=' + spotifyClientID +
      '&redirect_uri=' + apiUrl + '/v1/spotify/callback' +
      '&state=state' +
      '&scope=user-library-read user-follow-read');
  }

  // const onYoutubeLogin = () => {
  //   const googleClientId = process.env.REACT_APP_YOUTUBE_CLIENT_ID;
  //   const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
  //     'http://127.0.0.1:4000/v1/youtube/callback'
  //   )}&response_type=token&client_id=${googleClientId}&scope=${encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly')}`;
  //   window.location.href = targetUrl;
  // }

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
            {/* <Button onClick={onSpotifyLogin}>Spotify</Button>
            <Button onClick={window.onAmazonLogin}>Amz</Button>
            <Button>bandcamp</Button>
            <Button onClick={onYoutubeLogin}>Toustube</Button> */}
            {/* <div id="g_id_onload"
                data-client_id="873553360750-a44t96msif0m3mgor6kkffl7guq60cab.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-login_uri="https://127.0.0.1:4000/v1/youtube/callback"
                data-auto_prompt="false">
              <Button>Toustube2</Button>
            </div>

            <div class="g_id_signin"
                data-type="standard"
                data-shape="pill"
                data-theme="outline"
                data-text="signin_with"
                data-size="medium"
                data-logo_alignment="left"
                data-width="250">
              <Button>Toustube3</Button>
            </div> */}
            {/* <Button>Schmapple</Button> */}
            <Button>Analyze</Button>
            <Button>Connect</Button>
            <Button>Sync</Button>
            <Button onClick={() => window.location.pathname = '/minimax'}>minimax</Button>

          </ButtonToolbar>
          <hr className="mb-3"></hr>
        </div>

        <div className="row">

          <div className="col-md-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Mymusic" element={<Mymusic />} />
              <Route path="/minimax" element={<Minimax />} />
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
