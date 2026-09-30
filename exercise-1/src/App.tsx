import { useState } from 'react';
import { useProducts } from './hooks/useProducts';
import ProductCard from './components/ProductCard';

export default function App() {
  const [search, setSearch] = useState('');
  const { data, isPending, isFetching, isError, isSuccess, refetch } = useProducts(search);

  return (
    <main className="container">
      <h1>Exercise 1: Product Listing</h1>
      <p className="hint">
        Implement product fetching, caching, query keys, loading states, search, and background fetching.
      </p>

      <div className="search">
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button onClick={() => refetch()}>Refresh Products</button>
      </div>

      {isFetching && !isPending && <p className="fetching">Updating...</p>}
      {isPending && <p className="status">Loading products...</p>}
      {isError && <p className="error">Failed to load products.</p>}

      {isSuccess && (
        <div className="grid">
          {data.length === 0 && <p className="status">No products match your search.</p>}
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
