import type { SoundProvider } from "./soundProvider";
import type { SearchCursor, SearchPage, SearchRequest, SoundSearchResult } from "./types";

const MIXCLOUD_SEARCH_URL = "https://api.mixcloud.com/search/";
const DEFAULT_IMAGE_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Crect width='640' height='640' fill='%23dce7e0'/%3E%3Cpath d='M160 382c72-92 118-112 170-50 32 38 55 48 92 8 20-21 39-49 58-80v196H160v-74z' fill='%2390a89a'/%3E%3Ccircle cx='250' cy='224' r='46' fill='%23b7c9bf'/%3E%3C/svg%3E";

type MixcloudPictureMap = {
  "640wx640h"?: string;
  "320wx320h"?: string;
  large?: string;
  medium?: string;
  small?: string;
  thumbnail?: string;
};

type MixcloudUser = {
  name?: string;
  username?: string;
};

type MixcloudCloudcast = {
  key?: string;
  name?: string;
  url?: string;
  pictures?: MixcloudPictureMap;
  user?: MixcloudUser;
};

type MixcloudSearchResponse = {
  data?: MixcloudCloudcast[];
  paging?: {
    next?: string;
  };
};

export const mixcloudProvider: SoundProvider = {
  async search(request: SearchRequest): Promise<SearchPage> {
    const url = request.cursor ? new URL(request.cursor.url) : buildSearchUrl(request);
    const response = await fetch(url, { signal: request.signal });

    if (!response.ok) {
      throw new Error(`Mixcloud search failed with status ${response.status}`);
    }

    const payload = (await response.json()) as MixcloudSearchResponse;

    return {
      results: (payload.data ?? []).map(mapCloudcast),
      nextCursor: toCursor(payload.paging?.next)
    };
  }
};

function buildSearchUrl({ query, pageSize }: SearchRequest): URL {
  const url = new URL(MIXCLOUD_SEARCH_URL);
  const params = new URLSearchParams({
    q: query,
    type: "cloudcast",
    limit: String(pageSize)
  });
  url.search = params.toString();
  return url;
}

function mapCloudcast(cloudcast: MixcloudCloudcast): SoundSearchResult {
  const url = cloudcast.url ?? "https://www.mixcloud.com/";
  const title = cloudcast.name?.trim() || "Untitled mix";
  const artist = cloudcast.user?.name?.trim() || cloudcast.user?.username?.trim() || "Unknown creator";

  return {
    id: cloudcast.key ?? url,
    title,
    artist,
    url,
    imageUrl: pickImage(cloudcast.pictures),
    embedUrl: buildEmbedUrl(url)
  };
}

function pickImage(pictures: MixcloudPictureMap | undefined): string {
  return (
    pictures?.["640wx640h"] ??
    pictures?.["320wx320h"] ??
    pictures?.large ??
    pictures?.medium ??
    pictures?.small ??
    pictures?.thumbnail ??
    DEFAULT_IMAGE_URL
  );
}

function toCursor(url: string | undefined): SearchCursor | null {
  return url ? { url } : null;
}

function buildEmbedUrl(url: string): string {
  const embedUrl = new URL("https://www.mixcloud.com/widget/iframe/");
  embedUrl.searchParams.set("hide_cover", "1");
  embedUrl.searchParams.set("mini", "1");
  embedUrl.searchParams.set("feed", url);
  return embedUrl.toString();
}
