import logo from './logo.svg';
import './App.css';

function App() {

  // var client_id = new URLSearchParams(['client_id']['5c37b6f4c90143908b11d9e1727db5e7']);
  // var redirect_uri = new URLSearchParams('http://localhost:4000/v1/spotify/callback');

  // var app = express();

  window.location.replace('https://accounts.spotify.com/authorize?' +
    'response_type=code' +
    '&client_id=5c37b6f4c90143908b11d9e1727db5e7' +
    '&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fv1%2Fspotify%2Fcallback' +
    '&state=state' +
    '&scope=user-follow-read');
  // stringify({
  //   response_type: "code",
  //   client_id: "5c37b6f4c90143908b11d9e1727db5e7",
  //   // scope: "scope",
  //   redirect_uri: redirect_uri,
  //   state: "state"
  // }));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;
