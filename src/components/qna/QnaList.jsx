import { Link } from 'react-router-dom'

function QnaList() {
    // 현재는 임시 질문 목록입니다. 나중에 백엔드 또는 Firebase 목록 조회로 교체할 수 있습니다.
    const questions = [
        { id: 1, title: '단체 주문 가능한가요?', author: '빵순이', date: '2026-05-25', status: '답변완료' },
        { id: 2, title: '보관 방법이 궁금합니다.', author: '김철수', date: '2026-05-24', status: '답변대기' },
        { id: 3, title: '호밀빵 품절인가요?', author: '이영희', date: '2026-05-23', status: '답변완료' },
        { id: 4, title: '주차장 있나요?', author: '박지성', date: '2026-05-22', status: '답변대기' },
    ]

    return (
        <div className="py-12 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-12 px-4">
                <h1 className="text-3xl font-bold text-gray-900">QnA 게시판</h1>
                <Link 
                    to="/qna/write" 
                    className="bg-amber-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-800 transition-colors"
                >
                    질문하기
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-amber-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-amber-900 uppercase">번호</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-amber-900 uppercase">제목</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-amber-900 uppercase">작성자</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-amber-900 uppercase">작성일</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-amber-900 uppercase">상태</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {questions.map((q) => (
                            <tr key={q.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{q.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <Link to={`/qna/${q.id}`} className="hover:text-amber-700">{q.title}</Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{q.author}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{q.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        q.status === '답변완료' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                    }`}>
                                        {q.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-8 flex justify-center space-x-2">
                <button className="px-3 py-1 border rounded text-gray-400 hover:bg-gray-50">이전</button>
                <button className="px-3 py-1 border rounded bg-amber-700 text-white font-bold">1</button>
                <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border rounded text-gray-400 hover:bg-gray-50">다음</button>
            </div>
        </div>
    )
}

export default QnaList
