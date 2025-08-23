import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute 컴포넌트가 받을 props 타입을 정의합니다.
// children은 이 컴포넌트가 감싸게 될 자식 컴포넌트(페이지)를 의미합니다.
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // localStorage에서 sessionId를 가져옵니다.
  const sessionId = localStorage.getItem('sessionId');

  // sessionId가 없다면 (로그인하지 않은 상태라면)
  if (!sessionId) {
    // 홈('/') 경로로 리디렉션합니다.
    // 'replace' 옵션은 히스토리 스택에 현재 경로를 남기지 않아,
    // 사용자가 '뒤로 가기' 버튼을 눌렀을 때 다시 보호된 페이지로 돌아오는 것을 방지합니다.
    alert("잘못된 접근입니다.");
    return <Navigate to="/" replace />;
  }

  // sessionId가 있다면 (로그인한 상태라면)
  // 자식 컴포넌트(요청된 실제 페이지)를 렌더링합니다.
  return <>{children}</>;
};

export default ProtectedRoute;