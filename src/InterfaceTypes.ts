export type data = {
  anilist: {
    id: number;
    isAdult: boolean;
    title: {
      romaji: string;
      native: string;
      english: string;
    };
    image: string;
    similarity: number;
    video: string;
  };
}[];

export type graphQLAnimeInfoProps = {
  isAdult: boolean;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  bannerImage: string;
  coverImage: {
    large: string;
  };
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
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
