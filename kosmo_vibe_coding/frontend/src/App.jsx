import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-black text-blue-600 tracking-tight">toss stock</Link>
        <nav className="flex items-center space-x-6 text-sm font-semibold text-slate-600">
          <Link to="/board" className="hover:text-slate-900 transition-colors">게시판</Link>
          <Link to="/notice" className="hover:text-slate-900 transition-colors">공지사항</Link>
          {user ? (
            <div className="flex items-center gap-4 border-l border-slate-100 pl-6">
              <span className="text-slate-800 font-bold">{user.nickname}님</span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all duration-150"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all duration-150 shadow-sm"
              >
                로그인
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

const Home = () => {
  const { user } = useAuth();
  const [stocks, setStocks] = React.useState([]);
  const [selectedStock, setSelectedStock] = React.useState(null);
  const [error, setError] = React.useState(null);

  // 실시간 주식 데이터 가져오기
  const loadStocks = async () => {
    try {
      const { fetchAPI } = await import('./utils/api');
      const data = await fetchAPI('/stocks');
      setStocks(data);
      setError(null);
    } catch (err) {
      setError('주식 정보를 가져오지 못했습니다.');
    }
  };

  React.useEffect(() => {
    loadStocks();
    // 3초 간격으로 실시간 주가 갱신 (폴링)
    const interval = setInterval(loadStocks, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      {/* 웰컴 인사 및 퀵 링크 카드 */}
      <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
        <h1 className="text-2xl font-black text-blue-600 tracking-tight mb-1">Toss Stock Vibe</h1>
        <p className="text-xs text-slate-400 mb-6 font-semibold">실시간 시뮬레이션 기반 주식 커뮤니티</p>
        
        {user && (
          <div className="mb-5 p-3.5 bg-blue-50/40 rounded-2xl text-xs text-blue-800 border border-blue-100/30 font-bold">
            💡 {user.nickname}님, 오늘도 성투하세요!
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Link to="/board" className="py-3 px-4 bg-blue-600 text-white rounded-2xl font-bold text-xs hover:bg-blue-700 transition-all shadow-sm active:scale-95 text-center">
            자유게시판
          </Link>
          <Link to="/notice" className="py-3 px-4 bg-slate-50 text-slate-600 border border-slate-200/50 rounded-2xl font-bold text-xs hover:bg-slate-100 transition-all active:scale-95 text-center">
            공지사항
          </Link>
        </div>
      </div>

      {/* 실시간 인기 주식 리스트 카드 */}
      <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            🔥 실시간 인기 주식
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </h2>
          <span className="text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded-full">3초마다 갱신</span>
        </div>

        {error && <p className="text-xs text-red-500 text-center font-medium my-4">{error}</p>}

        <div className="divide-y divide-slate-50">
          {stocks.length === 0 && !error ? (
            <div className="text-center py-8 text-xs text-slate-400 font-semibold">
              주식 시세를 받아오는 중...
            </div>
          ) : (
            stocks.map((stock) => {
              const isPlus = stock.changeRate >= 0;
              return (
                <div 
                  key={stock.code} 
                  onClick={() => setSelectedStock(selectedStock?.code === stock.code ? null : stock)}
                  className={`py-3.5 flex items-center justify-between cursor-pointer rounded-2xl px-2 -mx-2 transition-all duration-200 hover:bg-slate-50/80 ${selectedStock?.code === stock.code ? 'bg-slate-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    {/* 종목코드 로고 대체 디자인 */}
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-black select-none ${isPlus ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                      {stock.name.substring(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{stock.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold tracking-wider">{stock.code}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black text-slate-800">{stock.price.toLocaleString()}원</div>
                    <div className={`text-xs font-bold ${isPlus ? 'text-red-500' : 'text-blue-500'}`}>
                      {isPlus ? '▲' : '▼'} {stock.changePrice.toLocaleString()} ({isPlus ? '+' : ''}{stock.changeRate}%)
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 선택된 주식 상세 변동 추이 (Sparkline 모의 그래프) */}
      {selectedStock && (
        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm animate-fadeIn">
          <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
            <div>
              <h3 className="text-sm font-black text-slate-800">{selectedStock.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold">최근 7회 거래 시세 변동 흐름</p>
            </div>
            <button 
              onClick={() => setSelectedStock(null)} 
              className="text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              닫기
            </button>
          </div>

          {/* 간이 차트 시각화 */}
          <div className="h-16 flex items-end justify-between gap-2.5 px-3 mt-4">
            {selectedStock.history && selectedStock.history.map((hPrice, idx) => {
              const max = Math.max(...selectedStock.history);
              const min = Math.min(...selectedStock.history);
              const heightPercent = max === min ? 50 : ((hPrice - min) / (max - min)) * 70 + 20; // 최소 20% ~ 최대 90% 높이값

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                  {/* 말풍선으로 주가 툴팁 */}
                  <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[9px] py-1 px-1.5 rounded-lg font-bold shadow-md z-10 whitespace-nowrap pointer-events-none">
                    {hPrice.toLocaleString()}원
                  </div>
                  <div 
                    style={{ height: `${heightPercent}%` }} 
                    className={`w-full rounded-t-md transition-all duration-500 ${selectedStock.changeRate >= 0 ? 'bg-red-400 group-hover:bg-red-500' : 'bg-blue-400 group-hover:bg-blue-500'}`}
                  ></div>
                  <span className="text-[8px] text-slate-400 font-bold">{idx + 1}회</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Board = () => (
  <div className="p-8 max-w-md mx-auto bg-white rounded-3xl shadow-sm mt-10 border border-slate-50">
    <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">자유게시판</h2>
    <p className="text-slate-500 text-sm mb-6">아직 작성된 글이 없습니다.</p>
    <Link to="/" className="text-blue-600 font-bold text-sm hover:underline">홈으로 돌아가기</Link>
  </div>
);

const Notice = () => (
  <div className="p-8 max-w-md mx-auto bg-white rounded-3xl shadow-sm mt-10 border border-slate-50">
    <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">공지사항</h2>
    <p className="text-slate-500 text-sm mb-6">첫 번째 공지사항이 준비 중입니다.</p>
    <Link to="/" className="text-blue-600 font-bold text-sm hover:underline">홈으로 돌아가기</Link>
  </div>
);

const MainLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-slate-500 text-xs font-semibold">정보를 가져오는 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-10 w-full flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/notice" element={<Notice />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
