document.addEventListener("DOMContentLoaded", () => {
  const refreshBtn = document.getElementById("refreshBtn");

  function loadNews() {
    fetch("bbc_news.json")
      .then(response => {
        if (!response.ok) throw new Error("Failed to load JSON");
        return response.json();
      })
      .then(data => {
        // Clear previous content
        let existing = document.querySelector(".news-section");
        if (existing) existing.remove();

        // Create main container
        const root = document.createElement("div");
        root.className = "news-section";
        document.body.appendChild(root);

        // Heading
        const heading = document.createElement("h1");
        heading.textContent = "📰 Top Stories - BBC News";
        root.appendChild(heading);

        // Grid container
        const container = document.createElement("div");
        container.className = "news-grid";
        root.appendChild(container);

        // Loop through each news item
        data.forEach(item => {
          const card = document.createElement("div");
          card.className = "news-card";

          // 🖼 Image
          const image = document.createElement("img");
          image.src = item.image || "https://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif";
          image.alt = "News thumbnail";
          card.appendChild(image);

          // 📄 Content
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

  // Format the date
  function formatDate(raw) {
    if (!raw) return "Unknown";
    const date = new Date(raw);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  // Run when page loads
  loadNews();

  // Refresh every 10 minutes
  setInterval(loadNews, 600000);

  // Manual refresh on button click
  refreshBtn.addEventListener("click", loadNews);
});