import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'GET') {
    const genre = [{ id: 1, name: 'comedy' }];
    return response.status(200).json(genre);
  }

  if (request.method === 'POST') {
    const input = request.body?.input;
    if (!input) {
      return response
        .status(400)
        .json({ message: 'the property of the form is missing' });
    }
    // create a new event using the database util function
    const newGenre = await createGenre(input);
    return response.status(200).json(newGenre);
  }

  return response.status(400).json({ message: 'Method not allowed' });
}
// This is the response for any method on this endpoint
