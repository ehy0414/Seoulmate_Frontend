import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute 컴포넌트가 받을 props 타입을 정의합니다.
// children은 이 컴포넌트가 감싸게 될 자식 컴포넌트(페이지)를 의미합니다.
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // 쿠키에서 JSESSIONID 존재 여부로 인증 판별
  const hasJSessionId = document.cookie.split(';').some(cookie => cookie.trim().startsWith('JSESSIONID='));

  if (!hasJSessionId) {
    alert("잘못된 접근입니다.");
    return <Navigate to="/" replace />;
  }
    // [로컬스토리지 방식 예시] 기존 sessionId 인증 방식 (주석)
    // const sessionId = localStorage.getItem('sessionId');
    // if (!sessionId) {
    //   alert("잘못된 접근입니다.");
    //   return <Navigate to="/" replace />;
    // }
  return <>{children}</>;
};

export default ProtectedRoute;