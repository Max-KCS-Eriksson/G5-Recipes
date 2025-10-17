import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h1>404</h1>
      <p>Sidan hittades inte.</p>
      <p>
        <Link to="/">
          <strong>Go back to Home/Main</strong>
        </Link>
      </p>
    </>
  );
}

export default NotFoundPage;
