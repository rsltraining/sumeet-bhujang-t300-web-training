import { useUsers } from './hooks/useUsers';
import CreateUserForm from './components/CreateUserForm';
import UserList from './components/UserList';

export default function App() {
  const { data, isPending, isError, isSuccess } = useUsers();

  return (
    <main className="container">
      <h1>Exercise 2: User Management</h1>
      <p className="hint">
        Implement user creation, deletion, mutations, invalidation, and optimistic updates.
      </p>

      <CreateUserForm />

      {isPending && <p className="message">Loading users...</p>}
      {isError && <p className="error">Failed to load users.</p>}
      {isSuccess && <UserList users={data} />}
    </main>
  );
}
