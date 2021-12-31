import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { GetStaticProps } from 'next';
import { getAllTasksData } from '../lib/fetch';
import { Task } from '../types/types';
import useSWR from 'swr';
import axios from 'axios';

type StaticProps = {
  staticTasks: Array<Task>;
};

const axiosFetcher = async () => {
  const result = await axios.get<Array<Task>>(
    'https://jsonplaceholder.typicode.com/todos/?_limit=10',
  );
  return result.data;
};

const TaskPage: NextPage<StaticProps> = (props) => {
  const { staticTasks } = props;

  const { data: tasks, error } = useSWR('tasksFetch', axiosFetcher, {
    fallbackData: staticTasks, // データfetch前に表示する初期データ
    revalidateOnMount: true, // マウント時に最新の情報を取得
  });
  if (error) return <span>Error!!</span>;

  return (
    <Layout title='Todos'>
      <p className='text-4xl mb-10'>Todos Page</p>
      <ul>
        {tasks &&
          tasks.map((task) => (
            <li key={task.id}>
              {task.id}: {task.title}
            </li>
          ))}
      </ul>
    </Layout>
  );
};
export default TaskPage;

export const getStaticProps: GetStaticProps = async () => {
  const staticTasks = await getAllTasksData();
  return {
    props: { staticTasks },
  };
};
