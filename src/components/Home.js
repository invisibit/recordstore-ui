import React, { Component, Fragment } from 'react';

export default class Home extends Component {

    state = {
        albums: [],
        isLoaded: false,
        error: null,
    };

    render() {
        const { isLoaded, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Login to one of the music services to begin</p>;
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