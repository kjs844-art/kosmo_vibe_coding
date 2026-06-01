import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function MemberJoin() {
  const navigate = useNavigate()

  // 입력창 값을 React state에 담아두고, 제출할 때 MemberDTO 모양으로 백엔드에 보냅니다.
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    setError('')

    // 화면에서도 비밀번호 확인을 먼저 검사해서 불필요한 서버 요청을 줄입니다.
    if (password !== passwordCheck) {
      setError('Password and password check do not match.')
      return
    }

    // Spring Boot의 MemberDTO 필드명과 동일하게 JSON 객체를 만듭니다.
    const memberDTO = {
      username,
      password,
      passwordCheck,
      name,
      email,
    }

    console.log('member join request:', memberDTO)

    // React -> Spring Boot: POST /member/join 으로 회원가입 데이터를 전송합니다.
    fetch('http://localhost:8090/member/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberDTO),
    })
      .then((response) => response.text())
      .then((result) => {
        // 백엔드가 1을 돌려주면 회원가입 성공으로 보고 로그인 화면으로 이동합니다.
        if (result === '1') {
          alert(`Signup complete!\nUsername: ${username}`)
          navigate('/member/login')
          return
        }

        throw new Error('Signup failed. Please check the form values.')
      })
      .catch((err) => {
        console.error('member join error:', err)
        setError(err.message || 'Cannot connect to the server.')
      })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-amber-900">Sign Up</h2>
          <p className="mt-2 text-gray-600">
            Create your Golden Loaf account.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSignupSubmit}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Username
            </label>
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
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              placeholder="password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Password Check
            </label>
            <input
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              placeholder="password again"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              placeholder="name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              placeholder="example@email.com"
              required
            />
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
            Join
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link
              to="/member/login"
              className="ml-2 font-bold text-amber-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default MemberJoin
