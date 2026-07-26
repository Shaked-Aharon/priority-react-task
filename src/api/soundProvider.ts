import type { SearchPage, SearchRequest } from "./types";

export interface SoundProvider {
  search(request: SearchRequest): Promise<SearchPage>;
}
