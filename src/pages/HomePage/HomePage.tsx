import { useAuthStore } from 'store/auth';

const HomePage = () => {
  console.log('Render: Home');

  const { isLoggedIn } = useAuthStore();

  const onLoginHandler = () => {};
  const onLogoutHandler = () => {};

  return (
    <div>
      <p>Home</p>
      {!isLoggedIn ? (
        <button onClick={onLoginHandler}>Login</button>
      ) : (
        <button onClick={onLogoutHandler}>Logout</button>
      )}
    </div>
  );
};

export default HomePage;
