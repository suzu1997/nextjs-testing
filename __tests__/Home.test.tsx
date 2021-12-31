/**
* @jest-environment jsdom
*/
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../src/pages/index';

// itでテストケースを定義する
it('Should render hello text', () => {
  render(<Home />); // Homeコンポーネントをレンダリングする HTML情報を取得する
  // screen.debug(); // デバッグ用のコンソールにレンダリングしたHTML情報を表示する
  expect(screen.getByText('Welcome to Nextjs')).toBeInTheDocument(); // Welcome to Nextjsが表示されているかテスト
});
