import { sql } from './connect';

export type Teams = {
  id: number;
  name: string;
};

export async function getTeams() {
  const teams = await sql<Teams[]>`
  SELECT id,name
  FROM teams
`;
  return teams;
}
export async function getAwayTeamById(id: number) {
  const [team] = await sql<Teams[]>`
  SELECT * FROM teams WHERE id=${id}`;

  return team;
}
