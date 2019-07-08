import httpService from "./httpService";
import sseService from "./sseService";

export default {
    getChannels: async () => {
        const { data } = await httpService.get("/channels");
        return data;
    },

    getChannelHistory: async (channelId = 0, offset = 0) => {
        const filters = {};

        if (channelId > 0) {
            filters["channel_id"] = channelId;
        }

        if (offset > 0) {
            filters["offset"] = offset;
        }

        const query_string = Object.keys(filters).map((key) => `${key}=${filters[key]}`).join("&");
        const { data } = await httpService.get(`/history${((query_string) ? "?" + query_string : "")}`);
        return data;
    },

    channelHistoryEvents: (messageCallback, errorCallback = undefined) => {
        return sseService.connect("/history/events", "history", messageCallback, errorCallback);
    }
};
