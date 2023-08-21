import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export const name = 'Travel ai';
export const siteTitle = 'Travel Website with ai response';
export const webDescription = "Choose a city to visit, we'll recomend you the best places and their information"

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={webDescription}
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <main>{children}</main>
      {/* {!home && (
        <div>
          <Link href="/">← Back to home</Link>
        </div>
      )} */}
    </div>
  );
}
