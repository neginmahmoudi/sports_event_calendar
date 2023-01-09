import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // This is the response for any method on this endpoint
  response.status(200).json({ events: 'http://localhost:3000/api/events' });
}
