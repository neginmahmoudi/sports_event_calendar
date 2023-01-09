import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { GetServerSidePropsResult } from 'next';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { getSports, Sport } from '../database/sports';
import {
  getTeamsEventWithJoinTables,
  TeamsEventsDTO,
} from '../database/teamsevents';

type Props = {
  events: TeamsEventsDTO[];
  sports: Sport[];
};

export default function BigCalendarExample(props: Props) {
  const [sports, setSports] = useState(0);
  const [allEvents, setAllEvents] = useState(props.events);
  const localizer = momentLocalizer(moment);

  var calenderEvent = allEvents?.map(function (event) {
    var e = {
      title: event.sportName + ', ' + event.name,
      start: new Date(event.dateVenue),
      end: new Date(event.dateVenue),
    };
    return e;
  });

  return (
    <>
      <select
        className="form-select"
        aria-label="Default select example"
        value={sports}
        onChange={(e) => {
          setSports(Number(e.currentTarget.value));
          if (Number(e.currentTarget.value) === 0) {
            setAllEvents(props.events);
          }

          if (Number(e.currentTarget.value) !== 0) {
            const filteredEventOnSports = props.events.filter((event) => {
              return event.sportId === Number(e.currentTarget.value);
            });
            setAllEvents(filteredEventOnSports);
          }
        }}
      >
        <option value={0}>All Sports</option>
        {props.sports?.map((sport) => {
          return (
            <option value={sport.id} key={`sports-${sport.id}`}>
              {sport.sportName}
            </option>
          );
        })}
      </select>
      <Calendar
        localizer={localizer}
        events={calenderEvent}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const events = await getTeamsEventWithJoinTables();
  const sports = await getSports();
  return {
    props: {
      events: JSON.parse(JSON.stringify(events)),
      sports,
    },
  };
}
