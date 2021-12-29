import { FC } from 'react';
import { Comment } from '../types/types';

export const CommentComponent: FC<Comment> = (props) => {
  const { id, name, body } = props;
  return (
    <li className='mx-10'>
      <p className=''>
        {id}: {body}
      </p>
      <p className='text-center mt-3 mb-10'>by {name}</p>
    </li>
  );
};
