import { useState } from 'react';
import { useCreateUser } from '../hooks/useCreateUser';

export default function CreateUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const mutation = useCreateUser();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate(
      { name, email, role },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
          setRole('');
        },
      }
    );
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create User'}
      </button>
      {mutation.isError && <p className="error">{mutation.error.message}</p>}
      {mutation.isSuccess && <p className="message">User created.</p>}
    </form>
  );
}
