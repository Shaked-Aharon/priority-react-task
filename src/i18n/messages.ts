export type Language = "en" | "he";
export type Direction = "ltr" | "rtl";

export const LANGUAGES = ["en", "he"] as const;

export const languageDirections: Record<Language, Direction> = {
  en: "ltr",
  he: "rtl"
};

export const messages = {
  en: {
    app: {
      title: "Sound Search",
      previewHeading: "Image Preview",
      recentHeading: "Recent Searches"
    },
    language: {
      label: "Language",
      english: "English",
      hebrew: "Hebrew"
    },
    theme: {
      label: "Theme preference",
      system: "System",
      light: "Light",
      dark: "Dark"
    },
    settings: {
      trigger: "Settings",
      title: "Settings",
      languageLabel: "Language",
      themeLabel: "Theme",
      close: "Close",
      english: "English",
      hebrew: "Hebrew",
      system: "System",
      light: "Light",
      dark: "Dark"
    },
    searchBar: {
      label: "Search Mixcloud",
      placeholder: "Try jazz, techno, soul...",
      submit: "Search"
    },
    viewMode: {
      label: "Result view mode",
      list: "List",
      tile: "Tile"
    },
    results: {
      defaultLabel: "Search results",
      label: (query: string) => `Results for ${query}`,
      idleTitle: "Ready when you are",
      idleMessage: "Enter a search term to browse Mixcloud cloudcasts.",
      tooShortTitle: "Keep typing",
      tooShortMessage: (minLength: number) => `Search terms need at least ${minLength} characters.`,
      errorTitle: "Search failed",
      errorMessage: "Search failed. Please try again.",
      retry: "Retry",
      emptyTitle: "No results",
      emptyMessage: (query: string) => `No cloudcasts matched "${query}".`,
      searching: (query: string) => (query ? `Searching for ${query}.` : "Searching."),
      loadingLabel: "Loading search results"
    },
    pagination: {
      label: "Search result pages",
      previous: "Previous",
      next: "Next",
      previousLabel: "Load previous result page",
      nextLabel: "Load next result page"
    },
    recent: {
      empty: "No recent searches yet.",
      label: "Recent searches"
    },
    preview: {
      selectedLabel: (title: string, artist: string) => `Selected result: ${title} by ${artist}`,
      emptyLabel: "No result selected",
      openPlayer: (title: string) => `Open player for ${title}`,
      placeholder: "Select a result to preview its artwork."
    },
    player: {
      label: "Selected track player",
      title: (title: string) => `Mixcloud player for ${title}`
    }
  },
  he: {
    settings: {
      trigger: "׳”׳’׳“׳¨׳•׳×",
      title: "׳”׳’׳“׳¨׳•׳×",
      languageLabel: "׳©׳₪׳”",
      themeLabel: "׳¢׳¨׳›׳× ׳ ׳•׳©׳",
      close: "׳¡׳’׳™׳¨׳”",
      english: "English",
      hebrew: "׳¢׳‘׳¨׳™׳×",
      system: "׳׳¢׳¨׳›׳×",
      light: "׳‘׳”׳™׳¨",
      dark: "׳›׳”׳”"
    },
    app: {
      title: "חיפוש סאונד",
      previewHeading: "תצוגת תמונה",
      recentHeading: "חיפושים אחרונים"
    },
    language: {
      label: "שפה",
      english: "English",
      hebrew: "עברית"
    },
    theme: {
      label: "העדפת ערכת נושא",
      system: "מערכת",
      light: "בהיר",
      dark: "כהה"
    },
    searchBar: {
      label: "חיפוש ב-Mixcloud",
      placeholder: "נסו jazz, techno, soul...",
      submit: "חיפוש"
    },
    viewMode: {
      label: "תצוגת תוצאות",
      list: "רשימה",
      tile: "אריחים"
    },
    results: {
      defaultLabel: "תוצאות חיפוש",
      label: (query: string) => `תוצאות עבור ${query}`,
      idleTitle: "מוכן כשאתם מוכנים",
      idleMessage: "הזינו מונח חיפוש כדי לעיין ב-cloudcasts ב-Mixcloud.",
      tooShortTitle: "המשיכו להקליד",
      tooShortMessage: (minLength: number) => `מונחי חיפוש צריכים לפחות ${minLength} תווים.`,
      errorTitle: "החיפוש נכשל",
      errorMessage: "החיפוש נכשל. נסו שוב.",
      retry: "נסו שוב",
      emptyTitle: "אין תוצאות",
      emptyMessage: (query: string) => `לא נמצאו cloudcasts שתואמים ל-"${query}".`,
      searching: (query: string) => (query ? `מחפש את ${query}.` : "מחפש."),
      loadingLabel: "טוען תוצאות חיפוש"
    },
    pagination: {
      label: "עמודי תוצאות חיפוש",
      previous: "הקודם",
      next: "הבא",
      previousLabel: "טעינת עמוד התוצאות הקודם",
      nextLabel: "טעינת עמוד התוצאות הבא"
    },
    recent: {
      empty: "עדיין אין חיפושים אחרונים.",
      label: "חיפושים אחרונים"
    },
    preview: {
      selectedLabel: (title: string, artist: string) => `תוצאה נבחרת: ${title} מאת ${artist}`,
      emptyLabel: "לא נבחרה תוצאה",
      openPlayer: (title: string) => `פתיחת נגן עבור ${title}`,
      placeholder: "בחרו תוצאה כדי להציג את התמונה שלה."
    },
    player: {
      label: "נגן הטראק שנבחר",
      title: (title: string) => `נגן Mixcloud עבור ${title}`
    }
  }
} as const;

export type Messages = (typeof messages)[Language];
