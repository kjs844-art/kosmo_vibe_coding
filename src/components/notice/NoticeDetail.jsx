import { Link } from 'react-router-dom'

function NoticeDetail() {
    // 현재는 임시 상세 데이터입니다. 나중에 URL의 id를 읽어서 서버/Firebase에서 실제 공지를 가져옵니다.
    const notice = {
        title: '골든 로프 홈페이지가 오픈되었습니다!',
        date: '2026-05-28',
        content: `안녕하세요, 골든 로프 베이커리입니다. \n\n 
        오랫동안 준비해온 저희 홈페이지가 드디어 오픈되었습니다! 
        이제 온라인에서도 저희의 메뉴와 공지사항을 확인하실 수 있습니다. \n\n
        매일 아침 구워내는 신선한 빵을 더욱 가깝게 느껴보세요. 
        항상 정직하고 맛있는 빵으로 보답하겠습니다. \n\n
        감사합니다.`
    }

    return (
        <div className="py-12 max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-8 border-b border-gray-100 bg-amber-50">
                    <h1 className="text-2xl font-bold text-amber-900 mb-2">{notice.title}</h1>
                    <p className="text-sm text-gray-500">{notice.date}</p>
                </div>
                <div className="px-6 py-10">
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed min-h-[300px]">
                        {notice.content}
                    </div>
                </div>
                <div className="px-6 py-6 bg-gray-50 border-t border-gray-200">
                    <Link 
                        to="/notice" 
                        className="text-amber-800 font-medium hover:text-amber-600 transition-colors flex items-center"
                    >
                        <span>&larr; 목록으로 돌아가기</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NoticeDetail
