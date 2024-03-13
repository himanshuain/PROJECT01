/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import axios from "axios";
import { anilistUrl, getCinemaPosterUrl } from "./restUrls";
import { anilistInfoQuery } from "./queryConstants";
import { useQuery } from "react-query";

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

// Set up the request configuration
const graphqlQueryOptions = (id: number) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: anilistInfoQuery,
      variables: { id: id },
    }),
  };
};

const animeInfo = async (id: number | null) => {
  if (!id) return null;
  const options = graphqlQueryOptions(id);
  try {
    const response = await fetch(anilistUrl, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useAnimeInfo = (id: number | null) =>
  useQuery(["animeInfo", id], () => animeInfo(id), {
    enabled: false,
    retry: false,
    cacheTime: 60 * 1000,
  });

export const getApiQuota = async () => {
  await fetch("https://api.trace.moe/me");
};

const extractAnimeUsingUrl = async imageUrl => {
  if (imageUrl) {
    const apiStartTime = new Date();
    try {
      const response = await axios(
        `https://api.trace.moe/search?cutBorders&anilistInfo&url=${encodeURIComponent(imageUrl)}`
      );
      const apiFinishTime = new Date();
      const apiTookTime = apiFinishTime - apiStartTime;
      // console.log("API took", apiTookTime / 1000, "seconds", "response for url", response);
      return {
        data: response.data,
        tookTime: apiTookTime / 1000,
      };
    } catch (error) {
      // console.log("Error occurred while fetching data:", error.response.data.error);
      return {
        error: error.response.data.error,
      };
    }
  }
};

export const useExtractAnimeUsingUrlQuery = (imageUrl: string) =>
  useQuery(["extractAnimeUsingUrl", imageUrl], () => extractAnimeUsingUrl(imageUrl), {
    cacheTime: 60 * 1000 * 4.5, // Keeping the cache for 4.5 minutes as after this, urls expire
    // retry: 1,
    enabled: false,
    retry: false, // Disable automatic retries for failed requests
  });

const extractAnimeUsingMediaUpload = async file => {
  if (!file) {
    console.error("No file selected.");
    return;
  }

  // Check if file size is under 25MB
  if (file.size > 25 * 1024 * 1024) {
    console.error("File size exceeds 25MB limit.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("image", file);
    const apiStartTime = new Date();

    const response = await axios("https://api.trace.moe/search?cutBorders&anilistInfo", {
      method: "POST",
      data: formData,
    });

    if (!response) {
      throw new Error("Failed to upload file.");
    }

    // const data = await JSON.parse(response);
    const apiFinishTime = new Date();
    const apiTookTime = apiFinishTime - apiStartTime;
    console.log("API took", apiTookTime / 1000, "seconds");
    // console.log(response); // Handle response data here
    return {
      data: response,
      tookTime: apiTookTime / 1000,
    };
  } catch (error) {
    // console.log("Error uploading file:", error);
    return {
      error: error.response.data.error || "Failed to upload file.",
    };
  }
};

export const useExtractAnimeUsingMediaUploadQuery = (file: File | null) =>
  useQuery(["extractAnimeUsingMediaUpload", file], () => extractAnimeUsingMediaUpload(file), {
    cacheTime: 60 * 1000 * 4.5, // Keeping the cache for 4.5 minutes as after this, urls expire
    enabled: false,
    retry: false, // Disable automatic retries for failed requests
  });
