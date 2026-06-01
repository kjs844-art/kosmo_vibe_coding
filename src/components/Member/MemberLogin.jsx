import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function MemberLogin({ onLoginSuccess }) {
    const navigate = useNavigate()

    // 화면 입력값을 React state에 담아두고, 제출할 때 로그인 JSON으로 백엔드에 보냅니다.
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        setError('')

        // Spring Security JwtLoginFilter가 읽을 수 있도록 MemberDTO와 같은 필드명으로 보냅니다.
        const loginData = {
            username,
            password,
        }

        // React -> Spring Boot: POST /member/login 으로 로그인 데이터를 전송합니다.
        fetch('http://localhost:8090/member/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('로그인 실패')
                }

                return response.json()
            })
            .then((tokenData) => {
                // 백엔드가 보내준 {"access-token": "...", "refresh-token": "..."} 구조입니다.
                console.log('서버로부터 발급받은 토큰:', tokenData)

                // App.jsx로 토큰을 넘겨 sessionStorage 저장을 맡깁니다.
                onLoginSuccess(tokenData)

                alert(`${username}님! 골든 로프에 로그인되었습니다.`)
                navigate('/')
            })
            .catch((err) => {
                console.error('member login error:', err)
                setError('아이디 또는 비밀번호를 확인해주세요.')
            })
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-amber-900">로그인</h2>
                    <p className="mt-2 text-gray-600">골든 로프에 오신 것을 환영합니다.</p>
                </div>

                <form className="space-y-6" onSubmit={handleLoginSubmit}>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">아이디</label>
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                            placeholder="username"
                            required
                        />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-gray-700">비밀번호</label>
                            <a href="#" className="text-xs text-amber-700 hover:underline">비밀번호 찾기</a>
                        </div>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <input id="remember" type="checkbox" className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">로그인 상태 유지</label>
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                            {error}
                        </p>
                    )}

                    <button 
                        type="submit" 
                        className="w-full bg-amber-700 text-white font-bold py-4 rounded-xl hover:bg-amber-800 shadow-lg shadow-amber-700/20 transition-all active:scale-95"
                    >
                        로그인하기
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-sm text-gray-600">
                        아직 회원이 아니신가요? 
                        <Link to="/member/join" className="ml-2 font-bold text-amber-700 hover:underline">회원가입</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MemberLogin;
