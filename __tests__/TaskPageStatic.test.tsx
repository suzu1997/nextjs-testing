/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getPage } from 'next-page-tester';
import { initTestHelpers } from 'next-page-tester';

initTestHelpers();

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/todos', (req, res, ctx) => {
    const query = req.url.searchParams;
    const _limit = query.get('_limit');
    if (_limit === '10') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: 'Static task 1',
            completed: false,
          },
          {
            userId: 2,
            id: 2,
            title: 'Static task 2',
            completed: false,
          },
        ]),
      );
    }
  }),
];

const server = setupServer(...handlers);
beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe('Todo page / getStaticProps', () => {
  it('Shold render the list of tasks pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/task-page',
    });
    render(page);
    expect(await screen.findByText('Todos Page')).toBeInTheDocument();
    expect(screen.getByText('1: Static task 1')).toBeInTheDocument();
    expect(screen.getByText('2: Static task 2')).toBeInTheDocument();
  });
});
