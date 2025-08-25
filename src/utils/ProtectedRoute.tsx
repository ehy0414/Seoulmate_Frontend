import React from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/axios';

// ProtectedRoute 컴포넌트가 받을 props 타입을 정의합니다.
// children은 이 컴포넌트가 감싸게 될 자식 컴포넌트(페이지)를 의미합니다.
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [authChecked, setAuthChecked] = React.useState(false);
  const [isAuthed, setIsAuthed] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const profileRes = await api.get("/auth/profile-info");
        // sessionId가 있으면 통과
        if (profileRes.data.data.sessionId) {
          setIsAuthed(true);
        } else {
          setIsAuthed(false);
        }
      } catch {
        setIsAuthed(false);
      } finally {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, []);

  if (!authChecked) return null; // 또는 로딩 스피너
  if (!isAuthed) {
    alert("잘못된 접근입니다.");
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;