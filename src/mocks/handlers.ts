// src/mocks/handlers.js
import { rest } from 'msw';
import rickMock from '../__mocks__/rick.json';

export const handlers = [
  // Handles a GET /user request
  rest.get('https://rickandmortyapi.com/api/character/', (req, res, ctx) => {
    const query = req.url.searchParams.get('name');

    if (query === 'react is awesome') {
      return res(
        ctx.status(404),
        ctx.json({ error: 'No results found. Please try another search.' })
      );
    }

    return res(ctx.status(200), ctx.json(rickMock));
  }),
];
