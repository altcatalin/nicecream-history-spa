import React, { Component } from "react";
import { MusicLibraryButtonType } from "../types";
import { prepareSongTitle } from "../utils";

class MusicLibraryButton extends Component {
    setLinkClasses = (className) => {
        return `mr-2 ${className}`;
    };

    setIconClasses = (className) => {
        return `fab ${className}`
    };

    buildSearchUrl = (prefix, term) => {
        return `${prefix}${encodeURIComponent(term)}`;
    };

    render() {
        const { library_name, prefix, iconClass, linkClass, song_title } = this.props.info;

        return (
            <a 
                key={library_name}
                href={this.buildSearchUrl(prefix, prepareSongTitle(song_title))} 
                className={this.setLinkClasses(linkClass)}
                target="_blank"
                rel="noopener noreferrer">
                <i className={this.setIconClasses(iconClass)}></i>
            </a>
        );
    }
}

MusicLibraryButton.propTypes = {
    info: MusicLibraryButtonType.isRequired
};

export default MusicLibraryButton;
