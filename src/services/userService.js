import httpService from "./httpService";
import utils from "./utils";
import config from "../config";

export default {
    getUser: async () => {
        const { data } = await httpService.get("/user");
        return data;
    },

    deleteBookmark: async (id) => {
        const headers = {"X-Csrf-Token": utils.readCookie(config.csrf_cookie)};
        const { data } = await httpService.delete(`/user/bookmarks/${parseInt(id)}`, {headers});
        return data;
    },

    addBookmark: async (song_id) => {
        const headers = {"X-Csrf-Token": utils.readCookie(config.csrf_cookie)};
        const { data } = await httpService.post("/user/bookmarks", {"song_id": parseInt(song_id)}, {headers});
        return data;
    },

    getBookmarks: async (offset = 0) => {
        const filters = {};

        if (offset > 0) {
            filters["offset"] = offset;
        }

        const query_string = Object.keys(filters).map((key) => `${key}=${filters[key]}`).join("&");
        const { data } = await httpService.get(`/user/bookmarks${((query_string) ? "?" + query_string : "")}`);
        return data;
    },
};
