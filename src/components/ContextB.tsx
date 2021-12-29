import { FC } from 'react';
import { useStateContext } from '../context/ StateProvider';

export const ContextB: FC = () => {
  const { toggle } = useStateContext();

  return (
    <>
      <p>context B</p>
      <p className='mb-5 text-indigo-600' data-testid='toggle-b'>
        {toggle ? 'true' : 'false'}
      </p>
    </>
  );
};