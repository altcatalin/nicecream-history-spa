import React, { Component } from "react";
import ChannelButton from "./channelButton";
import HistoryItem from "./historyItem";
import historyService from "../services/historyService";
import config from "../config";
import PropTypes from "prop-types";
import userService from "../services/userService";
import logger from "../services/loggerService";

class History extends Component {
    state = {
        channels: [],
        content: [],
        events: {
            status: false,
            source: undefined
        }
    };

    async componentDidMount() {
        let channels = [{
            id: 0,
            name: "all",
            url: "",
            selected: false
        }, ...await historyService.getChannels()];

        channels = channels.map((channel, id) => {
            channel.selected = (id === 0) ? true : false;
            return channel;
        });
        
        this.setState({ channels, events: { status: config.live_updates } });
    }

    async componentWillUnmount() {
        await this.toggleEventStream(false);
    }

    async componentDidUpdate(prevProps, prevState) {
        const prevChannel = prevState.channels.filter(channel => channel.selected === true)[0]
        const currChannel = this.state.channels.filter(channel => channel.selected === true)[0]

        if (prevChannel === undefined || prevChannel.id !== currChannel.id) {
            const content = await historyService.getChannelHistory(currChannel.id);
            await this.updateChannelHistory(content, true);
        }

        await this.toggleEventStream(this.state.events.status);
    }

    updateChannelHistory = async (newContent, replace = false, append = true) => {
        if (replace === false) {
            const currContent = JSON.parse(JSON.stringify(this.state.content))

            if (append === true) {
                newContent = [...currContent, ...newContent];
            } else {
                newContent = [...newContent, ...currContent];

                // on prepend animate first record
                newContent = newContent.map((record, index) => {
                    record["animate"] = (index === 0) ? true : false;
                    return record;
                });
            }
        }

        this.setState({ content: newContent });
    }

    handleChannelChange = id => {
        const currChannels = JSON.parse(JSON.stringify(this.state.channels))
        const channels = currChannels.map((channel) => {
            channel.selected = (channel.id === id) ? true : false;
            return channel;
        });

        this.setState({ channels });
    };

    handleMoreClick = async () => {
        const currContent = JSON.parse(JSON.stringify(this.state.content))
        const currChannel = this.state.channels.filter(channel => channel.selected === true)[0]
        const content = await historyService.getChannelHistory(currChannel.id, currContent.length);
        await this.updateChannelHistory(content)
    };

    toggleEventStream = async (newStatus = undefined) => {
        const { status: currStatus, source: currSource } = this.state.events;
        newStatus = (newStatus !== undefined) ? newStatus : !currStatus;

        if (newStatus === true) {
            if (currSource === undefined) {
                const source = historyService.channelHistoryEvents(this.handleEventStreamMessage, this.handleEventStreamError);
                logger.log("Live updates ON");
                this.setState({ events: { status: newStatus, source } });
            }
        } else {
            if (currSource !== undefined) {
                currSource.close();
                logger.log("Live updates OFF");
                this.setState({ events: { status: newStatus, source: undefined } });
            }
        }
    };

    handleEventStreamMessage = async event => {
        const data = JSON.parse(event.data)
        const currChannel = this.state.channels.filter(channel => channel.selected === true)[0]

        if (currChannel.id === 0 || currChannel.id === data.channel_id) {
            await this.updateChannelHistory([data], false, false);
        }
    };

    handleEventStreamError = async () => {
        await this.toggleEventStream(false);
    };

    handleBookmark = async (song_id, bookmark_id) => {
        const currContent = JSON.parse(JSON.stringify(this.state.content))
        const { signedIn } = this.props;

        if (signedIn) {
            if (bookmark_id) {
                await userService.deleteBookmark(bookmark_id);
                const content = currContent.map(song => {
                    if (song["bookmark_id"] === bookmark_id) {
                        song["bookmark_id"] = 0;
                    }

                    return song;
                });

                this.setState({ content });
            } else {
                const data = await userService.addBookmark(song_id);
                const content = currContent.map(song => {
                    if (song["song_id"] === song_id) {
                        song["bookmark_id"] = data["id"];
                    }

                    return song;
                });
                
                this.setState({ content });
            }
        }
    };

    render() {
        const { channels, content, events } = this.state;
        const { signedIn } = this.props;

        return (
            <React.Fragment>
                <main role="main" className="flex-shrink-0">
                    <div className="container my-3">
                        <div className="media mt-3 mb-5">
                            <h3>History</h3>
                            <div className="pt-2 ml-2 flex-grow-1">
                                <div className="form-check form-check-inline float-right mr-0">
                                    <div className="custom-control custom-switch mr-3">
                                        <input
                                            type="checkbox"
                                            value={events.status}
                                            checked={events.status}
                                            className="custom-control-input form-control form-control-sm" id="live_updates"
                                            onChange={() => {
                                                this.toggleEventStream();
                                            }}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="live_updates">
                                            Live updates
                                        </label>
                                    </div>
                                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                        {channels.map(channel => {
                                            return (
                                                <ChannelButton 
                                                    key={channel.id} 
                                                    id={channel.id} 
                                                    name={channel.name} 
                                                    selected={channel.selected} 
                                                    onClick={this.handleChannelChange}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {content.map((record, index) => {
                            return (
                                <HistoryItem
                                    key={record.id}
                                    id={record.id} 
                                    created_at={record.created_at} 
                                    song_id={record.song_id} 
                                    song_title={record.song_title} 
                                    bookmark_id={record.bookmark_id} 
                                    signedIn={signedIn}
                                    onBookmarkChange={this.handleBookmark}
                                />
                            );
                        })}

                        <small className="d-block text-center mt-5">
                            <button type="button" className="btn btn-light" onClick={() => this.handleMoreClick()}>
                                More
                            </button>
                        </small>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

History.propTypes = {
    signedIn: PropTypes.bool.isRequired
};

export default History;
