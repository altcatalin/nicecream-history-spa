import React, { Component } from "react";
import ChannelButton from "./channelButton";
import HistoryRecord from "./historyRecord";
import historyService from "../services/historyService";
import config from "../config";

class History extends Component {
    state = {
        channels: [],
        content: [],
        events: {
            status: config.liveUpdates,
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
        
        this.setState({ channels });
    }

    async componentWillUnmount() {
        const { status: eventsStatus, source: eventsSource } = this.state.events;

        if (eventsStatus === false && eventsSource !== undefined) {
            this.closeEventUpdate();
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        const prevChannel = prevState.channels.filter(channel => channel.selected === true)[0]
        const currChannel = this.state.channels.filter(channel => channel.selected === true)[0]

        if (prevChannel === undefined || prevChannel.id !== currChannel.id) {
            const content = await historyService.getChannelHistory(currChannel.id);
            await this.updateChannelHistory(content, true);
        }

        const { status: eventsStatus, source: eventsSource } = this.state.events;

        if (eventsStatus === true && eventsSource === undefined) {
            this.initEventUpdate();
        }

        if (eventsStatus === false && eventsSource !== undefined) {
            this.closeEventUpdate();
        }
    }

    async updateChannelHistory(newContent, replace = false, append = true) {
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

    toggleEventUpdate = async () => {
        const { status: prevStatus } = this.state.events;
        const currStatus = !prevStatus;

        if (currStatus === true) {
            this.initEventUpdate(currStatus);
        } else {
            this.closeEventUpdate(currStatus);
        }
    }

    handleEventUpdate = async event => {
        const data = JSON.parse(event.data)
        const currChannel = this.state.channels.filter(channel => channel.selected === true)[0]

        if (currChannel.id === 0 || currChannel.id === data.channel_id) {
            await this.updateChannelHistory([data], false, false);
        }
    }

    handleEventUpdateError = async () => {
        this.closeEventUpdate(false);
    }

    initEventUpdate = (status = undefined) => {
        const newStatus = (status !== undefined) ? status : this.state.events.status;
        const source = historyService.channelHistoryEvents(this.handleEventUpdate, this.handleEventUpdateError);
        this.setState({ events: { status: newStatus, source: source } });
    }

    closeEventUpdate = (status = undefined) => {
        const newStatus = (status !== undefined) ? status : this.state.events.status;
        this.state.events.source.close();
        this.setState({ events: { status: newStatus, source: undefined } });
    }

    render() {
        const { channels, content, events } = this.state;

        return (
            <React.Fragment>
                <main role="main" className="flex-shrink-0">
                    <div className="container my-3">
                        <div className="media mt-3 mb-5">
                            <h3>History</h3>
                            <div className="pt-2 ml-2 flex-grow-1">
                                <div className="form-check form-check-inline float-right">
                                    <div className="custom-control custom-switch mr-3">
                                        <input
                                            type="checkbox"
                                            defaultChecked={events.status}
                                            className="custom-control-input form-control form-control-sm" id="live_updates"
                                            onChange={this.toggleEventUpdate}
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
                                                    channel={channel}
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
                                <HistoryRecord
                                    key={record.id}
                                    record={record}
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

export default History;
