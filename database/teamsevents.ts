import { sql } from './connect';

export type TeamsEvents = {
  id: number;
  teamId: number;
  teamType: string;
  eventsId: number;
  sportId: number;
};
export type TeamsEventsDTO = {
  id: number;
  timeVenueUtc: string;
  dateVenue: string;
  originCompetitionId: number;
  originCompetitionName: string;
  sportId: number;
  sportName: string;
  teamId: number;
  name: string;
};

export async function getTeamsEventWithJoinTables() {
  const TeamsEvents = await sql<TeamsEventsDTO[]>`
SELECT teams_events.events_id as id,events.time_venue_utc, events.date_venue, events.origin_competition_id, origin_competition.origin_competition_name,string_agg(teams.name,'-') as name, events.sport_id, sports.sport_name
FROM teams_events
INNER JOIN teams ON teams.id = teams_events.team_id
LEFT JOIN events ON events.id =teams_events.events_id
INNER JOIN origin_competition ON origin_competition.id = events.origin_competition_id
INNER JOIN sports ON sports.id = events.sport_id
group by teams_events.events_id,events.time_venue_utc, events.date_venue, events.origin_competition_id, origin_competition.origin_competition_name,events.sport_id,sports.sport_name
`;
  return TeamsEvents;
}
export async function getTeamsEventsByAdminAndValidSessionToken(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  const [teamsEvent] = await sql<TeamsEventsDTO[]>`
    SELECT
    teams_events.*,
    events.*
    FROM
      teams_events,
      events,
      sessions,
      users,
      roles
    WHERE
    sessions.user_id= users.id
    AND
    users.role_id=roles.id
    AND
    roles.name='Admin'
    AND
      sessions.token = ${token}
    AND
      sessions.expiry_timestamp > now()
  `;
  return teamsEvent;
}

// SELECT
// teams_events.*,
// events.*
// FROM
// teams_events,
// events,
//   sessions,
//   users,
//   roles
// WHERE
// sessions.user_id= users.id
// AND
// users.role_id=roles.id
// AND
// roles.name='Admin'
// AND
//   sessions.token = ''
// AND
//   sessions.expiry_timestamp > now()

export async function getTeamsEventById(id: number) {
  if (!id) return undefined;
  const [teamsEvent] = await sql<TeamsEventsDTO[]>`
   SELECT teams_events.events_id as id,events.time_venue_utc, events.date_venue, events.origin_competition_id, origin_competition.origin_competition_name,string_agg(teams.name,'-') as name, events.sport_id, sports.sport_name
   FROM teams_events
   INNER JOIN teams ON teams.id = teams_events.team_id
   LEFT JOIN events ON events.id =teams_events.events_id
   INNER JOIN origin_competition ON origin_competition.id = events.origin_competition_id
   INNER JOIN sports ON sports.id = events.sport_id
  WHERE
    teams_events.id=${id}
  group by teams_events.events_id,events.time_venue_utc, events.date_venue, events.origin_competition_id, origin_competition.origin_competition_name,events.sport_id,sports.sport_name
  `;
  return teamsEvent;
}
