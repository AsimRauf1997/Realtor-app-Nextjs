import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_APP_RAPID_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_APP_RAPID_HOST,
    },
  });

  return data;
};
