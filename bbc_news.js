document.addEventListener("DOMContentLoaded", () => {
  const refreshBtn = document.getElementById("refreshBtn");

  function loadNews() {
    fetch("https://exactnews.onrender.com/bbc")
      .then(response => {
        if (!response.ok) throw new Error("Failed to load JSON");
        return response.json();
      })
      .then(data => {
        // Clear previous content
        let existing = document.querySelector(".news-section");
        if (existing) existing.remove();

        // Main container
        const root = document.createElement("div");
        root.className = "news-section";
        document.body.appendChild(root);

        // Grid container
        const container = document.createElement("div");
        container.className = "news-grid";
        root.appendChild(container);

        // Loop through news items
        data.forEach(item => {
          const card = document.createElement("div");
          card.className = "news-card";

          // Thumbnail or fallback
          const image = document.createElement("img");
          image.src = item.image || "https://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif";
          image.alt = "News thumbnail";
          card.appendChild(image);

          // Content block
          const content = document.createElement("div");
          content.className = "news-card-content";

          const title = document.createElement("h2");
          title.textContent = item.title || "Untitled";
          content.appendChild(title);

          const meta = document.createElement("p");
          meta.innerHTML = `<strong>Source:</strong> BBC &nbsp; | &nbsp; <strong>Date:</strong> ${formatDate(item.published)}`;
          content.appendChild(meta);

          const summary = document.createElement("p");
          summary.textContent = item.summary || "No summary available.";
          content.appendChild(summary);

          const link = document.createElement("a");
          link.href = item.link || "#";
          link.textContent = "Read more →";
          link.target = "_blank";
          content.appendChild(link);

          card.appendChild(content);
          container.appendChild(card);
        });
      })
      .catch(error => console.error("Error loading news:", error));
  }

  // Format dates
  function formatDate(raw) {
    if (!raw) return "Unknown";
    const date = new Date(raw);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  // Run once on page load
  loadNews();

  // Auto refresh every 10 minutes (600000 ms)
  setInterval(loadNews, 600000);

  // Manual refresh
  refreshBtn.addEventListener("click", loadNews);
});