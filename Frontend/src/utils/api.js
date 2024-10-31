import axios from "axios";

export const getAPI = async (
  BASE_URL = "https://xj9ne7lghe.execute-api.eu-north-1.amazonaws.com",
  endpoint = "/meetups"
) => {
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
