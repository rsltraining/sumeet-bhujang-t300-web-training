import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';
import { userKeys } from '../queryKeys';

export function useUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: fetchUsers,
  });
}
