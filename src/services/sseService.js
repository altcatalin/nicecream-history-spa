import { toast } from "react-toastify";
import logger from "./loggerService";
import config from "../config";

export default {
    connect: (path, eventName, messageCallback, errorCallback = undefined) => {
        const sse = new EventSource(`${config.api.endpoint}${path}`);
        sse.addEventListener(eventName, messageCallback);
        sse.addEventListener("error", async (event) => {
            logger.log(event);
            toast.error("Network Error");

            if (errorCallback !== undefined) {
                await errorCallback();
            }
        });

        return sse;
    }
}
