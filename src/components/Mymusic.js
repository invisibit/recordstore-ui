import React, { Component, Fragment } from 'react';
// import { useSearchParams } from "react-router-dom";

export default class Mymusic extends Component {
    // const[searchParams] = useSearchParams();

    state = {
        musicData: null,
        favoriteArtists: [],
        savedAlbums: [],
        isArtistLoaded: false,
        isAlbumLoaded: false,
        error: null,
    };

    componentDidMount() {
        // Yeah look, fast & fun
        const sptfySession = window.location.search.split('=')[1]

        if (this.state.favoriteArtists.length === 0) {
            fetch('https://recordstore-go-344gqgcrvq-uc.a.run.app:4000/v1/spotify/userMusicData?sptfySession=' + sptfySession)
                .then((response) => {
                    console.log("Status", response.status);
                    if (response.status !== "200") {
                        let err = Error;
                        err.message = "Invalid response: " + response.status;
                        this.setState({ error: err });
                    }
                    return response.json();
                })
                .then((json) => {
                    console.log("response", json)
                    JSON.stringify(json);
                    console.log("response stringify", json)
                    this.setState({
                        musicData: json,
                        isLoaded: true,
                    },
                        (error) => {
                            this.setState({
                                isArtistLoaded: true,
                                error,
                            });
                        }
                    );
                });

            // Get the saved Albums
            // fetch('http://localhost:4000/v1/spotify/savedAlbums?sptfySession=' + sptfySession)
            //     .then((response) => {
            //         console.log("Status", response.status);
            //         if (response.status !== "200") {
            //             let err = Error;
            //             err.message = "Invalid response: " + response.status;
            //             this.setState({ error: err });
            //         }
            //         return response.json();
            //     })
            //     .then((json) => {
            //         this.setState({
            //             savedAlbums: json,
            //             isLoaded: true,
            //         },
            //             (error) => {
            //                 console.log("Nothing")
            //                 this.setState({
            //                     savedAlbums: json,
            //                     isAlbumLoaded: true,
            //                     error,
            //                 });
            //             }
            //         );
            //     });
        }
    }

    render() {
        const { isArtistLoaded, isAlbumLoaded, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isArtistLoaded && !isAlbumLoaded) {
            return <p>Loading...</p>;
        } else {
            return (
                <Fragment>
                    <h2>Ain't that some shit?</h2>

                    <textarea id="musiAnalysis" name="musiAnalysis" rows="10" cols="50%">
                        {this.state.musicData.analysis}
                    </textarea>

                    {/* Folllowed Artists

                    <ul>
                        {this.state.musicData.artists.map((m) => (
                            <li key={m.id}>
                                <img src={m.album_image_urls} width='60' border='5' />{m.name}
                            </li>
                        ))}
                    </ul>

                    <br />
                    <h2>Ain't that some shit?</h2>
                    Saved Albums

                    <ul>
                        {this.state.musicData.albums.map((m) => (
                            <li key={m.id}>
                                <img src={m.album_image_urls} width='60' border='5' />{m.name}
                            </li>
                        ))}
                    </ul> */}

                    <table>
                        <tr>
                            <td>Folllowed Artists</td>
                            <td>Saved Albums</td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{ width: '40%', height: '250px', overflow: 'auto', border: '2px' }}>
                                    <ul>
                                        {this.state.musicData.artists.map((m) => (
                                            <li key={m.id}>
                                                <img src={m.album_image_urls} width='60' border='5' alt='Artist' />{m.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <div style={{ width: '40%', height: '250px', overflow: 'auto', border: '2px' }}>
                                    <ul>
                                        {this.state.musicData.albums.map((m) => (
                                            <li key={m.id}>
                                                <img src={m.album_image_urls} width='60' border='5' alt='Album' />{m.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </table>

                </Fragment>
            );
        }
    }
}
