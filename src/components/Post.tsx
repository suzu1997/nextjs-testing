import Link from 'next/link';
import { FC } from 'react';
import type { Post } from '../types/types'
 
export const PostComponent: FC<Post> = (props) => {
  const  {id , title} = props;
  return (
    <div>
      <span>{id}</span>
      {' : '}
      <Link href={`/posts/${id}`}>
        <a className='cursor-pointer border-b border-gray-500 hover:bg-gray-300'>
          {title}
        </a>
      </Link>
    </div>
  )
}