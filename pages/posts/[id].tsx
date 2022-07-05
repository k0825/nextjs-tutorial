import Head from 'next/head';
import Layout from '../../components/Layout';
import utilStyles from '../../styles/utils.module.css';
import Date from '../../components/Date';
import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '../../lib/client';

type PostProps = {
  postData: {
    createdAt: string;
    id: string;
    title: string;
    content: string;
    eyecatch: {
      url: string;
      height: number;
      width: number;
    };
    tags: { tag: string }[];
  };
};

type ParamsType = {
  params: {
    id: string;
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: ParamsType) => {
  const data = await client.get({
    endpoint: 'blogs',
    contentId: params.id,
  });
  return {
    props: {
      postData: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blogs' });
  const paths = data.contents.map((content) => `/posts/${content.id}`);
  return { paths, fallback: false };
};

const Post = ({ postData }: PostProps) => {
  return (
    <Layout>
      <Head>{postData.title}</Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.createdAt} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </Layout>
  );
};

export default Post;
