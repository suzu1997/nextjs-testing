import { NextPage } from 'next';
import { Layout } from '../components/Layout';

const TaskPage: NextPage = () => {
  return (
    <Layout title='Todos'>
      <p className='text-4xl'>Todo Page</p>
    </Layout>
  );
};
export default TaskPage;
