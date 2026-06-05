import { useRef } from "react";
import { useLocation } from "react-router-dom";

export default function MemberLogin() {
  // Header.jsx의 <Link state={...}> 로 넘어온 데이터 받기
  const location = useLocation();

  // 주소창에 직접 /member/login을 입력하면 state가 없을 수 있으므로 기본값 처리
  const human = location.state || {
    name: "데이터 없음",
    age: "데이터 없음",
  };

  // input 태그를 직접 잡기 위한 useRef
  const username = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameValue = username.current.value;
    const passwordValue = password.current.value;

    console.log("Header에서 받은 데이터:", human);
    console.log("username:", usernameValue);
    console.log("password:", passwordValue);

    if (usernameValue === "") {
      alert("아이디를 입력하세요.");
      username.current.focus();
      return;
    }

    if (passwordValue === "") {
      alert("비밀번호를 입력하세요.");
      password.current.focus();
      return;
    }

    const user = {
      username: usernameValue,
      password: passwordValue,
    };

    try {
      const response = await fetch("http://localhost:8080/member/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("로그인 실패:", data);
        alert("로그인 실패");
        return;
      }

      console.log("로그인 성공:", data);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("username", data.username);

      alert("로그인 성공");
    } catch (error) {
      console.error("로그인 요청 에러:", error);
      alert("서버 요청 실패");
    }
  };

  return (
    <>
      <h1>Member Login Page</h1>

      <h3>
        Header에서 받은 데이터: {human.name}, {human.age}
      </h3>

      <form onSubmit={handleSubmit}>
        <input type="text" ref={username} placeholder="아이디" />
        <input type="password" ref={password} placeholder="비밀번호" />

        <button type="submit">로그인</button>
      </form>
    </>
  );
}
