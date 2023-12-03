import React, { Component, Fragment } from 'react';

// const serverUrl = process.env.REACT_APP_SERVER_URL;
// const serverPort = process.env.REACT_APP_SERVER_PORT;

export default class Home extends Component {

    state = {
        albums: [],
        isLoaded: false,
        error: null,
    };

    componentDidMount() {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const serverPort = process.env.REACT_APP_SERVER_PORT;

        window.location.replace('https://accounts.spotify.com/authorize?' +
            'response_type=code' +
            '&client_id=5c37b6f4c90143908b11d9e1727db5e7' +
            '&redirect_uri=' + serverUrl + ':' + serverPort + '/v1/spotify/callback' +
            // '&redirect_uri=https%3A%2F%2Frecordstore-go-344gqgcrvq-uc.a.run.app%2Fv1%2Fspotify%2Fcallback' +
            '&state=state' +
            '&scope=user-library-read user-follow-read');
    }

    render() {
        const { isLoaded, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading1...</p>;
        } else {
            return (
                <Fragment>
                    <h2>Choose an album</h2>

                    <ul>
                        {this.state.albums.map((m) => (
                            <li key={m.id}>
                                {m.title}
                            </li>
                        ))}
                    </ul>
                </Fragment>
            );
        }
    }
}