import PropTypes from "prop-types";

export const ChannelType = PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired
});

export const HistoryRecordType = PropTypes.exact({
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    channel_id: PropTypes.number.isRequired,
    song_id: PropTypes.number.isRequired,
    song_title: PropTypes.string.isRequired,
    animate: PropTypes.bool
});

export const MusicLibraryButtonType = PropTypes.exact({
    library_name: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    linkClass: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    song_title: PropTypes.string.isRequired
});
