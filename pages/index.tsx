import { GetServerSidePropsResult } from 'next';
import { useState } from 'react';
import { getTeams, Teams } from '../database/teams';
import {
  getTeamsEventWithJoinTables,
  TeamsEventsDTO,
} from '../database/teamsevents';

type Props = {
  events: TeamsEventsDTO[];
  teams: Teams[];
};
export default function SportCalendarEvents(props: Props) {
  const [teams, setTeams] = useState('');
  const [allEvents, setAllEvents] = useState(props.events);
  return (
    <div>
      <select
        className="form-select"
        aria-label="Default select example"
        value={teams}
        onChange={(e) => {
          setTeams(e.currentTarget.value);
          if (e.currentTarget.value === '') {
            setAllEvents(props.events);
          }

          if (e.currentTarget.value !== '') {
            const filteredEventOnTeams = props.events.filter((event) => {
              return event.name.includes(e.currentTarget.value);
            });
            setAllEvents(filteredEventOnTeams);
          }
        }}
      >
        <option value={''}>All Teams</option>
        {props.teams?.map((team) => {
          return (
            <option value={team.name} key={`teams-${team.id}`}>
              {team.name}
            </option>
          );
        })}
      </select>

      <h1>Sports Event Calendar</h1>
      <div id="calendar">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Teams</th>
              <th scope="col">origin competition</th>
              <th scope="col">options</th>
            </tr>
          </thead>
          <tbody>
            {allEvents?.map((teamsEvent) => {
              return (
                <tr key={`events-${teamsEvent.id}`}>
                  <td> {teamsEvent.dateVenue.split('T')[0]}</td>
                  <td>{teamsEvent.timeVenueUtc}</td>
                  <td>{teamsEvent.name}</td>
                  <td>{teamsEvent.originCompetitionName}</td>
                  <td>
                    <button
                      onClick={async () => {
                        confirm('Want to delete?');
                      }}
                    >
                      delete
                    </button>
                    <a href={`/${teamsEvent.id}`}>view</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
//Fetch the events data on the server and pass it as props to the page
export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const events = await getTeamsEventWithJoinTables();
  const teams = await getTeams();

  //Pass the events data as props to the page
  return {
    props: {
      events: JSON.parse(JSON.stringify(events)),
      teams,
    },
  };
}
