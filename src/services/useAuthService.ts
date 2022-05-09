import { useMutation } from 'shared/hooks';
import { useAuthStore } from 'store/auth';

const useAuthService = () => {
  const authStore = useAuthStore();

  const loginMutation = useMutation<{ accessToken: string }>({
    method: 'post',
    url: '/auth/login'
  });

  const login = async (username: string, password: string) => {
    const response = await loginMutation.mutate({
      username,
      password
    });

    authStore.login(response.data.accessToken);
  };

  return { login, loginMutation };
};

export default useAuthService;
