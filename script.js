const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  resultsDiv.innerHTML = 'Loading...';

  try {
    const res = await fetch(`https://xlorin-com.onrender.com/live_search?query=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.results && data.results.length) {
      resultsDiv.innerHTML = data.results.map(item => `
        <div class="result">
          <h3>${item.title} <small>(${item.source || 'Xlorin'})</small></h3>
          <p>${item.content}</p>
          ${item.headings && item.headings.length ? `<p><strong>Headings:</strong> ${item.headings.join(', ')}</p>` : ''}
          ${item.source === 'xlorin' ? `<a href="${item.source}" target="_blank">Read on Xlorin</a>` : ''}
        </div>
      `).join('');
    } else {
      resultsDiv.innerHTML = 'No results found.';
    }
  } catch (err) {
    resultsDiv.innerHTML = 'Error fetching results.';
    console.error(err);
  }
});
