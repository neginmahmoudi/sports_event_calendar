import Link from 'next/link';

function Anchor({ children, ...restProps }) {
  // using a instead of Link since we want to force a full refresh
  return <a {...restProps}>{children}</a>;
}

export default function Header(props) {
  return (
    <header>
      {/* <nav>
        <div>
          <Link href="/">Home</Link>
          <Link href="/calendar">Calendar</Link>
          <Link href="/private-profile">profile</Link>
        */}
      {/* </div>
        {props.user && props.user.username}
        {props.user ? (
          <Anchor href="/logout">Logout</Anchor>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )} */}
      {/* </nav> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" href="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" href="/events">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/events/calendar">
                Calendar
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Shop
              </a>
            </li>

            {props.user ? (
              <>
                <li className="nav-item active">
                  <Link className="nav-link link-info" href="/private-profile">
                    {props.user.username}
                  </Link>
                </li>

                <li className="nav-item active">
                  <Anchor className="nav-link link-info" href="/logout">
                    Logout
                  </Anchor>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <Link className="nav-link" href="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" href="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
