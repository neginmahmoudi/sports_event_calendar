import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  getAllTeamsEventsByAdminAndValidSessionToken,
  getTeamsEventWithJoinTables,
} from '../../../database/teamsevents';
import { getUserRoleBySessionToken } from '../../../database/users';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }
  const roleAdmin =
    request.cookies.sessionToken &&
    (await getUserRoleBySessionToken(request.cookies.sessionToken));
  if (!roleAdmin) {
    response
      .status(400)
      .json({ errors: [{ message: 'you are not authorized !' }] });
    return;
  }

  if (request.method === 'GET') {
    const events =
      request.cookies.sessionToken &&
      (await getAllTeamsEventsByAdminAndValidSessionToken(
        request.cookies.sessionToken,
      ));
    return response.status(200).json(events);
  }

  if (request.method === 'POST') {
    const eventName = request.body?.eventName;
    const image = request.body?.image;
    const description = request.body?.description;
    const address = request.body?.address;
    const eventDate = request.body?.eventDate;
    const categoryId = request.body?.categoryId;
    const userId = Number(request.body?.userId);
    const free = request.body?.free;
    console.log(typeof userId, typeof categoryId);
    if (
      !(
        eventName &&
        image &&
        description &&
        address &&
        eventDate &&
        categoryId &&
        userId
      )
    ) {
      return response
        .status(400)
        .json({ message: 'one of the properties of the form is missing' });
    }
    // create a new event using the database util function
    const newEvent = await createEvent(
      image,
      eventName,
      description,
      address,
      eventDate,
      categoryId,
      userId,
      free,
    );
    console.log(newEvent);
    return response.status(200).json(newEvent);
  }

  return response.status(400).json({ message: 'Method not allowed' });
}
