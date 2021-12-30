/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StateProvider } from '../src/context/ StateProvider';
import { ContextA } from '../src/components/ContextA';
import { ContextB } from '../src/components/ContextB';

describe('Global state management (useContext)', () => {
  it('Shold change the toggle state globally', () => {
    // useContextのテストをしたいコンポーネントをproviderでラップしておく
    render(
      <StateProvider>
        <ContextA />
        <ContextB />
      </StateProvider>,
    );
    // testidがtoggle-a, toggle-bのテキストがそれぞれfalseであることを確認
    expect(screen.getByTestId('toggle-a').textContent).toBe('false');
    expect(screen.getByTestId('toggle-b').textContent).toBe('false');
    // Changeをクリックすると、toggleがtrueになることを確認
    userEvent.click(screen.getByText('Change'));
    expect(screen.getByTestId('toggle-a').textContent).toBe('true');
    expect(screen.getByTestId('toggle-b').textContent).toBe('true');
  });
});
