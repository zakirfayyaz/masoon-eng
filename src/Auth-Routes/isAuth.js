import api_link from "../config.json";
import axios from "axios";

const helpers = {
  helper1: async function () {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(api_link.API_LINK + "user/message", {
        header: { Authorization: token },
      });
      return true;
    } catch (err) {
      return false;
    }
  },
};
export default helpers;
