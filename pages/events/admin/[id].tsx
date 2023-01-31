import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getFoundEventById } from '../../../database/events';
import { getUserBySessionToken } from '../../../database/users';
import { parseIntFromContextQuery } from '../../../utils/contextQuery';

export default function SingleEvent(props: Props) {
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Event not found</title>
          <meta name="description" content="event not found in profile" />
        </Head>
        <h1>{props.error}</h1>
        sorry , try <Link href="/index.js">this</Link>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Event</title>
        <meta name="description" content="event in profile" />
      </Head>
      <div> </div>
      <div>
        <div>
          <div></div>

          <div>
            <div>
              <p>details :</p>
              <div>Host:{props.foundEventsss?.username}</div>
              <div>Event Name: {props.foundEventsss?.eventName}</div>
              <div>event info: {props.foundEventsss?.description}</div>
              <div>location: {props.foundEventsss?.address}</div>
              <div>{props.foundEventsss?.free ? 'free' : ''}</div>
              <div>Date: {props.foundEventsss?.eventDate.split('T')[0]}</div>
              <div> Category: {props.foundEventsss?.categoryName}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  const user = token && (await getUserBySessionToken(token));
  const eventId = parseIntFromContextQuery(context.query.eventId);

  if (typeof eventId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'event not found',
      },
    };
  }

  const foundEvent = await getFoundEventById(Number(eventId));
  if (typeof foundEvent === 'undefined') {
    return {
      props: {
        error: 'no events found',
      },
    };
  }

  return {
    props: {
      foundEventsss: JSON.parse(JSON.stringify(foundEvent)),
      user,
    },
  };
}
