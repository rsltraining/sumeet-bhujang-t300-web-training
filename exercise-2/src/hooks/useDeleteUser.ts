import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../api/users';
import { userKeys } from '../queryKeys';
import type { User } from '../types';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: userKeys.all });
      const previousUsers = queryClient.getQueryData<User[]>(userKeys.all);

      queryClient.setQueryData<User[]>(userKeys.all, (old) => old?.filter((user) => user.id !== id));

      return { previousUsers };
    },
    onError: (_error, _id, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(userKeys.all, context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
}
