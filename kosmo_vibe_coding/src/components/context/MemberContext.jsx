import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [member, setMember] = useState(() => {
    const memberInfo = localStorage.getItem("member");
    return memberInfo ? JSON.parse(memberInfo) : null;
  });

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken");
  });

  const login = (data) => {
    const memberInfo = {
      username: data.username,
      name: data.name,
      email: data.email,
    };

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      setAccessToken(data.accessToken);
    }

    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }

    localStorage.setItem("member", JSON.stringify(memberInfo));
    setMember(memberInfo);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("member");

    setAccessToken(null);
    setMember(null);
  };

  const isLogin = !!member && !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        member,
        setMember,
        accessToken,
        setAccessToken,
        isLogin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 편하게 사용하기 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);
