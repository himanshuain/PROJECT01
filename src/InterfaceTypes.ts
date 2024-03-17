type isAdult = boolean;
type animeTitle = {
  romaji: string;
  english: string;
  native: string;
};
type url = string;
type id = number;
type dateType = {
  year: number;
  month: number;
  day: number;
};

export type data = {
  anilist: {
    id: id;
    isAdult: isAdult;
    title: animeTitle;
    image: url;
    similarity: number;
    video: url;
  };
}[];

export type graphQLAnimeInfoProps = {
  isAdult: isAdult;
  title: animeTitle;
  bannerImage: url;
  coverImage: {
    large: url;
  };
  startDate: dateType;
  endDate: dateType;
  episodes: number;
  status: string;
  externalLinks: {
    url: url;
    site: url;
    id: id;
  }[];
  genres: string[];
  siteUrl: url;
};
