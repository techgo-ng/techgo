import feedparser
import json
import os
from flask import Flask, jsonify

# 1. FETCH AND SAVE THE BBC FEED
rss_url = "http://feeds.bbci.co.uk/news/world/rss.xml"
feed = feedparser.parse(rss_url)

news_items = []
for entry in feed.entries:
    item = {
        "title": entry.title,
        "link": entry.link,
        "published": entry.get("published", ""),
        "summary": entry.get("summary", ""),
    }

    if "media_thumbnail" in entry and entry.media_thumbnail:
        item["image"] = entry.media_thumbnail[0]["url"]
    elif "enclosures" in entry and entry.enclosures:
        item["image"] = entry.enclosures[0]["href"]

    news_items.append(item)

# Save to JSON
with open("bbc_news.json", "w", encoding="utf-8") as f:
    json.dump(news_items, f, ensure_ascii=False, indent=4)

print("✅ BBC feed saved to bbc_news.json")

# 2. CREATE FLASK APP TO SERVE JSON
app = Flask(__name__)

@app.route("/bbc")
def serve_bbc_news():
    try:
        with open("bbc_news.json", "r", encoding="utf-8") as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "bbc_news.json not found"}), 404

# 3. RUN THE FLASK SERVER
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)