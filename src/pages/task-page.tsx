import { VFC } from 'react';
import { Layout } from '../components/Layout';

const TaskPage: VFC = () => {
  return (
    <Layout title='Todos'>
      <p className='text-4xl'>Todo Page</p>
    </Layout>
  );
};
export default TaskPage;
