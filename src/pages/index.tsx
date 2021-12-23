import { VFC } from 'react';
import { Layout } from '../components/Layout';

const Home: VFC = () => {
  return (
    <Layout title='Home'>
      <p className='text-4xl'>Welcome to Nextjs</p>
    </Layout>
  );
};
export default Home;
