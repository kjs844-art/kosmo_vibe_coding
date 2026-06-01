import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './layout/header'
import Footer from './layout/Footer'
import MemberLogin from './components/Member/MemberLogin'
import MemberJoin from './components/Member/MemberJoin'
import NoticeList from './components/notice/NoticeList'
import NoticeDetail from './components/notice/NoticeDetail'
import Main from './components/Main'
import ProductList from './components/products/ProductList'
import QnaList from './components/qna/QnaList'
import QnaDetail from './components/qna/QnaDetail'
import QnaWrite from './components/qna/QnaWrite'

// 소개 페이지 임시 컴포넌트입니다. 나중에 별도 파일로 분리할 수 있습니다.
const Introduction = () => (
  <div className="py-20 text-center">
    <h1 className="text-4xl font-bold text-amber-900 mb-8">골든 로프 이야기</h1>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      골든 로프는 1980년부터 이어져 온 전통 베이커리입니다.<br />
      최고급 밀가루와 천연 발효종을 사용하여 건강하고 맛있는 빵을 만듭니다.
    </p>
  </div>
)

function App() {
  const handleLoginSuccess = (tokenData) => {
    // Login 화면에서 받은 JWT 토큰을 브라우저 세션 저장소에 보관합니다.
    sessionStorage.setItem('access-token', tokenData['access-token'])
    sessionStorage.setItem('refresh-token', tokenData['refresh-token'])
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* URL 주소에 따라 어떤 화면 컴포넌트를 보여줄지 연결하는 라우터 영역입니다. */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/intro" element={<Introduction />} />
            <Route path="/list" element={<ProductList />} />
            <Route path="/notice" element={<NoticeList />} />
            <Route path="/notice/detail" element={<NoticeDetail />} />
            
            {/* QnA 화면 묶음: 목록, 상세, 글쓰기 */}
            <Route path="/qna" element={<QnaList />} />
            <Route path="/qna/:id" element={<QnaDetail />} />
            <Route path="/qna/write" element={<QnaWrite />} />
            
            {/* Member 화면 묶음: 로그인, 회원가입 */}
            <Route path="/member/login" element={<MemberLogin onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/member/join" element={<MemberJoin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
