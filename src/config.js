export default {
    "liveUpdates": true,
    "api": {
        "endpoint": process.env.API_URL || "http://localhost:8080"
    },
    "musicLibraries": {
        "youtube": {
            "prefix": "https://www.youtube.com/results?search_query=",
            "iconClass": "fa-youtube",
            "linkClass": "youtube_link",
        },
        "soundcloud": {
            "prefix": "https://soundcloud.com/search?q=",
            "iconClass": "fa-soundcloud",
            "linkClass": "soundcloud_link",
        }
    }
};
