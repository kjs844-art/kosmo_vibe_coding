import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function NoticeList() {
    // 공지 목록 데이터와 로딩 상태를 화면 안에서 관리합니다.
    const [notices, setNotices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        // 화면이 처음 열릴 때 sessionStorage의 JWT를 꺼내 공지 목록 API로 보냅니다.
        const fetchNotices = async () => {
            try {
                const accessToken = sessionStorage.getItem('access-token') || sessionStorage.getItem('accessToken')

                const response = await fetch('http://localhost:8090/notice/list', {
                    method: 'GET',
                    headers: {
                        // 백엔드 JwtAuthenticationFilter가 읽는 형식입니다: Authorization: Bearer 토큰값
                        Authorization: `Bearer ${accessToken}`,
                    },
                })

                if (!response.ok) {
                    throw new Error('공지사항을 불러오지 못했습니다.')
                }

                const data = await response.json()
                setNotices(Array.isArray(data) ? data : [data])
            } catch (error) {
                console.error('notice list error:', error)
                setError('로그인 후 공지사항을 다시 열어주세요.')
            } finally {
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
                    ) : error ? (
                        <li className="p-10 text-center text-red-600">{error}</li>
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
