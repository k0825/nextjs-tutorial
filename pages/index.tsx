import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import Date from "../components/Date";
import utilStyles from "../styles/utils.module.css";
import { GetStaticProps } from "next";
import { client } from "../lib/client";

type HomeProps = {
  allPostsData: {
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
  }[];
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "blogs" });

  return {
    props: {
      allPostsData: data.contents,
    },
  };
};

const Home = ({ allPostsData }: HomeProps) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMg}>
        <p>Hello!, I'm Kazukiyo. I'm a japanese software engineer.</p>
        <p>
          (This is a sample website - you'll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>

        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, createdAt, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={createdAt} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
