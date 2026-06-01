import { Link } from 'react-router-dom'

function Main() {
    // 메인 화면에 보여줄 추천 상품 임시 데이터입니다.
    const featuredProducts = [
        { id: 1, name: '플레인 바게트', price: '3,500원', image: '🥖' },
        { id: 2, name: '우유 식빵', price: '4,500원', image: '🍞' },
        { id: 5, name: '소금빵', price: '2,800원', image: '🥨' },
    ]

    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative bg-amber-50 rounded-3xl overflow-hidden mt-8">
                <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 flex flex-col items-center text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-amber-900 sm:text-6xl">
                        매일 아침 구워내는<br />
                        <span className="text-amber-600">신선한 행복, 골든 로프</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-amber-800 max-w-2xl">
                        엄선된 재료와 정통 베이킹 기법으로 완성된 빵의 풍미를 느껴보세요. 
                        우리의 빵은 단순한 음식을 넘어 따뜻한 위로와 즐거움을 전합니다.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <Link
                            to="/list"
                            className="rounded-full bg-amber-700 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 transition-all"
                        >
                            빵 목록 보기
                        </Link>
                        <Link to="/intro" className="text-sm font-semibold leading-6 text-amber-900">
                            브랜드 스토리 <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section>
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">오늘의 추천 빵</h2>
                        <p className="mt-2 text-gray-600">골든 로프가 엄선한 베스트 메뉴입니다.</p>
                    </div>
                    <Link to="/list" className="text-amber-700 font-medium hover:text-amber-800">
                        전체 보기 →
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="h-64 w-full overflow-hidden rounded-2xl bg-amber-50 flex items-center justify-center text-7xl group-hover:opacity-75 transition-opacity">
                                {product.image}
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        <Link to="/list">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">인기 상품</p>
                                </div>
                                <p className="text-lg font-semibold text-amber-700">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recent Section Placeholder */}
            <section className="bg-gray-50 rounded-3xl p-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900">따끈따끈한 소식</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">공지사항</span>
                        <h3 className="mt-2 text-lg font-bold">신제품 '통밀 깜빠뉴' 출시 안내</h3>
                        <p className="mt-2 text-sm text-gray-500">더욱 건강하고 고소한 통밀의 맛을 즐겨보세요...</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">QnA</span>
                        <h3 className="mt-2 text-lg font-bold">단체 주문 문의드립니다.</h3>
                        <p className="mt-2 text-sm text-gray-500">혹시 유치원 간식용으로 30개 정도 주문 가능한가요?</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Main
