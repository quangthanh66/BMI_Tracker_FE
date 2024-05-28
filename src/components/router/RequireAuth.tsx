import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { WithChildrenProps } from '@app/types/generalTypes';

const RequireAuth: React.FC<WithChildrenProps> = ({ children }) => {
  const token = useAppSelector((state: any) => state.app.userProfile.payload.accessToken) || '';

  return token ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

export default RequireAuth;
