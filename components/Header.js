import Link from 'next/link';

function Anchor({ children, ...restProps }) {
  // using a instead of Link since we want to force a full refresh
  return <a {...restProps}>{children}</a>;
}

export default function Header(props) {
  return (
    <header>
      <nav css={navStyles}>
        <div>
          <Link href="/">Home</Link>
          <Link href="/team/list">Team List</Link>
          <Link href="/private-profile">private-profile</Link>

          {/*
          Using an <a> tag is not best practice for
          most links (it will be slower) - use a
          Link component instead

          <a href="/about">About</a>
        */}
        </div>
        {props.user && props.user.username}
        {props.user ? (
          <Anchor
            css={css`
              margin-left: 10px;
            `}
            href="/logout"
          >
            Logout
          </Anchor>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
