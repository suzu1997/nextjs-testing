/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { PostComponent } from '../src/components/Post';
import { Post } from '../src/types/types';

describe('Post component with given props', () => {
  let dummyProps: Post;
  beforeEach(() => {
    dummyProps = {
      userId: 1,
      id: 1,
      title: 'dummy title 1',
      body: 'dummy body 1',
    };
  });
  it('Should render correctly with given props value', () => {
    render(<PostComponent {...dummyProps} />);
    expect(screen.getByText(dummyProps.id)).toBeInTheDocument();
    expect(screen.getByText(dummyProps.title)).toBeInTheDocument();
  });
});
