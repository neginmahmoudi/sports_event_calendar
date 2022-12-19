import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getTeamsEventById, TeamsEvents } from '../database/teamsevents';
import { parseIntFromContextQuery } from '../utils/contextQuery';

type Props =
  | {
      foundEvent: TeamsEvents;
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
      <div>sport id:{props.foundEvent.sportId}</div>
      <div>evetns id:{props.foundEvent.eventsId}</div>
      <h3>
        <Link href="/">Back</Link>
      </h3>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const teamsEventId = parseIntFromContextQuery(context.query.id);
  console.log(teamsEventId);
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
        error: 'no Items found',
      },
    };
  }
  return {
    props: { foundEvent },
  };
}
