```sql
-- TiDB Cloud Schema for E-commerce Data

CREATE DATABASE IF NOT EXISTS ecommerce_analytics;
USE ecommerce_analytics;

-- Products table (partitioned for scalability)
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0,
    reviews INT DEFAULT 0,
    category VARCHAR(100),
    source VARCHAR(50),
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    embedding VECTOR(1536),  -- For vector search
    INDEX idx_category (category),
    INDEX idx_rating (rating),
    INDEX idx_scraped_at (scraped_at)
) PARTITION BY HASH(id) PARTITIONS 8;

-- Trends table
CREATE TABLE daily_trends (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    search_volume INT,
    date DATE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    INDEX idx_date (date)
);

-- AI Insights table
CREATE TABLE ai_insights (
    id INT PRIMARY KEY AUTO_INCREMENT,
    insight_type VARCHAR(50),
    content TEXT,
    confidence DECIMAL(3,2),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type (insight_type)
);

-- Example queries

-- Top products by rating
SELECT name, price, rating, reviews 
FROM products 
ORDER BY rating DESC 
LIMIT 10;

-- Category analysis
SELECT 
    category,
    COUNT(*) as product_count,
    AVG(price) as avg_price,
    AVG(rating) as avg_rating
FROM products
GROUP BY category
ORDER BY avg_rating DESC;

-- Weekly trends
SELECT 
    DATE(scraped_at) as date,
    COUNT(*) as daily_products,
    AVG(price) as avg_price
FROM products
WHERE scraped_at > DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY DATE(scraped_at);

-- Vector similarity search
-- Find similar products based on embedding
SELECT name, price, rating,
    VEC_DISTANCE(embedding, '[0.1, 0.2, ...]') as similarity
FROM products
ORDER BY similarity
LIMIT 10;
```
