export function App() {
  return (
    <main className="app-shell">
      <section className="app-region app-region--search" aria-labelledby="search-heading">
        <h1 id="search-heading">Sound Search</h1>
        <p>Search controls and results will appear here.</p>
      </section>

      <section className="app-region app-region--preview" aria-labelledby="preview-heading">
        <h2 id="preview-heading">Image Preview</h2>
        <p>Select a result to preview its artwork.</p>
      </section>

      <section className="app-region app-region--recent" aria-labelledby="recent-heading">
        <h2 id="recent-heading">Recent Searches</h2>
        <p>Your latest searches will appear here.</p>
      </section>
    </main>
  );
}
