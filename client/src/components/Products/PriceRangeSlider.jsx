import React, { useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider';

function ProductList({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    filterProductsByPrice(range);
  };

  const filterProductsByPrice = (range) => {
    const filtered = products.filter(
      (product) => product.price >= range.min && product.price <= range.max
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <PriceRangeSlider
        minPrice={0}
        maxPrice={1000}
        onChange={handlePriceRangeChange}
      />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
