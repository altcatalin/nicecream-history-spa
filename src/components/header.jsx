import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Header extends Component {
    state = {};

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light mb-5">
                    <div className="container border-bottom pb-2">
                        <a className="navbar-brand " href="/">Nicecream FM History</a>
                    </div>
                </nav>
            </header>
        );
    }
}

export default withRouter(Header);
