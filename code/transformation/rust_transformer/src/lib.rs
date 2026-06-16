```rust
use pyo3::prelude::*;
use rayon::prelude::*;

#[pyclass]
#[derive(Clone, Debug)]
pub struct Product {
    #[pyo3(get, set)]
    pub name: String,
    #[pyo3(get, set)]
    pub price: f64,
    #[pyo3(get, set)]
    pub rating: f64,
}

#[pymethods]
impl Product {
    #[new]
    fn new(name: String, price: f64, rating: f64) -> Self {
        Product { name, price, rating }
    }
}

#[pyfunction]
pub fn process_data(products: Vec<Product>) -> PyResult<Vec<f64>> {
    // Parallel processing with Rayon
    let prices: Vec<f64> = products
        .par_iter()
        .map(|p| {
            // Apply discount logic
            if p.rating >= 4.5 {
                p.price * 0.9  // 10% discount for high rating
            } else if p.rating >= 4.0 {
                p.price * 0.95 // 5% discount for good rating
            } else {
                p.price
            }
        })
        .collect();
    
    Ok(prices)
}

#[pyfunction]
pub fn calculate_stats(products: Vec<Product>) -> PyResult<Vec<f64>> {
    let prices: Vec<f64> = products.iter().map(|p| p.price).collect();
    
    let sum: f64 = prices.par_iter().sum();
    let avg = sum / prices.len() as f64;
    let max = prices.par_iter().fold(|| 0.0, |a, b| a.max(*b)).max().unwrap();
    let min = prices.par_iter().fold(|| f64::MAX, |a, b| a.min(*b)).min().unwrap();
    
    Ok(vec![avg, max, min])
}

#[pymodule]
fn rust_transformer(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_class::<Product>()?;
    m.add_function(wrap_pyfunction!(process_data, m)?)?;
    m.add_function(wrap_pyfunction!(calculate_stats, m)?)?;
    Ok(())
}
```
