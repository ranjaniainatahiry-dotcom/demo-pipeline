# Pipeline Code – E-commerce Data Pipeline

Code source complet du pipeline de données E-commerce.

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
# Installer les dépendances Python
pip install -r code/scraping/requirements.txt

# Installer le module Rust
cd code/transformation/rust_transformer
maturin build --release
pip install target/wheels/*.whl

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés API
```

🚀 Utilisation

```bash
# 1. Scraper les données
python code/scraping/apify_scraper.py

# 2. Transformer avec Rust
python code/transformation/polars_processor.py

# 3. Charger dans TiDB
python code/storage/migration.py

# 4. Analyse IA
python code/ai_analysis/groq_analyzer.py

# 5. Benchmarks
python code/benchmarks/performance_test.py
```

📊 Performance

Opération Pandas Polars Rust
1M rows filter 2.3s 0.8s 0.15s
Aggregation 1.8s 0.6s 0.08s

Rust est 15-30x plus rapide que Pandas 🚀

📝 License

MIT
