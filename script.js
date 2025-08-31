const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  resultsDiv.innerHTML = 'Loading...';

  try {
    const url = `https://xlorin-com.onrender.com/live_search?query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text(); // helps debug if server returns HTML
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 120)}...`);
    }

    const data = await res.json();

    if (data.results && data.results.length) {
      resultsDiv.innerHTML = data.results.map(item => {
        const title = item.title || query;
        // your API may return `content` (local/Wiki scrape) or `summary` (if you switch to REST summary)
        const summary = item.summary || item.content || 'No summary available.';
        const source = item.source || 'Xlorin';
        const link = item.source && item.source.startsWith('http')
          ? `<div><a href="${item.source}" target="_blank" rel="noopener">Source</a></div>`
          : '';

        const headings = Array.isArray(item.headings) && item.headings.length
          ? `<div><strong>Headings:</strong> ${item.headings.join(', ')}</div>`
          : '';

        return `
          <div class="result">
            <h3>${title} <small>(${source})</small></h3>
            <p>${summary}</p>
            ${headings}
            ${link}
          </div>
        `;
      }).join('');
    } else {
      resultsDiv.innerHTML = 'No results found.';
    }
  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = 'Error fetching results.';
  }
});
