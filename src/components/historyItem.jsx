import React, { Component } from "react";
// import { HistoryItemType } from "../types";
import PropTypes from "prop-types";

class HistoryItem extends Component {
    state = {
        music_libraries: {
            "youtube": {
                "prefix": "https://www.youtube.com/results?search_query=",
                "icon_class": "fa-youtube",
                "link_class": "youtube_link",
            },
            "soundcloud": {
                "prefix": "https://soundcloud.com/search?q=",
                "icon_class": "fa-soundcloud",
                "link_class": "soundcloud_link",
            }
        }
    };

    setContainerClasses = (animate) => {
        return `media media-song mb-2 ${((animate && document["hidden"] === false) ? "fade-in" : "")}`;
    };

    setBookmarkClasses = (bookmark_id) => {
        const { signedIn } = this.props;
        let class_name = "btn btn-link p-0 mr-2 bookmark_link";

        if (signedIn === false) {
            class_name += " disabled";
        } else if (bookmark_id) {
            class_name += " active";
        }

        return class_name;
    };

    formatTime = time => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }

        return new Intl.DateTimeFormat('en', options).format(new Date(time))
    };

    render() {
        const { id, created_at, song_id, song_title, bookmark, animate, onBookmarkChange } = this.props;
        const { music_libraries } = this.state;

        const bookmark_id = (bookmark === true) ? id : this.props.bookmark_id;

        return (
            <React.Fragment>
                <div className={this.setContainerClasses(animate)} key={id}>
                    <p className="media-body">
                        <span className="d-block text-gray-dark">{song_title}</span>
                        {Object.entries(music_libraries).map(([music_library_name, music_library]) => {
                            return (
                                <a 
                                    key={music_library_name}
                                    href={`${music_library["prefix"]}${encodeURIComponent(song_title)}`} 
                                    className={`mr-2 ${music_library["link_class"]}`}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i className={`fab ${music_library["icon_class"]}`}></i>
                                </a>
                            )
                        })}
                        <button 
                            key="bookmark" 
                            className={this.setBookmarkClasses(bookmark_id)} 
                            onClick={() => { onBookmarkChange(song_id, bookmark_id); }}>
                            <i className="fas fa-heart align-text-top"></i>
                        </button>
                        <small className="text-muted">{this.formatTime(created_at)}</small>
                    </p>
                </div>
            </React.Fragment>
        );
    }
}

HistoryItem.propTypes = {
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    song_id: PropTypes.number.isRequired,
    song_title: PropTypes.string.isRequired,
    bookmark_id: PropTypes.number,

    animate: PropTypes.bool,
    bookmark: PropTypes.bool,
    signedIn: PropTypes.bool.isRequired,
    onBookmarkChange: PropTypes.func.isRequired
}

HistoryItem.defaultProps = {
    bookmark_id: 0,
    animate: false,
    bookmark: false,
};

export default HistoryItem;
