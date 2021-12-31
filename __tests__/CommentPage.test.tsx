/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import { SWRConfig } from 'swr';
// APIをモック化するためMock Service Workerからインポート
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import CommentPage from '../src/pages/comment-page';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/comments', (req, res, ctx) => {
    const query = req.url.searchParams;
    const _limit = query.get('_limit');
    if (_limit === '10') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            postId: 1,
            id: 1,
            name: 'A',
            email: 'dummya@example.com',
            body: 'dummy body A',
          },
          {
            postId: 2,
            id: 2,
            name: 'B',
            email: 'dummyb@example.com',
            body: 'dummy body B',
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

describe('Comment page with useSWR / Success+Error', () => {
  it('Should render the value fetched by useSWR', async () => {
    render(
      // useSWRの機能もテストしたい場合は、SWRConfigでラップ
      // dedupingIntervalを0にすることで、useSWRのデータをキャッシュしないようにする
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CommentPage />
      </SWRConfig>,
    );
    expect(await screen.findByText('1: dummy body A'));
    expect(screen.getByText('by A'));
    expect(screen.getByText('2: dummy body B'));
    expect(screen.getByText('by B'));
  });
  it('Should render Error text when fetch failed', async () => {
    // エラー用にモックサーバの上書き
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/comments',
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
        <CommentPage />
      </SWRConfig>,
    );
    expect(await screen.findByText('Error!'));
  });
});
