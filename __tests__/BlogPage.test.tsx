/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import { getPage } from 'next-page-tester';
import { initTestHelpers } from 'next-page-tester';
// APIをモック化するためのMock Service Workerから
import { rest } from 'msw';
import { setupServer } from 'msw/node';

initTestHelpers();

// APIをモック化
// どの URL のリクエストに対して、どのようなレスポンスを返すのかを定義
const handlers = [
  rest.get(
    'https://jsonplaceholder.typicode.com/posts/?_limit=10',
    (req, res, ctx) => {
      return res(
        // 以下はダミーデータ
        ctx.status(200),
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: 'dummy title 1',
            body: 'dummy body 1',
          },
          {
            userId: 2,
            id: 2,
            title: 'dummy title 2',
            body: 'dummy body 2',
          },
        ]),
      );
    },
  ),
];

// setupServerを使ってサーバーをたてておく
const server = setupServer(...handlers);

beforeAll(() => {
  // モックサーバの起動
  server.listen();
});
// 各テストケースが終わるたびに呼ばれる
afterEach(() => {
  // モックサーバーのリセットとクリーンアップをして、テスト間の副作用が起こらないように。
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe('Blog Page', () => {
  it('Should render the list of blogs pre-fetched by GetStaticProps', async () => {
    const { page } = await getPage({
      route: '/blog-page',
    });
    render(page);
    expect(await screen.findByText('Blog Page')).toBeInTheDocument();
    expect(screen.getByText('dummy title 1')).toBeInTheDocument();
    expect(screen.getByText('dummy title 2')).toBeInTheDocument();
  });
});
