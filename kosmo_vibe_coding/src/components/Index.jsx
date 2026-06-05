import { useAuth } from "./context/MemberContext";

function Index() {
  const { member, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다.");
  };

  return (
    <>
      <h1>Index Page</h1>

      {member ? (
        <>
          <h3>{member.username}님 로그인 중</h3>
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </>
      ) : (
        <h3>로그인이 필요합니다.</h3>
      )}
    </>
  );
}

export default Index;
