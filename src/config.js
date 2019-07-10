export default {
    "live_updates": true,
    "api": {
        "endpoint": process.env.REACT_APP_API_URL || "http://api.lvh.me:8080"
    },
    "csrf_cookie": "nicecream_history_csrf"
};
