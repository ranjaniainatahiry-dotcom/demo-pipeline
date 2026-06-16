```python
from groq import Groq
import json
import os

def analyze_with_groq(products_file="products_amazon.json"):
    """
    Analyze product data with GROQ
    """
    print("🤖 Analyzing data with GROQ...")
    
    # Load data
    with open(products_file, "r") as f:
        products = json.load(f)
    
    # Prepare summary
    summary = {
        "total_products": len(products),
        "avg_price": sum(p["price"] for p in products) / len(products),
        "max_price": max(p["price"] for p in products),
        "min_price": min(p["price"] for p in products),
        "avg_rating": sum(p["rating"] for p in products) / len(products),
        "top_products": sorted(products, key=lambda x: x["rating"], reverse=True)[:5]
    }
    
    # GROQ API call
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    
    response = client.chat.completions.create(
        model="mixtral-8x7b-32768",
        messages=[
            {
                "role": "system",
                "content": """You are a market intelligence analyst. Analyze the e-commerce data and provide:
                1. 3 key trends
                2. 3 actionable recommendations
                3. 1 critical alert
                Format as JSON with keys: trends, recommendations, alerts"""
            },
            {
                "role": "user",
                "content": json.dumps(summary, indent=2)
            }
        ],
        temperature=0.3,
        max_tokens=500
    )
    
    insights = json.loads(response.choices[0].message.content)
    
    print("\n📊 GROQ Insights:")
    print(f"  Trends: {insights.get('trends', [])}")
    print(f"  Recommendations: {insights.get('recommendations', [])}")
    print(f"  Alerts: {insights.get('alerts', [])}")
    
    # Save insights
    with open("insights.json", "w") as f:
        json.dump(insights, f, indent=2)
    
    return insights

if __name__ == "__main__":
    analyze_with_groq()
```
