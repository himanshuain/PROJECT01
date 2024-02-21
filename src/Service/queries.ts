/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import axios from "axios";
import { getCinemaPosterUrl } from "./restUrls";

const cache = {};
export const fetchCinemaData = async ({ pageParam, searchInput = "Game of thrones" }) => {
  const pageNum = pageParam.toString();
  if (cache[pageNum]) {
    return cache[pageNum];
  }

  const options = {
    method: "GET",
    url: getCinemaPosterUrl,
    params: {
      title: searchInput,
      limit: "10",
      paginationKey: pageNum,
      sortArg: "moviemeter,asc",
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    // Store the fetched data in the cache
    cache[pageNum] = response.data;

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
