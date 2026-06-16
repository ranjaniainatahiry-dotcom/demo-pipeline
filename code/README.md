# Pipeline Code – E-commerce Data Pipeline

Complete source code for the E-commerce data pipeline.

## 📁 Structure

```

code/
├── scraping/          # Web scrapers (Apify, Playwright)
├── transformation/    # Rust + Polars processing
├── storage/           # TiDB Cloud schemas
├── ai_analysis/       # GROQ AI analysis
├── dashboard/         # Superset configuration
└── benchmarks/        # Performance tests

```

## 🔧 Installation

```bash
# Install Python dependencies
pip install -r code/scraping/requirements.txt

# Install Rust module
cd code/transformation/rust_transformer
maturin build --release
pip install target/wheels/*.whl

# Configure environment variables
cp .env.example .env
# Edit .env with your API keys
```

🚀 Usage

```bash
# 1. Scrape data
python code/scraping/apify_scraper.py

# 2. Transform with Rust
python code/transformation/polars_processor.py

# 3. Load to TiDB
python code/storage/migration.py

# 4. AI Analysis
python code/ai_analysis/groq_analyzer.py

# 5. Benchmarks
python code/benchmarks/performance_test.py
```

⚡ Performance Benchmarks

Test: Filter 1 Million rows

· Pandas: 2.3 seconds
· Polars: 0.8 seconds
· Rust: 0.15 seconds

Test: Aggregation on 1 Million rows

· Pandas: 1.8 seconds
· Polars: 0.6 seconds
· Rust: 0.08 seconds

Test: Join 2 tables (1M rows each)

· Pandas: 4.5 seconds
· Polars: 1.2 seconds
· Rust: 0.3 seconds

🚀 Rust is 15-30x faster than Pandas

📝 License

MIT

```
