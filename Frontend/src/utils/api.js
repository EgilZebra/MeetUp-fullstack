import axios from "axios";

export const getAPI = async (
  BASE_URL = "https://glgh7httw0.execute-api.eu-north-1.amazonaws.com",
  endpoint = "/"
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
