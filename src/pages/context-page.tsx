import { NextPage } from 'next';
import { Layout } from '../components/Layout';

const ContextPage: NextPage = () => {
  return (
    <Layout title='Context'>
      <p className='text-4xl'>Context Page</p>
    </Layout>
  );
};
export default ContextPage;
