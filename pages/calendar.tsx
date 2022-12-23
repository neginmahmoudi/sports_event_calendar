import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { GetServerSidePropsResult } from 'next';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { getSports, Sport } from '../database/sports';
import {
  getTeamsEventWithJoinTables,
  TeamsEventsDTO,
} from '../database/teamsevents';

type Props = {
  eventsList: TeamsEventsDTO[];
  sports: Sport[];
};

export default function BigCalendarExample(props: Props) {
  const localizer = momentLocalizer(moment);

  var calenderEvent = props.eventsList?.map(function (event) {
    var e = {
      title: event.sportName + ', ' + event.name,
      start: new Date(event.dateVenue),
      end: new Date(event.dateVenue),
    };
    return e;
  });
  console.log(calenderEvent);
  return (
    <>
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
  const eventsList = await getTeamsEventWithJoinTables();
  const sports = await getSports();
  return {
    props: {
      eventsList: JSON.parse(JSON.stringify(eventsList)),
      sports,
    },
  };
}
