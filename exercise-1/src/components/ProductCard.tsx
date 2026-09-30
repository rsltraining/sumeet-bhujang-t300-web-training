import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} height={120} />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p className="meta">{product.category}</p>
      <p>{product.description}</p>
    </div>
  );
}
