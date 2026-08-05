import { Component, Fragment } from 'react';
import { recordStoreClient } from '../recordStoreClient';
import './minimax.css';

const PROVIDERS = [
  { id: 'spotify', label: 'Spotify' },
  { id: 'youtube', label: 'Youtube' },
  { id: 'apple', label: 'Apple' },
  { id: 'amazon', label: 'Amazon' },
  { id: 'soundcloud', label: 'Soundcloud' },
];

const onSpotifyLogin = () => {
  console.log("Enter OnSpotifyLogin");
  const response = recordStoreClient.getCurrentUser({});
  const userId = response.userId || '';
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const serverPort = process.env.REACT_APP_SERVER_PORT;
  const spotifyClientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const redirectBase = serverPort
    ? `${serverUrl}:${serverPort}`
    : serverUrl;
  window.location.replace(
    'https://accounts.spotify.com/authorize?' +
    'response_type=code' +
    '&client_id=' + spotifyClientID +
    // '&redirect_uri=' + redirectBase + '/v1/spotify/callback/'
    '&redirect_uri=' + redirectBase + '/v1/spotify/callback' +
    '&state=state' +
    '&scope=user-library-read user-follow-read user-read-private'
  );
};

const onYoutubeLogin = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const serverPort = process.env.REACT_APP_SERVER_PORT;
  const youtubeClientID = process.env.REACT_APP_YOUTUBE_CLIENT_ID;
  const redirectBase = serverPort
    ? `${serverUrl}:${serverPort}`
    : serverUrl;
  window.location.replace(
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    'response_type=code' +
    '&client_id=' + youtubeClientID +
    '&redirect_uri=' + redirectBase + '/v1/youtube/callback' +
    '&scope=https://www.googleapis.com/auth/youtube.force-ssl openid profile email' +
    '&access_type=offline' +
    '&include_granted_scopes=true' +
    '&prompt=consent'
  );
};

const providerLogin = (id) => {
  console.log(id);
  if (id === 'spotify') {
    onSpotifyLogin();
    return;
  }
  if (id === 'youtube') {
    onYoutubeLogin();
    return;
  }
  console.log(`[minimax] login stub: ${id}`);
};

const getArtistName = (album) => {
  if (album.artistName) return album.artistName;
  if (Array.isArray(album.artists) && album.artists.length > 0) {
    const names = album.artists
      .map((a) => (a && a.name ? a.name : ''))
      .filter(Boolean);
    if (names.length > 0) return names.join(', ');
  }
  return 'Unknown Artist';
};

const groupByArtist = (albums) => {
  const groups = new Map();
  for (const album of albums) {
    const artist = getArtistName(album);
    if (!groups.has(artist)) groups.set(artist, []);
    groups.get(artist).push(album);
  }
  const sorted = Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b));
  return sorted.map(([artist, list]) => ({
    artist,
    albums: [...list].sort((a, b) => (a.name || '').localeCompare(b.name || '')),
  }));
};

class BauhausCircle extends Component {
  render() {
    return (
      <div className="bauhaus-mark" aria-hidden="true">
        <div className="mark-square mark-red" />
        <div className="mark-square mark-yellow" />
        <div className="mark-square mark-blue" />
        <div className="mark-circle" />
      </div>
    );
  }
}

class MenuSection extends Component {
  state = { modal: null };

  openModal = (id) => this.setState({ modal: id });
  closeModal = () => this.setState({ modal: null });

  renderModal = () => {
    const { modal } = this.state;
    if (!modal) return null;
    const titles = {
      sync: 'Sync',
      help: 'Help',
      about: 'About',
    };
    const body = {
      sync: 'The hand turns the hand. The needle seeks the groove. Press SYNC to re-collect your shelves.',
      help: 'A square is a square is a square. Click an album. Listen. Repeat. There is no manual.',
      about: 'minimax is a record store for people who do not want a record store. Bauhaus bones. Dadaist breath.',
    };
    return (
      <div className="mm-modal-backdrop" onClick={this.closeModal}>
        <div className="mm-modal" onClick={(e) => e.stopPropagation()}>
          <div className="mm-modal__bar">
            <span className="mm-modal__bar-dot mm-modal__bar-dot--red" />
            <span className="mm-modal__bar-dot mm-modal__bar-dot--yellow" />
            <span className="mm-modal__bar-dot mm-modal__bar-dot--blue" />
            <span className="mm-modal__bar-rule" />
            <button className="mm-modal__close" onClick={this.closeModal}>×</button>
          </div>
          <h3 className="mm-modal__title ransom">{titles[modal]}</h3>
          <p className="mm-modal__body">{body[modal]}</p>
        </div>
      </div>
    );
  };

  render() {
    return (
      <aside className="mm-section mm-menu">
        <div className="mm-menu__head">
          <BauhausCircle />
          <div className="mm-menu__title-block">
            <div className="mm-menu__eyebrow ransom">Section 01</div>
            <h2 className="mm-menu__title ransom">C O N N E C T</h2>
          </div>
        </div>

        <div className="mm-menu__group">
          <div className="mm-menu__label ransom">Sign in</div>
          <ul className="mm-menu__list">
            {PROVIDERS.map((p) => (
              <li key={p.id}>
                <button
                  className={`mm-btn mm-btn--provider mm-btn--${p.id}`}
                  onClick={() => providerLogin(p.id)}
                >
                  <span className="mm-btn__dot" />
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mm-menu__group">
          <div className="mm-menu__label ransom">Other</div>
          <ul className="mm-menu__list mm-menu__list--flat">
            <li>
              <button className="mm-btn mm-btn--ghost" onClick={() => this.openModal('sync')}>
                Sync
              </button>
            </li>
            <li>
              <button className="mm-btn mm-btn--ghost" onClick={() => this.openModal('help')}>
                Help
              </button>
            </li>
            <li>
              <button className="mm-btn mm-btn--ghost" onClick={() => this.openModal('about')}>
                About
              </button>
            </li>
          </ul>
        </div>

        {this.renderModal()}
      </aside>
    );
  }
}

class AlbumListSection extends Component {
  render() {
    const { isLoaded, error, albums } = this.props;
    return (
      <section className="mm-section mm-albums">
        <header className="mm-albums__head">
          <div className="mm-albums__eyebrow ransom">Section 02</div>
          <h2 className="mm-albums__title ransom">T H E &nbsp; S H E L V E S</h2>
          <div className="mm-albums__rule" />
        </header>

        <div className="mm-albums__body">
          {error && <div className="mm-albums__error">Error: {error.message}</div>}
          {!isLoaded && <div className="mm-albums__loading">Loading the shelves…</div>}
          {isLoaded && albums.length === 0 && (
            <div className="mm-albums__empty">The shelves are bare. Sign in to fill them.</div>
          )}
          {isLoaded && albums.length > 0 && (
            <ol className="mm-albums__list">
              {groupByArtist(albums).map(({ artist, albums: artistAlbums }, idx) => (
                <li key={artist} className="mm-album-group">
                  <div className="mm-album-group__head">
                    <span className="mm-album-group__index">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="mm-album-group__name ransom">{artist}</span>
                    <span className="mm-album-group__count">{artistAlbums.length}</span>
                  </div>
                  <ul className="mm-album-group__items">
                    {artistAlbums.map((album) => {
                      const albumArtist = getArtistName(album);
                      return (
                        <li key={album.id || album.name} className="mm-album-row">
                          <span className="mm-album-row__cover" aria-hidden="true">
                            {album.albumImageUrl
                              ? <img src={album.albumImageUrl} alt="" />
                              : <span className="mm-album-row__cover-fallback" />}
                          </span>
                          <span className="mm-album-row__meta">
                            <span className="mm-album-row__name">{album.name}</span>
                            {albumArtist && (
                              <span className="mm-album-row__artist">{albumArtist}</span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    );
  }
}

class NowPlayingSection extends Component {
  render() {
    const { albums } = this.props;
    const queue = (albums || []).slice(0, 5);
    return (
      <section className="mm-section mm-queue">
        <header className="mm-queue__head">
          <div className="mm-queue__eyebrow ransom">Section 03</div>
          <h2 className="mm-queue__title ransom">N O W &nbsp; / &nbsp; N E X T</h2>
          <div className="mm-queue__rule" />
        </header>

        <ol className="mm-queue__list">
          {queue.length === 0 && (
            <li className="mm-queue__empty">The needle waits.</li>
          )}
          {queue.map((album, index) => {
            const artist = getArtistName(album);
            return (
              <li
                key={album.id || `${artist}-${album.name}-${index}`}
                className={`mm-queue__item ${index === 0 ? 'mm-queue__item--now' : ''}`}
                style={{ '--i': index }}
              >
                <span className="mm-queue__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="mm-queue__cover" aria-hidden="true">
                  {album.albumImageUrl
                    ? <img src={album.albumImageUrl} alt="" />
                    : <span className="mm-queue__cover-fallback" />}
                </span>
                <span className="mm-queue__meta">
                  <span className="mm-queue__name">{album.name}</span>
                  <span className="mm-queue__artist">{artist}</span>
                </span>
                {index === 0 && <span className="mm-queue__now-tag">Now</span>}
              </li>
            );
          })}
        </ol>
      </section>
    );
  }
}

export default class Minimax extends Component {
  state = {
    savedAlbums: { albums: [] },
    username: '',
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    this.initializeUser();
  }

  initializeUser = async () => {
    try {
      const response = await recordStoreClient.getCurrentUser({});
      const username = response.username || '';
      const providers = Array.isArray(response.providers) ? response.providers : [];
      this.setState({ username });

      let call = null;
      call = recordStoreClient.getSavedAlbums({});

      if (!call) {
        this.setState({ isLoaded: true });
        return;
      }

      const albumsResponse = await call;
      this.setState({
        savedAlbums: { albums: albumsResponse.albums ?? [] },
        isLoaded: true,
      });
    } catch (error) {
      console.error('initializeUser failed', error);
      this.setState({ isLoaded: true, error });
    }
  };

  render() {
    const { savedAlbums, username, isLoaded, error } = this.state;
    return (
      <Fragment>
        <div className="minimax-shell">
          <header className="minimax-banner">
            <div className="minimax-banner__bar minimax-banner__bar--red" />
            <div className="minimax-banner__bar minimax-banner__bar--yellow" />
            <div className="minimax-banner__bar minimax-banner__bar--blue" />
            <div className="minimax-banner__title">
              <span className="ransom">m i n i m a x</span>
              <span className="minimax-banner__sub ransom">a record store, sideways</span>
            </div>
            <div className="minimax-banner__user">
              {username ? username : 'Not signed in'}
            </div>
            <div className="minimax-banner__triangle" aria-hidden="true" />
          </header>

          <div className="minimax-grid">
            <MenuSection />
            <AlbumListSection
              isLoaded={isLoaded}
              error={error}
              albums={savedAlbums.albums}
            />
            <NowPlayingSection albums={savedAlbums.albums} />
          </div>

          <footer className="minimax-footer">
            <span className="ransom">form follows feeling.</span>
          </footer>
        </div>
      </Fragment>
    );
  }
}
