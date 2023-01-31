import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
  getUserBySessionToken,
  getUserRoleBySessionToken,
  User,
} from '../database/users';

type Props = {
  user?: User;
};

export default function UserProfile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found</h1>
        Better luck next time
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Your Profile</title>
        <meta name="description" content="Biography of the person" />
      </Head>
      <div>
        <h1>welcome to your account, {props.user.username}!</h1>
        {props.user && props.user.roleId === 1 ? (
          <button>
            <Link href="/pannel"> admin pannel</Link>
          </button>
        ) : (
          <>hello</>
        )}
      </div>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/private-profile',
        permanent: false,
      },
    };
  }

  if (!(user.role_id === 1)) {
    return {
      props: {
        error: 'you are not admin',
      },
    };
  }

  return {
    props: { user },
  };
}
