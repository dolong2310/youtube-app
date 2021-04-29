import axios from "axios";

const request = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    params: {
        key: "AIzaSyCwC95sRJStBNFOsH185dKJ-Ky45j4mimo",
    },
});

export default request;
