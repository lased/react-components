import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthService } from 'services';

import './LoginPage.css';

const LoginPage = () => {
  const [fields, setFields] = useState({ username: '', password: '' });
  const { login, loginMutation } = useAuthService();
  const navigate = useNavigate();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFields((oldFileds) => ({ ...oldFileds, [name]: value }));
  };
  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    await login(fields.username, fields.password);
    navigate('/');
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
      <button type="submit" disabled={loginMutation.isLoading}>
        Submit
      </button>
    </form>
  );
};

export default LoginPage;
