type dateType = {
  year: number;
  month: number;
  day: number;
};

export type graphQLAnimeInfoProps = {
  isAdult: boolean;
  title: Title;
  bannerImage: string;
  coverImage: {
    large: string;
  };
  startDate: dateType;
  endDate: dateType;
  episodes: number;
  status: string;
  externalLinks: {
    url: string;
    site: string;
    id: number;
  }[];
  genres: string[];
  siteUrl: string;
};

export interface Data {
  frameCount: number | null;
  error?: string;
  apiTookTime?: number | undefined;
  result: Result[];
}

export interface Result {
  anilist: Anilist;
  filename: string;
  episode: number;
  from: number;
  to: number;
  similarity: number;
  video: string;
  image: string;
}

export interface Anilist {
  id: number;
  idMal: number;
  title: Title;
  synonyms: string[];
  isAdult: boolean;
}

export interface Title {
  native: string;
  romaji: string;
  english: null | string;
}
