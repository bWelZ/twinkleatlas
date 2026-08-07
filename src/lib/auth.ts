import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import users from '@/data/users.json';
import { createSessionToken, verifySessionToken, type AuthUser } from './session';

export type { AuthUser };
export { createSessionToken };

export async function validateCredentials(username: string, password: string): Promise<AuthUser | null> {
  const user = users.find((u) => u.username === username);
  if (!user) return null;

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) return null;

  return { id: user.id, username: user.username, name: user.name };
}

export async function getSession(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('atlas_session');
  if (!sessionCookie) return null;

  const session = await verifySessionToken(sessionCookie.value);
  if (!session) return null;

  const userExists = users.find((u) => u.id === session.id);
  if (!userExists) return null;

  return session;
}
