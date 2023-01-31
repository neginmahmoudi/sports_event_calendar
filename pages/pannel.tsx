import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getUserRoleBySessionToken, User } from '../database/users';

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
        <title>Admin Profile</title>
        <meta name="description" content="Biography of the person" />
      </Head>
      <div>
        <h1>welcome to your account, {props.user.username}!</h1>
      </div>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  const adminRole = token && (await getUserRoleBySessionToken(token));

  if (!adminRole) {
    context.res.statusCode = 400;
    return {
      props: {
        error: 'you are not authorized to be here',
      },
    };
  }

  return {
    props: { user: adminRole },
  };
}
