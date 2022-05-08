import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthService } from 'services';

import './LoginPage.css';

const LoginPage = () => {
  const [fields, setFields] = useState({ username: '', password: '' });
  const { login, loginMutation } = useAuthService();
  const navigate = useNavigate();
  const location = useLocation();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFields((oldFileds) => ({ ...oldFileds, [name]: value }));
  };
  const onSubmitHandler = async (event: SyntheticEvent) => {
    const prevPage = (location.state && (location.state as any).from) || '/';

    event.preventDefault();
    await login(fields.username, fields.password);
    navigate(prevPage, { replace: true });
  };

  return (
    <form className="login" onSubmit={onSubmitHandler}>
      <header>Login</header>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={onChangeHandler}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={onChangeHandler}
      />
      <footer>
        <button
          disabled={loginMutation.isLoading}
          onClick={() => navigate('/')}
        >
          Back
        </button>
        <button type="submit" disabled={loginMutation.isLoading}>
          Submit
        </button>
      </footer>
    </form>
  );
};

export default LoginPage;
