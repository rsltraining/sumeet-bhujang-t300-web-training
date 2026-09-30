import type { User } from '../types';
import { useDeleteUser } from '../hooks/useDeleteUser';

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  const deleteMutation = useDeleteUser();

  return (
    <div className="list">
      {users.map((user) => (
        <div className="user" key={user.id}>
          <div>
            <span>{user.name}</span>
            <small>
              {user.email} - {user.role}
            </small>
          </div>
          <button onClick={() => deleteMutation.mutate(user.id)} disabled={deleteMutation.isPending}>
            Delete
          </button>
        </div>
      ))}
      {deleteMutation.isError && <p className="error">Delete failed, user restored.</p>}
    </div>
  );
}
