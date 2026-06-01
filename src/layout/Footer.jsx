function Footer() {
    // 모든 페이지 하단에 공통으로 보이는 푸터입니다.
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex justify-center space-x-6 md:order-2">
                        <p className="text-gray-500 text-sm">
                            &copy; 2026 Golden Loaf Bakery. All rights reserved.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-center text-base text-gray-400">
                            매일 아침 신선한 빵을 굽는 골든 로프 베이커리입니다.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
