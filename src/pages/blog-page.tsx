import { NextPage } from 'next';
import { Layout } from '../components/Layout';

const BlogPage: NextPage = () => {
  return (
    <Layout title='Blog'>
      <p className='text-4xl'>Blog Page</p>
    </Layout>
  );
};
export default BlogPage;
