import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import config from "../config";

class Header extends Component {
    render() {
        const { signedIn, picture } = this.props.user;

        return (
            <header>
                <nav className="navbar navbar-expand-md bg-white border-bottom shadow-sm mb-5">
                    <div className="container">
                        <a className="navbar-brand text-dark" href="/">Nicecream FM History</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">History <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/bookmarks">Bookmarks</a>
                                </li>
                            </ul>

                            {signedIn ? (
                                <div className="mt-2 mt-md-0">
                                    <a className="nav-link text-dark btn btn-light" href={config.api.endpoint + "/user/sign_out"}>
                                        <img src={picture} alt="Avatar" className="avatar" /> Sign out</a>
                                </div>

                            ) : (
                                    <div className="mt-2 mt-md-0">
                                        <a className="nav-link text-dark btn btn-light" href={config.api.endpoint + "/user/google"}><i className="fab fa-google"></i> Sign in with Google</a>
                                    </div>
                                )}

                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default withRouter(Header);
