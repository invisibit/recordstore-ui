import { Component, Fragment } from 'react';
import { recordStoreClient } from '../recordStoreClient';
import NowPlaying from './NowPlaying';

export default class Mymusic extends Component {

    state = {
        musicData: null,
        isLoaded: false,
        error: null,
    };

    componentDidMount() {
        const sptfySession = window.location.search.split('=')[1];

        if (this.state.isLoaded) return;

        // recordStoreClient.getUserMusicData({ sptfySession })
        //     .then((response) => {
        //         this.setState({
        //             musicData: {
        //                 artists: response.artists ?? [],
        //                 albums: response.albums ?? [],
        //                 analysis: response.analysis,
        //             },
        //             isLoaded: true,
        //         });
        //     })
        //     .catch((error) => {
        //         console.error("getUserMusicData failed", error);
        //         this.setState({ isLoaded: true, error });
        //     });

        // Split followed artists and saved albums in to separate calls
        // Only get saved albums now
        recordStoreClient.getSavedAlbums({ sptfySession })
            .then((response) => {
                this.setState({
                    savedAlbums: {
                        albums: response.albums ?? [],
                    },
                    isLoaded: true,
                });
            })
            .catch((error) => {
                console.error("getSavedAlbums failed", error);
                this.setState({ isLoaded: true, error });
            });
    }

    render() {
        const { isLoaded, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>;
        } else {
            return (
                <Fragment>
                    <NowPlaying albums={this.state.savedAlbums.albums} />
                    <h2>Ain't that some shit?</h2>

                    <div style={{ width: '40%', height: '250px', overflow: 'auto', border: '2px' }}>
                        <table border='2'>
                            <tr>
                                <td>Saved Album</td>
                                <td>Artist</td>
                                <td>Spotify</td>
                                <td>Amazon</td>
                                <td>Youtube</td>
                                <td>Schmapple</td>
                            </tr>

                            {this.state.savedAlbums.albums.map((m) => (
                                <tr>
                                    <td>
                                        <img src={m.albumImageUrl} width='60' border='5' alt='Album' /><br></br>{m.name}
                                    </td>
                                    <td>{m.artists.map((artistMap) => (artistMap.name)).join(", ")}</td>
                                    <td>Yes</td>
                                    <td>Sign in</td>
                                    <td>Sign in</td>
                                    <td>Sign in</td>
                                </tr>
                            ))}
                        </table>
                    </div>

                </Fragment >
            );
        }
    }
}
