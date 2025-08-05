import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // 检查用户会话
    const checkUserSession = () => {
      try {
        const saved = localStorage.getItem('userSession');
        if (saved) {
          const session = JSON.parse(saved);
          if (session.user && session.loginTime) {
            const loginTime = new Date(session.loginTime);
            const now = new Date();
            const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
            
            // 会话有效期8小时
            if (hoursDiff > 8) {
              localStorage.removeItem('userSession');
              setIsAuthenticated(false);
            } else {
              // 更新最后活动时间
              session.lastActivity = new Date().toISOString();
              localStorage.setItem('userSession', JSON.stringify(session));
              setIsAuthenticated(true);
            }
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('解析用户会话失败:', error);
        localStorage.removeItem('userSession');
        setIsAuthenticated(false);
      }
    };

    checkUserSession();
  }, []);

  // 加载状态
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">验证身份中...</p>
        </div>
      </div>
    );
  }

  // 未登录状态，重定向到登录页面
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 已登录状态，显示子组件
  return <>{children}</>;
}