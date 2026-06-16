```python
# Apache Superset Configuration

"""
Configuration for connecting Superset to TiDB Cloud

1. Install Superset:
   pip install apache-superset

2. Set environment variables:
   export SUPERSET__SQLALCHEMY_DATABASE_URI="mysql+pymysql://user:password@host:4000/db"

3. Initialize:
   superset db upgrade
   superset init

4. Run:
   superset run -p 8088
"""

# Connection string for TiDB Cloud
DATABASE_URI = "mysql+pymysql://tPRQAdHJyvXaqWr.root:eov6Dp6nVguQvrRI@gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com:4000/sys"

# Dashboard configuration
DASHBOARD_CONFIG = {
    "name": "E-commerce Market Intelligence",
    "description": "Real-time product analytics from Amazon and TikTok",
    "charts": [
        {
            "name": "Price Trends",
            "type": "line",
            "query": """
                SELECT 
                    DATE(scraped_at) as date,
                    AVG(price) as avg_price
                FROM products
                GROUP BY DATE(scraped_at)
            """
        },
        {
            "name": "Top Products",
            "type": "bar",
            "query": """
                SELECT name, rating, reviews
                FROM products
                ORDER BY rating DESC
                LIMIT 10
            """
        },
        {
            "name": "Rating Distribution",
            "type": "pie",
            "query": """
                SELECT 
                    CASE 
                        WHEN rating >= 4.5 THEN '⭐ 5'
                        WHEN rating >= 4.0 THEN '⭐ 4'
                        WHEN rating >= 3.0 THEN '⭐ 3'
                        ELSE '⭐ <3'
                    END as rating_group,
                    COUNT(*) as count
                FROM products
                GROUP BY rating_group
            """
        }
    ]
}
```
