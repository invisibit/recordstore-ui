import React from 'react';
import './NowPlaying.css';

export default function NowPlaying({ albums }) {
  if (!albums || albums.length === 0) return null;

  // Display up to 5 albums
  const displayAlbums = albums.slice(0, 5);

  return (
    <div className="now-playing-container">
      {displayAlbums.map((album, index) => {
        // Move center point 35% down on the page
        // Base wedge spans 22.5 degrees (from 0 to +22.5).
        // Index 4 bottom is at 0 (reaches right edge).
        // Index 1 top is at 90 (horizontal).
        // Index 0 bottom is at 90 (horizontal, pops out above the quarter circle).
        const angle = 90 - (index * 22.5);
        const isTop = index === 0;

        const style = {
          transform: `rotate(${angle}deg)`,
          zIndex: 5 - index,
        };

        // For this example, if there's no explicit artist/song info in the album object,
        // we provide some fallback text to demonstrate the layout.
        const artistName = album.artistName || `Unknown Artist ${index + 1}`;
        const songName = isTop ? 'Current Track Playing' : '';

        return (
          <div key={index} className={`now-playing-card ${isTop ? 'top-card' : ''}`} style={style}>
            {!isTop && (
              <div className="wedge-content wedge-content-top">
                {album.albumImageUrl && (
                  <img src={album.albumImageUrl} alt={album.name} className="album-cover" />
                )}
                <div className="album-info">
                  <div className="album-name" title={album.name}>{album.name}</div>
                  <div className="artist-name" title={artistName}>{artistName}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {displayAlbums.length > 0 && (
        <div className="top-item-content">
          {displayAlbums[0].albumImageUrl && (
            <img src={displayAlbums[0].albumImageUrl} alt={displayAlbums[0].name} className="album-cover" />
          )}
          <div className="album-info">
            <div className="now-playing-label">Now Playing</div>
            <div className="album-name" title={displayAlbums[0].name}>{displayAlbums[0].name}</div>
            <div className="artist-name">Unknown Artist 1</div>
            <div className="song-name">Current Track Playing</div>
          </div>
        </div>
      )}
    </div>
  );
}
