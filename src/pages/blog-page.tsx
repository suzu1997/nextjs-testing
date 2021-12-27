import { GetStaticProps, NextPage } from 'next';
import { Layout } from '../components/Layout';
import { PostComponent } from '../components/Post';
import { getAllPostsData } from '../lib/fetch';
import { Post } from '../types/types';

type StaticProps = {
  posts: Array<Post>;
};

const BlogPage: NextPage<StaticProps> = ({ posts }) => {

  return (
    <Layout title='Blog'>
      <p className='text-4xl'>Blog Page</p>
      <ul className='mt-8'>
        {posts.map((post) => (
          <li key={post.id}>
            <PostComponent {...post} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};
export default BlogPage;

export const getStaticProps: GetStaticProps = async() => {
  const posts = await getAllPostsData();
  return {
    props: { posts },
  };
};
