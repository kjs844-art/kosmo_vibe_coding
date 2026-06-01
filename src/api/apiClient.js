const API_BASE_URL = 'http://localhost:8090'

// sessionStorage에 저장된 JWT access token을 꺼내옵니다.
const getAccessToken = () => {
    return sessionStorage.getItem('access-token') || sessionStorage.getItem('accessToken')
}

// 로그인 이후 보호된 API를 호출할 때 Authorization 헤더를 자동으로 붙여주는 공통 fetch 함수입니다.
export const authFetch = (path, options = {}) => {
    const token = getAccessToken()

    const headers = {
        ...(options.headers || {}),
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    return fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    })
}

// 로그인/회원가입처럼 토큰이 필요 없는 API도 주소를 한 곳에서 관리하기 위한 공통 함수입니다.
export const apiFetch = (path, options = {}) => {
    return fetch(`${API_BASE_URL}${path}`, options)
}
