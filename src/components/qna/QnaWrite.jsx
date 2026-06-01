import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function QnaWrite() {
    const navigate = useNavigate()

    // 질문 작성 폼의 제목/내용 입력값을 한 객체로 관리합니다.
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // 나중에 이 자리에서 백엔드로 질문 등록 요청을 보냅니다.
        alert('질문이 등록되었습니다! (Mock Action)')
        navigate('/qna')
    }

    return (
        <div className="py-12 max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">질문하기</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">
                        제목
                    </label>
                    <input
                        type="text"
                        id="title"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                        placeholder="제목을 입력해주세요"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-bold text-gray-700 mb-2">
                        내용
                    </label>
                    <textarea
                        id="content"
                        rows="12"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
                        placeholder="궁금하신 내용을 자세히 적어주세요"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                    />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/qna')}
                        className="px-8 py-3 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="px-10 py-3 rounded-xl bg-amber-700 text-white font-bold hover:bg-amber-800 shadow-lg shadow-amber-700/20 transition-all active:scale-95"
                    >
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    )
}

export default QnaWrite
