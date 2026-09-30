import type { NewUser, User } from '../types';

const SIMULATE_DELETE_FAILURE = true;

interface JsonPlaceholderUser {
  id: number;
  name: string;
  email: string;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Could not load users right now.');
  }
  const raw: JsonPlaceholderUser[] = await response.json();
  return raw.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: 'member',
  }));
}

export async function createUser(input: NewUser): Promise<User> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error('Could not create user.');
  }
  const created = await response.json();
  return {
    id: created.id,
    name: input.name,
    email: input.email,
    role: input.role,
  };
}

export async function deleteUser(id: number): Promise<void> {
  if (SIMULATE_DELETE_FAILURE) {
    throw new Error('Could not delete user right now.');
  }
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Could not delete user right now.');
  }
}
