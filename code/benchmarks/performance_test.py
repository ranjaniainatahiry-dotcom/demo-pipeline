```python
import time
import pandas as pd
import polars as pl
import numpy as np
import sys
import os

# Add parent directory to path for Rust import
sys.path.append(os.path.join(os.path.dirname(__file__), '../transformation'))
try:
    import rust_transformer
    RUST_AVAILABLE = True
except ImportError:
    RUST_AVAILABLE = False
    print("⚠️ Rust transformer not available. Run: maturin build --release")

def generate_test_data(n_rows=1_000_000):
    """Generate test data"""
    np.random.seed(42)
    data = {
        'id': range(n_rows),
        'price': np.random.uniform(10, 1000, n_rows),
        'rating': np.random.uniform(1, 5, n_rows),
        'sales': np.random.randint(0, 1000, n_rows)
    }
    return data

def benchmark_pandas(data):
    df = pd.DataFrame(data)
    start = time.time()
    result = df.groupby(pd.cut(df['price'], bins=10)).agg({
        'price': 'mean',
        'rating': 'mean',
        'sales': 'sum'
    })
    return time.time() - start

def benchmark_polars(data):
    df = pl.DataFrame(data)
    start = time.time()
    result = df.with_columns(
        pl.col('price').qcut(10).alias('price_bin')
    ).group_by('price_bin').agg([
        pl.col('price').mean(),
        pl.col('rating').mean(),
        pl.col('sales').sum()
    ])
    return time.time() - start

def benchmark_rust(data):
    if not RUST_AVAILABLE:
        return None
    
    products = [
        rust_transformer.Product(
            name=f"Product_{i}",
            price=data['price'][i],
            rating=data['rating'][i]
        )
        for i in range(len(data['price']))
    ]
    
    start = time.time()
    rust_transformer.process_data(products)
    return time.time() - start

if __name__ == "__main__":
    print("🚀 Performance Benchmarks\n")
    print("| Rows | Pandas | Polars | Rust | Speedup |")
    print("|------|--------|--------|------|---------|")
    
    for size in [100_000, 500_000, 1_000_000]:
        print(f"Generating {size:,} rows...")
        data = generate_test_data(size)
        
        pandas_time = benchmark_pandas(data)
        polars_time = benchmark_polars(data)
        rust_time = benchmark_rust(data)
        
        if rust_time:
            speedup = pandas_time / rust_time
            print(f"| {size:,} | {pandas_time:.2f}s | {polars_time:.2f}s | {rust_time:.2f}s | {speedup:.1f}x |")
        else:
            print(f"| {size:,} | {pandas_time:.2f}s | {polars_time:.2f}s | N/A | N/A |")
```
