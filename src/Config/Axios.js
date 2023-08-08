import axios from "axios";

const instance = axios.create({
    baseURL: "https://web-chat-backend.glitch.me"
});

export default instance;