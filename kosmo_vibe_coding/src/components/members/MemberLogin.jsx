import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/MemberContext";

export default function MemberLogin() {
  const username = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameValue = username.current.value;
    const passwordValue = password.current.value;

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

    fetch("http://localhost:8080/member/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log("로그인 응답:", r);

        if (!r.accessToken) {
          alert("로그인 실패");
          return;
        }

        // Context와 localStorage를 동시에 갱신
        login(r);

        alert("로그인 성공");
        navigate("/");
      })
      .catch((e) => {
        console.log("로그인 요청 에러:", e);
        alert("서버 요청 실패");
      });
  };

  return (
    <>
      <h1>Member Login Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" ref={username} placeholder="아이디" />
        </div>

        <div>
          <input type="password" ref={password} placeholder="비밀번호" />
        </div>

        <button type="submit">로그인</button>
      </form>
    </>
  );
}
