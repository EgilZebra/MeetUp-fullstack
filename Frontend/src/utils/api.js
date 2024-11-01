import axios from "axios";

export const getAPI = async (BASE_URL, endpoint = "/") => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    console.log("URL", url);
    const response = await axios.get(url);
    console.log("response", response);
    const data = response.data.data;

    return data;
  } catch (error) {
    console.error("Error fetching meetups:", error);
  }
};
