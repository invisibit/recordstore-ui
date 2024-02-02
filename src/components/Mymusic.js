import React, { Component, Fragment } from 'react';
// import { useSearchParams } from "react-router-dom";

export default class Mymusic extends Component {
    // const[searchParams] = useSearchParams();

    state = {
        musicData: null,
        isLoaded: false,
        error: null,
    };

    componentDidMount() {
        // Yeah look, fast & fun
        console.log("fast and fun")
        const sptfySession = window.location.search.split('=')[1]
        let serverUrl = process.env.REACT_APP_SERVER_URL;
        const serverPort = process.env.REACT_APP_SERVER_PORT;
        if (serverPort != null) {
            serverUrl += ":" + serverPort
        }
        console.log("Url: ", serverUrl)

        if (!this.state.isLoaded) {
            // fetch('http://localhost:4000/v1/spotify/userMusicData?sptfySession=' + sptfySession)
            fetch(serverUrl + '/v1/spotify/userMusicData?sptfySession=' + sptfySession)
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
                    if (json.artists == null) {
                        json.artists = [];
                    }
                    if (json.albums == null) {
                        json.albums = [];
                    }

                    this.setState({
                        musicData: json,
                        isLoaded: true,
                    },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error,
                            });
                        }
                    );
                });
        }
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
                    <h2>Ain't that something?</h2>

                    <textarea id="musiAnalysis" name="musiAnalysis" rows="10" cols="100">
                        {this.state.musicData.analysis}
                    </textarea>

                    <div style={{ width: '40%', height: '250px', overflow: 'auto', border: '2px' }}>
                        <table border='2'>
                            <tr>
                                <td>Folllowed Artists</td>
                                <td>Spotify</td>
                                <td>Amazon</td>
                                <td>Youtube</td>
                                <td>Schmapple</td>
                            </tr>
                            {this.state.musicData.artists.map((m) => (
                                <tr>
                                    <td>
                                        {/* <div style={{ width: '40%', height: '250px', overflow: 'auto', border: '2px' }}>
                                            <ul> */}
                                        {/* {this.state.musicData.artists.map((m) => ( */}
                                        {/* <li key={m.id}> */}
                                        <img src={m.album_image_urls} width='60' border='5' alt='Artist' />{m.name}
                                        {/* </li>
                                                {/* ))} */}
                                        {/* </ul>
                                </div> * /} */}
                                    </td>
                                    <td>Yes</td>
                                    <td>Sign in</td>
                                    <td>Sign in</td>
                                    <td>Sign in</td>
                                </tr>
                            ))}
                        </table >
                    </div>

                    <div><p></p></div>

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

                            {this.state.musicData.albums.map((m) => (
                                <tr>
                                    <td>
                                        <img src={m.album_image_urls} width='60' border='5' alt='Album' />{m.name}
                                    </td>
                                    <td>m.</td>
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
