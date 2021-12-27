import { NextPage } from 'next';
import { Layout } from '../components/Layout';

const CommentPage: NextPage = () => {
  return (
    <Layout title='Comment'>
      <p className='text-4xl'>Comment Page</p>
    </Layout>
  );
};
export default CommentPage;
