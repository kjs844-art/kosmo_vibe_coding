import { useState } from "react";
import "./Login.css";

/**
 * 로그인 페이지 (선생님 수업 방식)
 *
 * 백엔드 API : POST http://localhost:8080/member/login
 * 요청 JSON  : { "email": "test@test.com", "password": "1234" }
 * 성공 응답  : { "username": "...", "accessToken": "...", "refreshToken": "..." }
 */
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // localStorage에 저장된 현재 상태 표시용
    const [localData, setLocalData] = useState({
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
        username: localStorage.getItem("username"),
    });

    const refreshLocalData = () => {
        setLocalData({
            accessToken: localStorage.getItem("accessToken"),
            refreshToken: localStorage.getItem("refreshToken"),
            username: localStorage.getItem("username"),
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch("http://localhost:8080/member/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setResult({ type: "error", message: "로그인 실패: " + (data.message || JSON.stringify(data)) });
                return;
            }

            // 선생님 방식: accessToken + refreshToken + username 저장
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("username", data.username);

            refreshLocalData();

            console.log("✅ 로그인 성공:", data);
            setResult({ type: "success", message: `로그인 성공! username: ${data.username}` });

        } catch (error) {
            console.error("❌ 로그인 요청 실패:", error);
            setResult({ type: "error", message: "서버 연결 실패: " + error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        refreshLocalData();
        setResult({ type: "info", message: "로그아웃 되었습니다." });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-icon">🔐</div>
                    <h2>Login</h2>
                    <p>POST /member/login → JWT 로그인 테스트</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">이메일 (Email)</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="test@test.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">비밀번호 (Password)</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="비밀번호 입력"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-login" disabled={loading}>
                        {loading ? "로그인 중..." : "Login"}
                    </button>
                </form>

                {result && (
                    <div className={`result-box result-${result.type}`}>
                        {result.type === "success" && "✅ "}
                        {result.type === "error" && "❌ "}
                        {result.type === "info" && "ℹ️ "}
                        {result.message}
                    </div>
                )}

                {/* localStorage 저장 상태 디버그 패널 */}
                <div className="debug-section">
                    <div className="debug-title">🔍 localStorage 저장 상태</div>
                    <div className="debug-item">
                        <span>username:</span>
                        <code>{localData.username || "없음"}</code>
                    </div>
                    <div className="debug-item">
                        <span>accessToken:</span>
                        <code>{localData.accessToken ? "저장됨 ✅" : "없음"}</code>
                    </div>
                    <div className="debug-item">
                        <span>refreshToken:</span>
                        <code>{localData.refreshToken ? "저장됨 ✅" : "없음"}</code>
                    </div>
                    <button onClick={handleLogout} className="btn-logout">
                        로그아웃 (localStorage 초기화)
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
