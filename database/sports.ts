import { sql } from './connect';

export type Sport = {
  id: number;
  sportName: string;
};

export async function getSports() {
  const sports = await sql<Sport[]>`
SELECT * FROM sports;
`;
  return sports;
}
export async function getSportById(id: number) {
  const [sport] = await sql<Sport[]>`
  SELECT * FROM sports WHERE id=${id}`;

  return sport;
}
