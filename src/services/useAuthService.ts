import { useMutation } from 'shared/hooks';
import { useAuthStore } from 'store/auth';

const useAuthService = () => {
  const authStore = useAuthStore();

  const loginMutation = useMutation('/delay/2');

  const login = async (username: string, password: string) => {
    await loginMutation.mutate({ username, password });
    authStore.login('token');
  };

  return { login, loginMutation };
};

export default useAuthService;
