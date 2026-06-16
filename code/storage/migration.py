```python
import pymysql
import json
import os

def connect_to_tidb():
    """Connect to TiDB Cloud"""
    connection = pymysql.connect(
        host=os.getenv("TIDB_HOST"),
        user=os.getenv("TIDB_USER"),
        password=os.getenv("TIDB_PASSWORD"),
        database=os.getenv("TIDB_DATABASE"),
        port=4000
    )
    return connection

def load_products_to_tidb(file_path="products_amazon.json"):
    """Load scraped products to TiDB"""
    print("🗄️ Loading products to TiDB...")
    
    with open(file_path, "r") as f:
        products = json.load(f)
    
    connection = connect_to_tidb()
    cursor = connection.cursor()
    
    insert_query = """
    INSERT INTO products (name, price, rating, reviews, source, scraped_at)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    
    inserted = 0
    for p in products:
        try:
            cursor.execute(insert_query, (
                p["name"],
                p["price"],
                p["rating"],
                p["reviews"],
                p["source"],
                p["scraped_at"]
            ))
            inserted += 1
        except Exception as e:
            print(f"⚠️ Error inserting {p['name']}: {e}")
    
    connection.commit()
    cursor.close()
    connection.close()
    
    print(f"✅ Inserted {inserted} products into TiDB")

if __name__ == "__main__":
    load_products_to_tidb()
```
