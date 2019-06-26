import React, { Component } from "react";
import PropTypes from "prop-types";
import { ChannelType } from "../types";

class ChannelButton extends Component {
    setInputClasses = (selected) => {
        return `btn btn-light ${((selected ? "active" : ""))}`;
    };

    formatButtonText = name => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    render() {
        const { id, name, selected } = this.props.channel;

        return (
            <label 
                className={this.setInputClasses(selected)} 
                key={id} 
                onClick={() => {
                    this.props.onClick(id);
                }}
                >
                <input 
                    type="radio" 
                    name="channel" 
                    id={`channel_${id}`} 
                    autoComplete="off"
                    /> {this.formatButtonText(name)}
            </label>
        );
    }
}

ChannelButton.propTypes = {
    channel: ChannelType.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ChannelButton;
