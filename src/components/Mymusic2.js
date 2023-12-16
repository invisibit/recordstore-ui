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
            fetch('https://recordstore-go-344gqgcrvq-uc.a.run.app/v1/spotify/userMusicData?sptfySession=' + sptfySession)
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


        return (
            <h2>Ain't that some shit?</h2>

        )
    }
}
