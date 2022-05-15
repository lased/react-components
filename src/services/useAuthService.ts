import { useMutation } from 'shared/hooks';
import { useAuthStore } from 'store/auth';
import { API } from 'api';

const useAuthService = () => {
  const authStore = useAuthStore();

  const loginMutation = useMutation<{ accessToken: string }>({
    method: 'post',
    url: API.LOGIN
  });

  const login = async (username: string, password: string) => {
    const response = await loginMutation.mutate({
      username,
      password
    });

    authStore.login(response.accessToken);
  };

  return { login, loginMutation };
};

export default useAuthService;
