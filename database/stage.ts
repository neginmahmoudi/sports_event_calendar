import { sql } from './connect';

export type Stage = {
  id: number;
  Id: string;
  name: string;
  ordering: number;
};

export async function getStage() {
  const stages = await sql<Stage[]>`
SELECT * FROM stage;
`;
  return stages;
}
export async function getStageById(id: number) {
  const [stage] = await sql<Stage[]>`
  SELECT * FROM stage WHERE id=${id}`;

  return stage;
}
