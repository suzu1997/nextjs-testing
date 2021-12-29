import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import useSWR from 'swr';
import axios from 'axios';
import { CommentComponent } from '../components/Comment';
import { Comment } from '../types/types';

const axiosFetcher = async () => {
  const result = await axios.get<Comment[]>(
    'https://jsonplaceholder.typicode.com/comments/?_limit=10',
  );
  return result.data;
};

const CommentPage: NextPage = () => {
  const { data: comments, error } = useSWR('commentsFetch', axiosFetcher);

  if (error) return <span>Error!</span>;

  return (
    <Layout title='Comment'>
      <p className='text-4xl m-10'>Comment Page</p>
      <ul>
        {comments &&
          comments.map((comment) => (
            <CommentComponent key={comment.id} {...comment} />
          ))}
      </ul>
    </Layout>
  );
};
export default CommentPage;
