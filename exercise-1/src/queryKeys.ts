export const productKeys = {
  all: ['products'] as const,
  list: (search: string) => ['products', { search }] as const,
};
