```python
import polars as pl
import json
import rust_transformer

def process_with_polars(file_path="products_amazon.json"):
    """
    Process data with Polars
    """
    print("⚙️ Processing with Polars...")
    
    # Load data
    with open(file_path, "r") as f:
        data = json.load(f)
    
    df = pl.DataFrame(data)
    
    # Transformations
    result = df.group_by("source").agg([
        pl.col("price").mean().alias("avg_price"),
        pl.col("rating").mean().alias("avg_rating"),
        pl.col("reviews").sum().alias("total_reviews"),
        pl.len().alias("count")
    ])
    
    print("📊 Polars results:")
    print(result)
    
    return result

def process_with_rust(file_path="products_amazon.json"):
    """
    Process data with Rust (ultra-fast)
    """
    print("🦀 Processing with Rust...")
    
    with open(file_path, "r") as f:
        data = json.load(f)
    
    # Convert to Rust format
    products = [
        rust_transformer.Product(
            name=p["name"],
            price=float(p["price"]),
            rating=float(p["rating"])
        )
        for p in data
    ]
    
    # Process
    processed = rust_transformer.process_data(products)
    stats = rust_transformer.calculate_stats(products)
    
    print(f"🦀 Rust results:")
    print(f"  - Average price: ${stats[0]:.2f}")
    print(f"  - Max price: ${stats[1]:.2f}")
    print(f"  - Min price: ${stats[2]:.2f}")
    print(f"  - Total processed: {len(processed)} products")
    
    return processed, stats

if __name__ == "__main__":
    process_with_polars()
    process_with_rust()
```
