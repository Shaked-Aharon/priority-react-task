import { RecentSearches } from "../components/RecentSearches";
import type { Messages } from "../i18n/messages";

type RecentPanelProps = {
  searches: string[];
  messages: Messages;
  onSearch: (term: string) => void;
};

export function RecentPanel({ searches, messages, onSearch }: RecentPanelProps) {
  return (
    <section className="app-region app-region--recent" aria-labelledby="recent-heading">
      <h2 id="recent-heading">{messages.app.recentHeading}</h2>
      <RecentSearches searches={searches} messages={messages.recent} onSearch={onSearch} />
    </section>
  );
}
