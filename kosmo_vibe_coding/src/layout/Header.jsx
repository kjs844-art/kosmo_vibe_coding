import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <h1>Header Page</h1>

      <nav>
        <Link
          to="/member/login"
          state={{
            name: "winter",
            age: 30,
          }}
        >
          로그인
        </Link>
      </nav>
    </>
  );
}

export default Header;
