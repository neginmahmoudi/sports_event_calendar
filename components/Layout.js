import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header user={props.user} />

      <main>{props.children}</main>

      <Footer />
    </>
  );
}
