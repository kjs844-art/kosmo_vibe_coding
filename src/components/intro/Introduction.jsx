function Introduction() {
    return (
        <div className="py-12 bg-white">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold text-amber-900 mb-8 text-center">
                    우리 가게 이야기
                </h1>
                
                <div className="prose prose-amber lg:prose-xl mx-auto text-gray-700">
                    <p className="mb-6 leading-relaxed">
                        골든 로프(Golden Loaf)는 2026년, 작은 골목길에서 신선한 빵의 향기와 함께 시작되었습니다. 
                        우리는 가장 단순한 재료인 밀가루, 물, 그리고 효모가 만들어내는 마법을 믿습니다.
                    </p>
                    
                    <div className="my-10 bg-amber-50 p-8 rounded-2xl border-l-4 border-amber-500">
                        <h2 className="text-2xl font-bold text-amber-800 mb-4">우리의 철학</h2>
                        <p className="italic text-amber-900">
                            "천천히, 정직하게, 그리고 따뜻하게."
                        </p>
                        <p className="mt-4">
                            대량 생산되는 빵이 아닌, 매일 새벽 정성을 다해 반죽하고 굽는 슬로우 브레드를 지향합니다. 
                            화학 첨가물을 사용하지 않고 천연 발효종을 사용하여 건강하고 소화가 잘 되는 빵을 만듭니다.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-amber-800 mt-12 mb-6 text-center underline decoration-amber-300 underline-offset-8">
                        오늘 구운 신선함
                    </h2>
                    <p className="mb-6 leading-relaxed">
                        우리의 오븐은 매일 아침 6시에 예열을 시작합니다. 
                        바삭한 껍질의 바게트부터 보들보들한 식빵까지, 골든 로프의 모든 빵에는 그날의 온도가 담겨 있습니다.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Introduction
