import React, { Component } from "react";
import userService from "../services/userService";
import HistoryItem from "./historyItem";
import PropTypes from "prop-types";

class Bookmarks extends Component {
    state = {
        initiated: false,
        content: []
    };

    async componentDidUpdate() {
        const { signedIn } = this.props;
        const { initiated } = this.state;

        if (signedIn === true && initiated === false) {
            const content = await userService.getBookmarks();
            await this.updateContent(content, false);
        }
    };

    updateContent = async (newContent, update = true) => {
        const currContent = JSON.parse(JSON.stringify(this.state.content));
        let initiated = this.state.initiated;

        if (update === true) {
            newContent = [...currContent, ...newContent];
        } else {
            initiated = true
        }

        this.setState({ content: newContent, initiated });
    };

    handleMoreClick = async () => {
        const content = await userService.getBookmarks(this.state.content.length);
        await this.updateContent(content);
    };

    handleBookmark = async (song_id, bookmark_id) => {
        const currContent = JSON.parse(JSON.stringify(this.state.content))
        await userService.deleteBookmark(bookmark_id);
        const content = currContent.filter(bookmark => bookmark["id"] !== bookmark_id);
        this.setState({ content });
    };

    render() {
        const { content } = this.state;
        const { signedIn } = this.props;

        return (
            <React.Fragment>
                <main role="main" className="flex-shrink-0">
                    <div className="container my-3">
                        <div className="media mt-3 mb-5">
                            <h3>Bookmarks</h3>
                        </div>
                        {(() => {
                            if (signedIn === true) {
                                return (
                                    <React.Fragment>
                                        {(() => {
                                            if (content.length > 0) {
                                                return content.map((record) => {
                                                    return (
                                                        <HistoryItem
                                                            key={record.id}
                                                            id={record.id} 
                                                            created_at={record.created_at} 
                                                            song_id={record.song_id} 
                                                            song_title={record.song_title} 
                                                            bookmark={true} 
                                                            signedIn={signedIn} 
                                                            onBookmarkChange={this.handleBookmark} 
                                                        />
                                                    );
                                                });
                                            } else {
                                                return (
                                                    <div>
                                                        <p className="media-body">
                                                            <span className="d-block text-gray-dark">You have no bookmarks.</span>
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        })()}
                                        <small className="d-block text-center mt-5">
                                            <button type="button" className="btn btn-light" onClick={() => this.handleMoreClick()}>
                                                More
                                            </button>
                                        </small>
                                    </React.Fragment>
                                );
                            } else {
                                return (
                                    <div>
                                        <p className="media-body">
                                            <span className="d-block text-gray-dark">You are not signed in.</span>
                                        </p>
                                    </div>
                                );
                            }
                        })()}
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

Bookmarks.propTypes = {
    signedIn: PropTypes.bool.isRequired
};


export default Bookmarks;
