import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import History from "./components/history";
import Bookmarks from "./components/bookmarks";
import Header from "./components/header";
import Footer from "./components/footer";
import userService from "./services/userService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
    state = {
        user: {
            signedIn: false,
            picture: ""
        }
    };

    async componentDidMount() {
        try {
            const { picture } = await userService.getUser();
            const user = {
                signedIn: true,
                picture
            }

            this.setState({ user });
        } catch {}
    };

    render() {
        const { user } = this.state;

        return (
            <React.Fragment>
                <ToastContainer autoClose={false} />
                <Header user={user}/>
                <Route exact path="/" render={(props) => <History {...props} signedIn={user.signedIn} />} />
                <Route exact path="/bookmarks" render={(props) => <Bookmarks {...props} signedIn={user.signedIn} />} />
                <Footer />
            </React.Fragment>
        );
    }
}

export default withRouter(App);
