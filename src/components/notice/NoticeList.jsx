import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase/config'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

function NoticeList() {
    // 공지 목록 데이터와 로딩 상태를 화면 안에서 관리합니다.
    const [notices, setNotices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 화면이 처음 열릴 때 공지 데이터를 가져오는 자리입니다.
        const fetchNotices = async () => {
            try {
                // If Firebase is not configured, we'll use mock data
                // In a real app, this would be: const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
                // But since keys are placeholders, we handle the error
                const mockNotices = [
                    { id: 1, title: '골든 로프 홈페이지가 오픈되었습니다!', date: '2026-05-28' },
                    { id: 2, title: '6월 신제품: 무화과 깜빠뉴 출시 안내', date: '2026-05-25' },
                    { id: 3, title: '매장 운영 시간 변경 안내', date: '2026-05-20' },
                ]
                setNotices(mockNotices)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching notices:", error)
                setLoading(false)
            }
        }

        fetchNotices()
    }, [])

    return (
        <div className="py-12 max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-10 border-b-2 border-amber-500 pb-4 inline-block">
                공지사항
            </h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
                <ul className="divide-y divide-gray-200">
                    {loading ? (
                        <li className="p-10 text-center text-gray-500">불러오는 중...</li>
                    ) : notices.length > 0 ? (
                        notices.map((notice) => (
                            <li key={notice.id}>
                                <Link to={`/notice/detail?id=${notice.id}`} className="block hover:bg-amber-50 transition-colors">
                                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                        <div className="text-lg font-medium text-amber-900 truncate">
                                            {notice.title}
                                        </div>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600">
                                                {notice.date}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className="p-10 text-center text-gray-500">등록된 공지사항이 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default NoticeList
