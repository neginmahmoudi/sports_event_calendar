import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
  roleId: number;
};

export async function getUserByUsername(username: string) {
  if (!username) return undefined;

  const [user] = await sql<{ id: number; username: string }[]>`
  SELECT
    id,
    username
  FROM
    users
  WHERE
    users.username = ${username}
  `;

  return user;
}

export async function getUsernameById(id: number) {
  if (!id) return undefined;
  const [user] = await sql<{ id: number; username: string }[]>`
  SELECT
    id,
    username
  FROM
    users
  WHERE
    users.id = ${id}
  `;

  return user;
}

// only here bc of sensitive data (login part)
export async function getUserWithPasswordHashByUsername(username: string) {
  if (!username) return undefined;

  const [user] = await sql<User[]>`
  SELECT
    *
  FROM
    users
  WHERE
    users.username = ${username}
  `;

  return user;
}
// this function has been manipulated with role id from the original one

export async function getUserBySessionToken(token: string) {
  if (!token) return undefined;

  const [user] = await sql<{ id: number; username: string; roleId: number }[]>`
  SELECT
    users.id,
    users.username,
    users.role_id
  FROM
    users,
    sessions,
    roles
  WHERE
    sessions.token = ${token} AND
    sessions.user_id = users.id AND
    users.role_id = roles.id AND
    sessions.expiry_timestamp > now();
  `;

  return user;
}
/// role admin query for Auth
export async function getUserRoleBySessionToken(token: string) {
  if (!token) return undefined;

  const [user] = await sql<{ id: number; username: string; role_id: number }[]>`
  SELECT
    users.id,
    users.username,
    users.role_id
  FROM
    users,
    sessions,
    roles
  WHERE
    sessions.token = ${token} AND
    sessions.user_id = users.id AND
    users.role_id = roles.id AND
    roles.name = 'Admin' AND
    sessions.expiry_timestamp > now();
  `;

  return user;
}

export async function createUser(username: string, password_hash: string) {
  const [userWithoutPassword] = await sql<{ id: number; username: string }[]>`
  INSERT INTO users
    (username, password_hash)
  VALUES
    (${username}, ${password_hash})
  RETURNING
    id,
    username
  `;
  // to force it is not undefined '!'
  return userWithoutPassword!;
}
