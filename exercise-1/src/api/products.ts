import type { Product } from '../types';

const SIMULATE_PRODUCTS_FAILURE = true;

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export async function fetchProducts(search: string): Promise<Product[]> {
  if (SIMULATE_PRODUCTS_FAILURE) {
    throw new Error('Could not load products right now.');
  }

  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Could not load products right now.');
  }

  const raw: FakeStoreProduct[] = await response.json();
  const products: Product[] = raw.map((item) => ({
    id: item.id,
    name: item.title,
    price: item.price,
    category: item.category,
    image: item.image,
    description: item.description,
  }));

  if (!search) {
    return products;
  }

  return products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
}
