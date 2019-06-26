import axios from "axios";
import { toast } from "react-toastify";
import logger from "./loggerService";
import config from "../config";

axios.defaults.baseURL = config.api.endpoint;

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
        toast.error(error.message);
    }

    return Promise.reject(error);
});

export default {
    get: axios.get
};
