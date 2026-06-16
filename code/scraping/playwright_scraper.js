```javascript
import { chromium } from 'playwright';
import fs from 'fs';

async function scrapeTikTokTrends() {
    console.log('🕷️ Scraping TikTok trends...');
    
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto('https://www.tiktok.com/search?q=trending+products');
    await page.waitForTimeout(3000);
    
    // Scroll to load more
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    
    const products = await page.evaluate(() => {
        const items = document.querySelectorAll('[data-e2e="search-item"]');
        return Array.from(items).slice(0, 20).map(el => ({
            title: el.querySelector('[data-e2e="title"]')?.innerText || '',
            views: el.querySelector('[data-e2e="views"]')?.innerText || '0',
            likes: el.querySelector('[data-e2e="likes"]')?.innerText || '0',
            source: 'TikTok'
        }));
    });
    
    await browser.close();
    
    // Save to file
    fs.writeFileSync('products_tiktok.json', JSON.stringify(products, null, 2));
    console.log(`✅ Scraped ${products.length} TikTok products`);
    
    return products;
}

// Run
scrapeTikTokTrends().catch(console.error);
```
