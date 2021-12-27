import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  title: string;
};

export const Layout: FC<Props> = (props) => {
  const { children, title = 'Next.js' } = props;

  return (
    <div className='flex justify-center items-center flex-col min-h-screen font-mono'>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className='bg-gray-800 w-screen'>
          <div className='flex items-center pl-8 h-14'>
            <div className='flex space-x-4'>
              <Link href='/'>
                <a
                  data-testid='home-nav'
                  className='text-gray-300 hover:bg-gray-700 px-3 py-2 rounded'
                >
                  Home
                </a>
              </Link>
              <Link href='/blog-page'>
                <a
                  data-testid='blog-nav'
                  className='text-gray-300 hover:bg-gray-700 px-3 py-2 rounded'
                >
                  Blog
                </a>
              </Link>
              <Link href='/comment-page'>
                <a
                  data-testid='comment-nav'
                  className='text-gray-300 hover:bg-gray-700 px-3 py-2 rounded'
                >
                  Comment
                </a>
              </Link>
              <Link href='/context-page'>
                <a
                  data-testid='context-nav'
                  className='text-gray-300 hover:bg-gray-700 px-3 py-2 rounded'
                >
                  Context
                </a>
              </Link>
              <Link href='/task-page'>
                <a
                  data-testid='task-nav'
                  className='text-gray-300 hover:bg-gray-700 px-3 py-2 rounded'
                >
                  Todos
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className='flex flex-1 justify-center items-center flex-col w-screen'>{children}</main>
      <footer className='w-full h-12 flex justify-center items-center border-t'>
        <small>&copy;2021 suzu</small>
      </footer>
    </div>
  );
};
