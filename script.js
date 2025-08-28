const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  resultsDiv.innerHTML = 'Loading...';

  try {
    const res = await fetch(`https://xlorin-com.onrender.com/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.results && data.results.length) {
      resultsDiv.innerHTML = data.results.map(item => `
        <div class="result">
          <h3>${item.title}</h3>
          <p>${item.content}</p>
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
