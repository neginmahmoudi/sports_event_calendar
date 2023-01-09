import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
// import { getValidSessionByToken } from '../database/sessions';
import { LoginResponseBody } from './api/login';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function loginHandler() {
    const loginResponse = await fetch('/api/login', {
      // we use post bc we are creating a new session
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
      }),
    });

    const loginResponseBody = (await loginResponse.json()) as LoginResponseBody;

    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return console.log(loginResponseBody.errors);
    }
    const returnTo = router.query.returnTo;

    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      // refresh the user on state
      await props.refreshUserProfile();
      return await router.push(returnTo);
    }

    // refresh the user on state
    await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/private-profile`);
  }

  return (
    <div>
      <Head>
        <title>Login |</title>
        <meta name="description" content="login page of the app" />
      </Head>
      <div>
        <div id="login">
          <h3 className="text-center text-white pt-5">Login form</h3>

          <div className="container">
            {errors.map((error) => {
              return <p key={error.message}>ERROR: {error.message}</p>;
            })}
            <div
              id="login-row"
              className="row justify-content-center align-items-center"
            >
              <div id="login-column" className="col-md-6">
                <div id="login-box" className="col-md-12">
                  <form
                    id="login-form"
                    className="form"
                    action=""
                    method="post"
                  >
                    <h3 className="text-center text-info">Login</h3>
                    <div className="form-group">
                      <label className="text-info">Username:</label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(event) => {
                          setUsername(event.currentTarget.value.toLowerCase());
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="text-info">Password:</label>
                      <br />
                      <input
                        name="password"
                        id="password"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.currentTarget.value);
                        }}
                      />
                    </div>
                    <br />
                    <div>
                      <button
                        className="btn btn-success btn-md"
                        onClick={async () => {
                          await loginHandler();
                        }}
                      >
                        submit
                      </button>
                      <div id="register-link" className="text-right">
                        <Link
                          href="/register"
                          className="text-info text-decoration-none"
                        >
                          Register here
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  // if (token && (await getValidSessionByToken(token))) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: true,
  //     },
  //   };
  // }

  return {
    props: {},
  };
}
