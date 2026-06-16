```python
from apify_client import ApifyClient
import os
import json
from datetime import datetime

# Configuration
APIFY_API_KEY = os.getenv("APIFY_API_KEY")
client = ApifyClient(APIFY_API_KEY)

def scrape_amazon_products(search_term="wireless headphones", max_pages=2, min_rating=4.5):
    """
    Scrape Amazon products using Apify actor
    """
    print(f"🕷️ Scraping Amazon for: {search_term}")
    
    # Run the actor
    actor = client.actor("delicious_zebu~amazon-product-data-scraper")
    run = actor.call(run_input={
        "search": search_term,
        "maxPages": max_pages,
        "minRating": min_rating
    })
    
    # Collect results
    products = []
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        products.append({
            "name": item.get("title", ""),
            "price": float(item.get("price", "0").replace("$", "").replace(",", "")),
            "rating": float(item.get("rating", 0)),
            "reviews": int(item.get("reviews", 0)),
            "source": "Amazon",
            "scraped_at": datetime.now().isoformat()
        })
    
    print(f"✅ Scraped {len(products)} products")
    
    # Save to file
    with open("products_amazon.json", "w") as f:
        json.dump(products, f, indent=2)
    
    return products

if __name__ == "__main__":
    # Test run
    products = scrape_amazon_products()
    print(f"📊 First product: {products[0]['name']} - ${products[0]['price']}")
```
