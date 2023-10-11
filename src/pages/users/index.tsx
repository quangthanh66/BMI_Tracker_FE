import USERS_API from '@app/api/users';
import { UserItemTypes } from '@app/api/users/type';
import { setUser } from '@app/store/slices/userSlice';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const UsersManagement = () => {
  const [users, setUsers] = useState<UserItemTypes[]>([]);
  const { refetch, isLoading } = useQuery(['users-list'], USERS_API.GET_LIST, {
    enabled: false,
    onSuccess: (users: UserItemTypes[]) => {
      setUser(users);
    },
    onError: () => {},
  });

  // Initial page with get users list
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <h1 className="text-blue-500">Users management</h1>
    </div>
  );
};

export default UsersManagement;
