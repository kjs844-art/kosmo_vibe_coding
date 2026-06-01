function ProductList() {
    // 상품 목록 화면에 보여줄 빵 데이터입니다. 나중에 DB/API 데이터로 교체 가능합니다.
    const products = [
        { id: 1, name: '플레인 바게트', price: '3,500원', description: '겉은 바삭하고 속은 촉촉한 정통 프랑스식 바게트', image: '🥖' },
        { id: 2, name: '우유 식빵', price: '4,500원', description: '신선한 우유로 반죽해 더욱 부드럽고 고소한 식빵', image: '🍞' },
        { id: 3, name: '치즈 치아바타', price: '4,000원', description: '롤치즈가 콕콕 박혀 짭짤하고 쫄깃한 식감의 치아바타', image: '🥯' },
        { id: 4, name: '무화과 깜빠뉴', price: '5,500원', description: '달콤한 건무화과와 고소한 호두가 어우러진 건강빵', image: '🥐' },
        { id: 5, name: '소금빵', price: '2,800원', description: '고급 버터의 풍미와 말돈 소금의 깔끔한 짠맛', image: '🥨' },
        { id: 6, name: '크루아상', price: '3,800원', description: '겹겹이 쌓인 버터의 결이 살아있는 바삭한 크루아상', image: '🥐' },
    ]

    return (
        <div className="py-12 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-amber-900 mb-4">우리의 빵</h1>
                <p className="text-gray-600">매일 아침 정성을 다해 굽는 신선한 빵들입니다.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                        <div className="h-48 bg-amber-50 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                            {product.image}
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                                <span className="text-amber-700 font-semibold">{product.price}</span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {product.description}
                            </p>
                            <button className="mt-6 w-full py-2 bg-amber-100 text-amber-800 rounded-lg font-medium hover:bg-amber-200 transition-colors">
                                자세히 보기
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList
