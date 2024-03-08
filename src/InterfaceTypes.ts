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
