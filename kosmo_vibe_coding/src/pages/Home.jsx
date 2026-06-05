import "./Home.css";

function Home() {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    return (
        <div className="home-container">
            <div className="home-card">
                <h2>🏠 Home Page</h2>
                <p>로그인 테스트용 메인 페이지입니다.</p>

                {token ? (
                    <div className="login-status success">
                        <span className="status-icon">✅</span>
                        <div>
                            <strong>로그인 상태</strong>
                            <p>이메일: {email}</p>
                        </div>
                    </div>
                ) : (
                    <div className="login-status warning">
                        <span className="status-icon">⚠️</span>
                        <div>
                            <strong>비로그인 상태</strong>
                            <p>로그인 페이지에서 로그인해주세요.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
