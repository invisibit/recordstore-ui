import React, { Component, Fragment } from 'react';
import { useSearchParams } from "react-router-dom";

export default class Home extends Component {

    state = {
        favoriteArtists: [],
        savedAlbums: [],
        isArtistLoaded: false,
        isAlbumLoaded: false,
        error: null,
    };

    componentDidMount() {
        // Need to get the token. Please change. But I want to test[JV]
        // const sptfySession = new URLSearchParams(window.location.search).get("sptfysession")

        if (this.state.favoriteArtists.length === 0) {
            fetch('http://localhost:4000/v1/spotify/followed?sptfySession=BQBGuF7A90xCb9SPshYCpgT9Gm_GF9DJXPk3NCuEBbPRhwPG6JDoGU0l0W8ZrBvIdoRvUeNUzSfH6bkRSxov4ig4hYcGGndNcXwjfl1x6GKwwo0Qg0gc-30qRyKCYxguGD96SF70vWxULpG63xsZAkV3VzI6J_CrH5IyX2Bn3qlWR0nw7N8j5GrRmJUqVdysOgWP')
                // + sptfySession)
                // .then((response) => response.json())
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
                    this.setState({
                        favoriteArtists: json,
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
            fetch('http://localhost:4000/v1/spotify/savedAlbums?sptfySession=BQBGuF7A90xCb9SPshYCpgT9Gm_GF9DJXPk3NCuEBbPRhwPG6JDoGU0l0W8ZrBvIdoRvUeNUzSfH6bkRSxov4ig4hYcGGndNcXwjfl1x6GKwwo0Qg0gc-30qRyKCYxguGD96SF70vWxULpG63xsZAkV3VzI6J_CrH5IyX2Bn3qlWR0nw7N8j5GrRmJUqVdysOgWP')
                // + sptfySession)
                // .then((response) => response.json())
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
                    this.setState({
                        savedAlbums: json,
                        isLoaded: true,
                    },
                        (error) => {
                            console.log("Nothing")
                            this.setState({
                                savedAlbums: json,
                                isAlbumLoaded: true,
                                error,
                            });
                        }
                    );
                });
        }
    }

    render() {
        const { favoriteArtists, savedAlbums, isArtistLoaded, isAlbumLoaded, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isArtistLoaded && !isAlbumLoaded) {
            return <p>Loading...</p>;
        } else {
            return (
                <Fragment>
                    <h2>Ain't that some shit?</h2>
                    Folllowed Artists

                    <ul>
                        {this.state.favoriteArtists.map((m) => (
                            <li key={m.id}>
                                <img src={m.album_image_urls} width='60' border='5' />{m.name}
                            </li>
                        ))}
                    </ul>

                    <br />
                    <h2>Ain't that some shit?</h2>
                    Saved Albums

                    <ul>
                        {this.state.savedAlbums.map((m) => (
                            <li key={m.id}>
                                <img src={m.album_image_urls} width='60' border='5' />{m.name}
                            </li>
                        ))}
                    </ul>
                </Fragment>
            );
        }
    }
}