import { readDB, writeDB } from '$lib/server/db';
import { users, type NewUser, type User } from '$lib/server/db/schema/users';
import { eq } from 'drizzle-orm';

export const getUserByUsername = async (username: string) => {
  const user = await readDB.select().from(users).where(eq(users.username, username));
  return user;
};

export const getUserById = async (id: string) => {
  const user = await readDB.select().from(users).where(eq(users.id, id));
  return user;
};

export const createUser = async (newUser: NewUser) => {
  return writeDB.insert(users).values(newUser);
};

export const updateUser = async (id: string, updatedUser: User) => {
  return writeDB.update(users).set(updatedUser).where(eq(users.id, id));
};

export const deleteUser = async (id: string) => {
  return writeDB.delete(users).where(eq(users.id, id));
};

export const getUsers = async () => {
  return readDB.select().from(users);
};

