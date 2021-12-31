/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import TaskPage from '../src/pages/task-page';
import { Task } from '../src/types/types';

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
            id: 3,
            title: 'Task A',
            completed: false,
          },
          {
            userId: 2,
            id: 4,
            title: 'Task B',
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

describe('Todos page / useSWR', () => {
  let staticProps: Array<Task>;
  staticProps = [
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
  ];
  it('Should render CSF data after pre-fetched data', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TaskPage staticTasks={staticProps} />
      </SWRConfig>,
    );
    // まず、初期値としてgetStaticPropsで取得したデータが表示されるかチェック
    expect(await screen.findByText('Todos Page')).toBeInTheDocument();
    expect(screen.getByText('1: Static task 1')).toBeInTheDocument();
    expect(screen.getByText('2: Static task 2')).toBeInTheDocument();
    // 次に、useSWRで取得した最新のデータが表示されるかチェック
    expect(await screen.findByText('3: Task A')).toBeInTheDocument();
    expect(screen.getByText('4: Task B')).toBeInTheDocument();
  });
  it('Should render Error text when fetch failed', async () => {
    // エラー用にモックサーバの上書き
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/todos',
        (req, res, ctx) => {
          const query = req.url.searchParams;
          const _limit = query.get('_limit');
          if (_limit === '10') {
            return res(ctx.status(400));
          }
        },
      ),
    );
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TaskPage staticTasks={staticProps} />
      </SWRConfig>,
    );
    expect(await screen.findByText('Error!')).toBeInTheDocument();
  });
});
