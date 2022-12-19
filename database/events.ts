import { sql } from './connect';

export type Event = {
  eventsId: number;
  season: number;
  timeVenueUTC: string;
  dateVenue: string;
  stadiumId: number;
  eventStatusId: number;
  stageId: number;
  groupName: string;
  originCompetitionId: number;
  homeGoals: number;
  awayGoals: number;
  winnerName: string;
  message: string;
};
export type EventDTO = {
  eventId: number;
  timeVenueUtc: string;
  dateVenue: string;
  statusId: number;
  stageId: string;
  stageName: string;
  eventStatusId: number;
  name: string;
};

export async function getEvents() {
  const events = await sql<Event[]>`
  SELECT * FROM events inner join events_status on events.event_status_id=events_status.id
  inner join stadiums on events.stadiums_id=stadiums.id
  inner join stages on events.stage_id=stages.id
  inner join origin_competition_id on events.origin_competition_id=origin_competition_id.id
`;
  return events;
}

export async function getEventsWithJoinTables() {
  const events = await sql<EventDTO[]>`
 SELECT events.id, events.time_venue_utc, events.date_venue, events.stage_id, stages.stage_name, events.event_status_id, events_status.name
  FROM events INNER JOIN
  teams_events ON events.id = teams_events.events_id INNER JOIN
  teams ON teams_events.team_id = teams.id INNER JOIN
  events_status ON events.event_status_id = events_status.id INNER JOIN
  stadiums ON events.stadium_id = stadiums.id INNER JOIN
  origin_competition ON events.origin_competition_id = origin_competition.id INNER JOIN
  stages ON events.stage_id = stages.id
`;
  return events;
}

export async function deleteEventById(id: number) {
  const [event] = await sql<Event[]>`
    DELETE FROM
      events
    WHERE
      id = ${id}
    RETURNING *
  `;
  return event;
}
