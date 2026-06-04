# API 명세서 (Milestone 2)

## 1. 회원가입 API (Profile Image 포함)
- **Endpoint**: `POST /member/join`
  *(참고: 요청사항의 AuthController/signup 경로 대신 기존 구조인 MemberApiController의 /member/join 경로를 유지합니다.)*
- **Content-Type**: `multipart/form-data`
- **Description**: 사용자 회원가입을 처리하며, 프로필 이미지를 선택적으로 업로드할 수 있습니다.
- **Request Parameters**:
  - `signupData` (Part, 필수): 회원가입 정보 JSON 데이터 (`MemberDTO` 매핑)
    - `username` (String, 필수): 회원 아이디
    - `password` (String, 필수): 비밀번호
    - `passwordCheck` (String, 필수): 비밀번호 확인
    - `name` (String, 필수): 닉네임/이름
    - `email` (String, 필수): 이메일
  - `profileImage` (Part, 선택): 프로필 이미지 파일 (`MultipartFile`)
    - 지원 확장자: jpg, jpeg, png, webp
    - 최대 용량: 5MB
- **Response**:
  - 기존 로직 호환 (성공 시 `1`, 실패 시 `0` 반환) 또는 JSON 형태의 `{"message": "회원가입이 성공적으로 완료되었습니다."}` 반환 (구현 시 조정)

## 2. 로그인 API
- **Endpoint**: 기존 경로 (예: `POST /login`)
- **Content-Type**: `application/json`
- **Description**: JWT 방식의 기존 로그인 흐름을 유지합니다.

---

## [TODO: 후속 구현 예정 API]

### 3. 내 정보 조회 API
- **Endpoint**: `GET /member/me`
- **Description**: 현재 로그인된 사용자의 정보와 프로필 이미지 저장 경로(URL)를 반환합니다.

### 4. 프로필 이미지 조회 API
- **Endpoint**: `GET /member/profile-image/{filename}` 또는 정적 리소스 서빙
- **Description**: 업로드된 물리적 파일을 브라우저로 응답합니다.

### 5. 프로필 이미지 수정 API
- **Endpoint**: `PUT /member/profile-image`
- **Content-Type**: `multipart/form-data`
- **Description**: 기존 프로필 이미지를 덮어쓰고, DB 메타데이터를 갱신합니다.

### 6. 프로필 이미지 삭제 API
- **Endpoint**: `DELETE /member/profile-image`
- **Description**: 서버에서 이미지 파일을 삭제하고, DB 매핑 정보를 초기화합니다.
