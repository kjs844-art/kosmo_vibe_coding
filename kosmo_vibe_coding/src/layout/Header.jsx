import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/MemberContext";

function Header() {
  const navigate = useNavigate();
  const { member, isLogin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <>
      <h1>Header Page</h1>

      <nav>
        <Link to="/">Home</Link>
        {" | "}

        {isLogin ? (
          <span style={{ marginLeft: "10px" }}>
            <strong>{member?.username}</strong>님 환영합니다!
            {" "}
            <button
              type="button"
              onClick={handleLogout}
              style={{ marginLeft: "10px" }}
            >
              로그아웃
            </button>
          </span>
        ) : (
          <Link
            to="/member/login"
            state={{
              name: "winter",
              age: 30,
            }}
          >
            로그인
          </Link>
        )}
      </nav>
    </>
  );
}

export default Header;
