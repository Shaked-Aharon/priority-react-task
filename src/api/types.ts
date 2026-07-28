export type SearchCursor = {
  url: string;
};

export type SoundSearchResult = {
  id: string;
  title: string;
  artist: string;
  url: string;
  imageUrl: string;
};

export type SearchPage = {
  results: SoundSearchResult[];
  nextCursor: SearchCursor | null;
};

export type SearchRequest = {
  query: string;
  cursor?: SearchCursor | null;
  pageSize: number;
  signal: AbortSignal;
};
