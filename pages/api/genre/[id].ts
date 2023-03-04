import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const id = Number(request.query.id);
  if (!id) {
    return response.status(404).json({ message: 'Not a valid id' });
  }

  if (request.method === 'GET') {
    const genre = await getGenreById(id);

    // check if the event exist
    if (!genre) {
      return response.status(404).json({ message: 'Not a valid Id is passed' });
    }
    return response.status(200).json(genre);
  }

  if (request.method === 'PUT') {
    // NOT getting the id from the body since is already on the query
    const input = request.body?.input;
    // Check all the information to create events
    if (!input) {
      return response.status(400).json({ message: 'property is missing' });
    }

    // Create the eventusing the database util function

    const newGenre = await updateGenreById(id, input);

    if (!newGenre) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    // response with the new created event
    return response.status(200).json(newGenre);
  }

  if (request.method === 'DELETE') {
    const deletedGenre = await deleteGenreById(id);

    if (!deletedGenre) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    return response.status(200).json(deletedGenre);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
