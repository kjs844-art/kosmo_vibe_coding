import { useParams, useNavigate, Link } from 'react-router-dom'

function QnaDetail() {
    // URL의 :id 값을 읽어서 어떤 질문 상세를 보여줄지 결정합니다.
    const { id } = useParams()
    const navigate = useNavigate()

    // 현재는 임시 상세 데이터입니다. 나중에 id로 서버에서 상세 데이터를 조회합니다.
    const question = {
        id: id,
        title: '단체 주문 가능한가요?',
        author: '빵순이',
        date: '2026-05-25',
        content: `안녕하세요! 다음 주 토요일에 유치원 행사용으로 단체 주문을 하고 싶습니다. 
        단팥빵 30개, 우유 식빵 10개 정도 가능한가요? 
        배달도 가능한지 궁금합니다.`,
        answer: {
            author: '골든 로프 매니저',
            date: '2026-05-26',
            content: `안녕하세요 빵순이님! 골든 로프를 찾아주셔서 감사합니다. 
            말씀하신 수량은 충분히 준비 가능합니다. 
            다만 배달은 매장 인근 지역만 가능하오니 자세한 위치를 알려주시면 안내 도와드리겠습니다. 
            전화로 문의주시면 더 빠른 예약이 가능합니다.`
        }
    }

    return (
        <div className="py-12 max-w-4xl mx-auto px-4">
            <div className="mb-8">
                <button 
                    onClick={() => navigate('/qna')}
                    className="text-amber-700 font-medium hover:underline flex items-center"
                >
                    ← 목록으로 돌아가기
                </button>
            </div>

            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Question Header */}
                <header className="p-8 border-b border-gray-100 bg-amber-50/30">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h1>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>작성자: <b className="text-gray-700">{question.author}</b></span>
                        <span>작성일: {question.date}</span>
                    </div>
                </header>

                {/* Question Body */}
                <div className="p-8 leading-relaxed text-gray-800 whitespace-pre-wrap">
                    {question.content}
                </div>

                {/* Answer Section */}
                {question.answer && (
                    <div className="bg-gray-50 p-8 border-t border-gray-100">
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="bg-amber-700 text-white text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider">Answer</span>
                            <h3 className="font-bold text-gray-900">{question.answer.author}</h3>
                            <span className="text-xs text-gray-400">{question.answer.date}</span>
                        </div>
                        <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {question.answer.content}
                        </div>
                    </div>
                )}
            </article>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
                <button className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                    수정
                </button>
                <button className="px-6 py-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                    삭제
                </button>
            </div>
        </div>
    )
}

export default QnaDetail
