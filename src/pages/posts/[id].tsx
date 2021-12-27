import Link from 'next/link';
import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from '../../components/Layout';
import { Post } from '../../types/types';
import { getAllPostIds, getPostData } from '../../lib/fetch';

const postDetail: FC<Post> = (props) => {
  const { id, title, body } = props;

  return (
    <Layout title={title}>
      <p className='m-4'>ID: {id}</p>
      <p className='mb-4 text-xl font-bold'>{title}</p>
      <p className='mx-10mb-12'>{body}</p>
      <Link href='/blog-page' passHref>
        <div className='flex cursor-pointer mt-12'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mr-3'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
            />
          </svg>
          <a data-testid='back-blog'>Back to blog page</a>
        </div>
      </Link>
    </Layout>
  );
};

export default postDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await getPostData(String(ctx.params.id));
  return {
    props: {
       ...post,
    }
  }
}
