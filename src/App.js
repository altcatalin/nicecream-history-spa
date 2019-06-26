import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import History from "./components/history";
import Header from "./components/header";
import Footer from "./components/footer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <ToastContainer autoClose={false} />
                <Header />
                <Route exact path="/" component={History} />
                <Footer />
            </React.Fragment>
        );
    }
}

export default withRouter(App);
