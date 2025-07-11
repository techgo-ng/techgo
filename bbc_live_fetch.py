from flask import Flask, jsonify
import feedparser
import os

app = Flask(__name__)

@app.route("/bbc")
def get_bbc_feed():
    try:
        feed_url = "http://feeds.bbci.co.uk/news/rss.xml"
        feed = feedparser.parse(feed_url)

        news_items = []
        for entry in feed.entries[:10]:
            news_items.append({
                "title": entry.title,
                "link": entry.link,
                "published": entry.published if 'published' in entry else "N/A",
                "summary": entry.summary if 'summary' in entry else "No summary available"
            })

        return jsonify(news_items)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3000))  # ✅ Auto-assign port (Render, Replit, etc.)
    app.run(host="0.0.0.0", port=port)