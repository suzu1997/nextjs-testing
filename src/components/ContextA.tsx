import { FC } from 'react';
import { useStateContext } from '../context/ StateProvider';

export const ContextA: FC = () => {
  const { toggle, setToggle } = useStateContext();

  return (
    <>
      <button
        className='bg-gray-500 hover:bg-gray-400 px-3 py-2 mb-5 ext-white rounded focus:outline-none'
        onClick={() => {
          setToggle((toggle) => !toggle);
        }}
      >
        Change
      </button>
      <p>context A</p>
      <p className='mb-5 text-indigo-600' data-testid='toggle-a'>
        {toggle ? 'true' : 'false'}
      </p>
    </>
  );
};
