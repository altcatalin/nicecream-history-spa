import React, { Component } from "react";
import PropTypes from "prop-types";

class ChannelButton extends Component {
    setInputClasses = (selected) => {
        return `btn btn-light ${((selected ? "active" : ""))}`;
    };

    formatButtonText = name => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    render() {
        const { id, name, selected, onClick } = this.props;

        return (
            <label 
                className={this.setInputClasses(selected)} 
                key={id} 
                onClick={() => { onClick(id); }}
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ChannelButton;
