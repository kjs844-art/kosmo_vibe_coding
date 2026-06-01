import { Link } from 'react-router-dom'

function Header() {
    // 모든 페이지 상단에 고정으로 보이는 네비게이션입니다.
    return (
        <header className="bg-white border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <Link to="/" className="text-2xl font-bold text-amber-800">
                        Golden Loaf
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        <Link to="/intro" className="text-gray-600 hover:text-amber-700 font-medium">소개</Link>
                        <Link to="/list" className="text-gray-600 hover:text-amber-700 font-medium">빵 목록</Link>
                        <Link to="/notice" className="text-gray-600 hover:text-amber-700 font-medium">공지사항</Link>
                        <Link to="/qna" className="text-gray-600 hover:text-amber-700 font-medium">QnA</Link>
                    </div>
                </div>
                <div>
                    <Link 
                        to="/member/login" 
                        className="bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition-colors"
                    >
                        로그인
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header
