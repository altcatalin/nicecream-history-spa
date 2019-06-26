import React, { Component } from "react";
import { HistoryRecordType } from "../types";
import MusicLibraryButton from "./musicLibraryButton";
import config from "../config";
import { prepareSongTitle } from "../utils";

class HistoryRecord extends Component {
    setContainerClasses = (animate) => {
        return `media media-song mb-2 ${((animate && document["hidden"] === false) ? "fade-in" : "")}`;
    };

    buildYoutubeSearchUrl = term => {
        return `${config.youtube.prefix}${encodeURIComponent(term)}`;
    };

    buildSoundCloudSearchUrl = term => {
        return `${config.soundcloud.prefix}${encodeURIComponent(term)}`;
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
        const { id, song_title, created_at, animate } = this.props.record;

        return (
            <React.Fragment>
                <div className={this.setContainerClasses(animate)} key={id}>
                    <p className="media-body">
                        <span className="d-block text-gray-dark">{prepareSongTitle(song_title)}</span>
                        {Object.keys(config.musicLibraries).map(library_name => {
                            const info = {
                                library_name: library_name,
                                song_title: song_title,
                                ...config.musicLibraries[library_name]
                            }

                            return (
                                <MusicLibraryButton 
                                    key={library_name} 
                                    info={info}
                                />
                            );
                        })}
                        <small className="text-muted">{this.formatTime(created_at)}</small>
                    </p>
                </div>
            </React.Fragment>
        );
    }
}

HistoryRecord.propTypes = {
    record: HistoryRecordType.isRequired
};

export default HistoryRecord;
