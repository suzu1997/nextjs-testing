import { NextPage } from 'next';
import { ContextA } from '../components/ContextA';
import { ContextB } from '../components/ContextB';
import { Layout } from '../components/Layout';
import { StateProvider } from '../context/ StateProvider';

const ContextPage: NextPage = () => {
  return (
    <Layout title='Context'>
      <p className='text-4xl mb-10'>Context Page</p>
      <StateProvider>
        <ContextA />
        <ContextB />
      </StateProvider>
    </Layout>
  );
};
export default ContextPage;
