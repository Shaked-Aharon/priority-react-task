export const MAX_RECENT_SEARCHES = 5;
export const MIN_SEARCH_TERM_LENGTH = 3;

export function cleanSearchTerm(term: string): string {
  return term.trim();
}

export function isValidSearchTerm(term: string): boolean {
  return cleanSearchTerm(term).length >= MIN_SEARCH_TERM_LENGTH;
}

export function areSameSearchTerm(left: string, right: string): boolean {
  return cleanSearchTerm(left).toLocaleLowerCase() === cleanSearchTerm(right).toLocaleLowerCase();
}

export function addRecentSearch(searches: string[], term: string): string[] {
  const cleanedTerm = cleanSearchTerm(term);

  if (!isValidSearchTerm(cleanedTerm)) {
    return searches;
  }

  const withoutDuplicate = searches.filter((search) => !areSameSearchTerm(search, cleanedTerm));
  return [cleanedTerm, ...withoutDuplicate].slice(0, MAX_RECENT_SEARCHES);
}
