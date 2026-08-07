import bcrypt from 'bcryptjs';
import users from '@/data/users.json';

const AUTH_KEY = 'atlas_auth';

export async function login(username: string, password: string): Promise<boolean> {
  const user = users.find((u) => u.username === username);
  if (!user) return false;

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) return false;

  localStorage.setItem(AUTH_KEY, 'true');
  return true;
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}
