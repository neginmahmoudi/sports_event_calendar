import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getTeamsEventById, TeamsEventsDTO } from '../../database/teamsevents';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

type Props =
  | {
      foundEvent: TeamsEventsDTO;
    }
  | {
      error: string;
    };
export default function SingleEvent(props: Props) {
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>event not found</title>
          <meta name="description" content="event not found" />
        </Head>
        <h1>{props.error}</h1>
      </div>
    );
  }
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <h1>more details !</h1>
      {/* <div>date:{props.foundEvent.dateVenue}</div> */}
      <div>name:{props.foundEvent?.name}</div>
      <div>time:{props.foundEvent?.timeVenueUtc}</div>
      <div>sport:{props.foundEvent?.sportName}</div>
      <div>Origin:{props.foundEvent?.originCompetitionName}</div>

      <h3>
        <Link href="/events">Back</Link>
      </h3>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const teamsEventId = parseIntFromContextQuery(context.query.id);

  if (typeof teamsEventId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'events not found',
      },
    };
  }
  const foundEvent = await getTeamsEventById(teamsEventId);
  if (typeof foundEvent === 'undefined') {
    return {
      props: {
        error: 'no event found',
      },
    };
  }
  return {
    props: { foundEvent: JSON.parse(JSON.stringify(foundEvent)) },
  };
}

/// this page needs to be checked !
