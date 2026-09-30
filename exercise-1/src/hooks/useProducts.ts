import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { productKeys } from '../queryKeys';

export function useProducts(search: string) {
  return useQuery({
    queryKey: productKeys.list(search),
    queryFn: () => fetchProducts(search),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
